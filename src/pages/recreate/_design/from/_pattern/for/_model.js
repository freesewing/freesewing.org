import React, { useEffect, useState } from 'react'
import useApp from '../../../../../../hooks/useApp'
import useModel from '../../../../../../hooks/useModel'
import useDesign from '../../../../../../hooks/useDesign'
import usePattern from '../../../../../../hooks/usePattern'
import useDraftDocs from '../../../../../../hooks/useDraftDocs'
import withLanguage from '../../../../../../components/withLanguage'
import AppWrapper from '../../../../../../components/app/wrapper'
import DraftLayout from '../../../../../../components/layouts/draft'

import capitalize from '@freesewing/utils/capitalize'
import { graphql } from 'gatsby'

import DraftConfigurator from '@freesewing/components/DraftConfigurator'
import {
  measurements as requiredMeasurements,
  withBreasts as withBreastsPatterns
} from '@freesewing/pattern-info'
import Draft from '@freesewing/components/Draft'
import i18nPlugin from '@freesewing/plugin-i18n'
import { plugin as patternTranslations } from '@freesewing/i18n'
import { withoutBreasts, withBreasts } from '@freesewing/models'
import Blockquote from '@freesewing/components/Blockquote'

import DraftPreButtons from '../../../../../../components/draft/pre-buttons'
import DraftPostButtons from '../../../../../../components/draft/post-buttons'
import DraftHelp from '../../../../../../components/draft/help'
import DraftError from '../../../../../../components/draft/error'
import ExportPattern from '../../../../../../components/draft/export-pattern'
import SavePattern from '../../../../../../components/draft/save-pattern'

const CreatePatternForModelPage = props => {
  // FIXME: This should be shared yet also requires state
  const updatePatternData = (value, l1 = false, l2 = false, l3 = false) => {
    if (!l1) return
    let newData = { ...patternData }

    if (l2 && typeof newData[l1] === 'undefined') newData[l1] = {}
    if (l3 && typeof newData[l1][l2] === 'undefined') newData[l1][l2] = {}

    if (l3) newData[l1][l2][l3] = value
    else if (l2) newData[l1][l2] = value
    else newData[l1] = value
    setPatternData(newData)
  }

  // Design is added to page context in gatsby-node
  const design = props.pageContext.design

  // Hooks
  const app = useApp(props)
  const model = useModel(app, props.model)
  const Pattern = useDesign(design)
  const docs = useDraftDocs(props.data)
  const originalPattern = usePattern(app, props.pattern)

  // Initial pattern data
  let initialPatternData = { ...usePattern(app, props.pattern).data }
  for (let m of requiredMeasurements[design]) {
    initialPatternData.settings.measurements[m] = model.measurements[m]
  }

  // State
  const [display, setDisplay] = useState('draft')
  const [fit, setFit] = useState('false')
  const [eventType, setEventType] = useState('')
  const [eventValue, setEventValue] = useState('')
  const [ready, setReady] = useState(false)
  const [patternData, setPatternData] = useState(initialPatternData)

  // Effects after initial render only
  useEffect(() => {
    app.setTitle(
      app.translate('app.newPatternForModel', { pattern: capitalize(design), model: model.name })
    )
    app.setCrumbs([
      {
        slug: '/create',
        title: app.translate('app.newPattern', { pattern: app.translate('app.pattern') })
      },
      {
        slug: '/create/' + design,
        title: app.translate('app.newPattern', { pattern: capitalize(design) })
      }
    ])
    setReady(true)
  }, [])
  // Effects upon each pattern change
  useEffect(() => {
    updatePatternData(display === 'export' ? false : true, 'settings', 'embed')
  }, [props.pattern])

  // We need to let the effect run after the initial render
  if (!ready) return null

  // Methods
  const handleRecipeResult = (result, data) => {
    if (result) {
      setRecipe(data)
      setDesign(design)
      updatePatternData(data.recipe.design, 'design')
      updatePatternData({ ...data.recipe.settings }, 'settings')
      updatePatternData({ ...data.recipe.settings.options }, 'settings', 'options')
      if (props.model === 'replica') updatePatternData(data.recipe.model, 'model')
      else {
        updatePatternData(model.handle, 'model')
        let measurements = {}
        for (let m of requiredMeasurements[data.recipe.design]) {
          measurements[m] = model.measurements[m]
        }
        updatePatternData(measurements, 'settings', 'measurements')
      }
      setReady(true)
    } else {
      console.log(data)
    }
  }

  const raiseEvent = (type, data) => {
    if (type === 'showHelp') {
      // Clicking same help icon again will cancel it out
      if (display === 'help' && eventType === data.type && eventValue === data.value)
        setDisplay('draft')
      else {
        setEventType(data.type)
        setEventValue(data.value)
        setDisplay('help')
      }
    }
  }

  if (fit && patternProps) patternProps.style = { maxHeight: '85vh' }

  // Draft the pattern
  let draft, error, patternProps
  try {
    draft = new Pattern(patternData.settings).use(i18nPlugin, {
      strings: patternTranslations
    })
    if (display === 'compare') {
      let compareWith = {}
      if (withBreastsPatterns.indexOf(design) === -1) compareWith = { ...withoutBreasts }
      else compareWith = { ...withBreasts }
      compareWith.model = model.measurements
      draft.sampleModels(compareWith, 'model')
    } else draft.draft()
    patternProps = draft.getRenderProps()
  } catch (err) {
    console.log({ err, draft })
    error = err
  }

  // Configurator
  const aside = (
    <DraftConfigurator
      data={patternData}
      units={app.account.settings.units}
      config={Pattern.config}
      updatePatternData={updatePatternData}
      raiseEvent={raiseEvent}
    />
  )

  // Main render element
  let main, helpTitle
  if (display === 'export') {
    main = <ExportPattern setDisplay={setDisplay} app={app} data={patternData} pattern={Pattern} />
  } else if (display === 'save') {
    main = <SavePattern setDisplay={setDisplay} app={app} model={props.model} data={patternData} />
  } else if (display === 'help') {
    main = (
      <DraftHelp
        docs={docs}
        pattern={design}
        setDisplay={setDisplay}
        eventType={eventType}
        eventValue={eventValue}
      />
    )
  } else {
    if (error) main = <DraftError error={error} updatePatternData={updatePatternData} />
    else
      main = [
        <DraftPreButtons
          fit={fit}
          display={display}
          setFit={setFit}
          setDisplay={setDisplay}
          app={app}
        />,
        <figure style={{ textAlign: 'center' }} key="figure" data-test="draft">
          <Draft {...patternProps} />
        </figure>,
        <DraftPostButtons display={display} setDisplay={setDisplay} app={app} />
      ]
  }

  return (
    <AppWrapper app={app}>
      <DraftLayout app={app} aside={aside}>
        <article>{main}</article>
      </DraftLayout>
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternForModelPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query DraftDocsRecreate($optionsMdxRegex: String, $settingsMdxRegex: String) {
    options: allMdx(
      filter: { fileAbsolutePath: { regex: $optionsMdxRegex } }
      sort: { fields: [frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          body
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
          frontmatter {
            title
          }
        }
      }
    }
    settings: allMdx(
      filter: { fileAbsolutePath: { regex: $settingsMdxRegex } }
      sort: { fields: [frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          body
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
