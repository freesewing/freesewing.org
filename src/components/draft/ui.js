import React, { useState, useEffect } from 'react'
import useDesign from '../../hooks/useDesign'
import usePattern from '../../hooks/usePattern'
import usePerson from '../../hooks/usePerson'
import useDraftDocs from '../../hooks/useDraftDocs'
import useMergeData from '../../hooks/useMergeData'
import DraftLayout from '../layouts/draft'
import LoadingLayout from '../layouts/loading'

import {
  measurements as requiredMeasurements,
  withBreasts as withBreastsPatterns
} from '@freesewing/pattern-info'
import Blockquote from '@freesewing/components/Blockquote'
import DraftConfigurator from '@freesewing/components/DraftConfigurator'
import Draft from '@freesewing/components/Draft'
import i18nPlugin from '@freesewing/plugin-i18n'
import { plugin as patternTranslations } from '@freesewing/i18n'
import { withoutBreasts, withBreasts } from '@freesewing/models'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import { version } from '../../../package.json'

import DraftButtons from './buttons'
import DraftHelp from './help'
import DraftError from './error'
import ExportPattern from '../pattern/export'
import SharePattern from '../pattern/share'
import capitalize from '@freesewing/utils/capitalize'

const DraftUi = props => {
  // Methods
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
  const toggleUnits = () => {
    let newUnits = visitorUnits === 'metric' ? 'imperial' : 'metric'
    setVisitorUnits(newUnits)
    mergeData(newUnits, 'settings', 'units')
  }
  const getInitialData = (initial = false) => {
    // Initial pattern data
    let initialData = initial
      ? initial
      : {
          design,
          version,
          settings: {
            sa: 10,
            complete: true,
            paperless: false,
            locale: app.language,
            units: app.account.settings ? app.account.settings.units : 'metric',
            options: {},
            measurements: {}
          }
        }

    for (let m of requiredMeasurements[design]) {
      initialData.settings.measurements[m] = person.measurements[m]
    }

    return initialData
  }
  const getTitle = (recreate, thing, person) => {
    if (recreate) return app.translate('app.recreateThingForPerson', { thing, person })
    else return app.translate('app.newPatternForModel', { pattern: thing, model: person })
  }
  const getCrumbs = (recreate, handle, name) => {
    if (recreate)
      return [
        {
          slug: '/create',
          title: (
            <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
          )
        },
        {
          slug: `/create/${design}/`,
          title: <FormattedMessage id="app.newThing" values={{ thing: capitalize(design) }} />
        },
        {
          slug: `/patterns/${handle}/`,
          title: app.translate('app.recreate') + ' ' + name
        }
      ]
    else return []
  }

  const { app, design } = props

  // Hooks
  const person = props.person === 'original' ? {} : usePerson(app, props.person)
  const Pattern = useDesign(design)
  const docs = useDraftDocs(props.data)

  if (!person) return <p>This should never happen. Please report this.</p>

  // State
  const [pattern, setPattern] = useState('pending')
  const [display, setDisplay] = useState('draft')
  const [fit, setFit] = useState('false')
  const [eventType, setEventType] = useState('')
  const [eventValue, setEventValue] = useState('')
  const [visitorUnits, setVisitorUnits] = useState('metric')
  const [data, setData, mergeData] = useMergeData() // Special state + update method to merge data

  // Effects
  useEffect(() => {
    if (props.recreate) {
      // We're recreating an existing pattern
      /*
       * The usePattern hook is used to load the base pattern
       *   - Patterns that are in localStorage return instantly
       *   - Patterns loaded from the backend return a promise
       */
      let patternOrPromise = usePattern(app, props.recreate)
      if (patternOrPromise.then instanceof Function) {
        patternOrPromise.then(p => {
          if (props.person === 'original') {
            person.measurements = p.data.settings.measurements
            person.name = app.translate('app.model')
            app.setTitle(app.translate('app.cloneThing', { thing: p.name }))
          } else app.setTitle(getTitle(true, p.name, person.name))
          setPattern(p)
          setData(getInitialData(p.data))
          app.setCrumbs(getCrumbs(true, p.handle, p.name))
        })
      } else {
        if (props.person === 'original') {
          person.measurements = patternOrPromise.data.settings.measurements
          person.name = app.translate('app.model')
          app.setTitle(app.translate('app.cloneThing', { thing: patternOrPromise.name }))
        } else app.setTitle(getTitle(true, patternOrPromise.name, person.name))
        setPattern(patternOrPromise)
        setData(getInitialData(patternOrPromise.data))
        app.setCrumbs(getCrumbs(true, patternOrPromise.handle, patternOrPromise.name))
      }
    } else {
      // We're creating a new pattern from scratch
      setPattern('')
      setData(getInitialData(false))
      app.setTitle(getTitle(false, design, person.name))
      app.setCrumbs(getCrumbs(false, '', design))
    }
  }, [])

  // Allow usePattern promise to resolve
  if (pattern === 'pending') return <LoadingLayout app={app}>{pattern}</LoadingLayout>
  else if (pattern === false) {
    if (app.account.username) app.navigate('/patterns/')
    else app.navigate('/')
    return null
  }

  // Make sure state updates are completed
  if (typeof data === 'undefined') return <LoadingLayout app={app} />

  // Draft the pattern
  let draft, error, patternProps
  try {
    draft = new Pattern(data.settings).use(i18nPlugin, {
      strings: patternTranslations
    })
    if (display === 'compare') {
      let compareWith = {}
      if (withBreastsPatterns.indexOf(design) === -1) compareWith = { ...withoutBreasts }
      else compareWith = { ...withBreasts }
      compareWith.model = person.measurements
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
      data={data}
      units={app.account.username ? app.account.settings.units : visitorUnits}
      config={Pattern.config}
      updatePatternData={mergeData}
      raiseEvent={raiseEvent}
    />
  )

  // Fit to screen
  if (fit && patternProps) patternProps.style = { maxHeight: '85vh' }

  // Main render element
  let main
  if (display === 'export') {
    main = (
      <ExportPattern
        setDisplay={setDisplay}
        app={app}
        data={data}
        pattern={Pattern}
      />
    )
  } else if (display === 'share') {
    main = <SharePattern setDisplay={setDisplay} app={app} person={props.person} data={data} />
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
    if (error) main = <DraftError error={error} updatePatternData={mergeData} />
    else
      main = [
        !app.account.username && (
          <Blockquote type="note" key="unitsnote">
            <h6>
              <FormattedMessage id="app.metricUnits" />
              <span> / </span>
              <FormattedMessage id="app.imperialUnits" />
            </h6>
            <p>
              <FormattedMessage id="account.unitsInfo" />
              &nbsp;
              <FormattedMessage id="account.unitsTitle" />.
            </p>
            <p style={{ textAlign: 'right' }}>
              <Button onClick={toggleUnits} variant="outlined" color="primary">
                <FormattedMessage
                  id="app.switchToThing"
                  values={{
                    thing:
                      visitorUnits === 'metric'
                        ? app.translate('app.imperialUnits')
                        : app.translate('app.metricUnits')
                  }}
                />
              </Button>
            </p>
          </Blockquote>
        ),
        <figure key="pattern" style={{ textAlign: 'center' }} data-test="draft">
          <Draft {...patternProps} />
        </figure>,
        <DraftButtons
          key="buttons"
          fit={fit}
          display={display}
          setFit={setFit}
          setDisplay={setDisplay}
          app={app}
        />
      ]
  }

  return (
    <DraftLayout app={app} aside={aside}>
      <article>{main}</article>
    </DraftLayout>
  )
}

export default DraftUi
