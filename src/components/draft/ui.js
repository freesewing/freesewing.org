import React, { useState, useEffect } from 'react'
import useDesign from '../../hooks/useDesign'
import useMergeData from '../../hooks/useMergeData'
import Layout from '../layouts/default'
import YAML from 'yaml'

import Fab from '@material-ui/core/Fab'
import ConfigIcon from '@material-ui/icons/Build'
import CloseIcon from '@material-ui/icons/Close'
import { withBreasts as withBreastsPatterns } from '@freesewing/pattern-info'
import DraftConfigurator from '@freesewing/components/DraftConfigurator'
import Draft from '@freesewing/components/Draft'
import i18nPlugin from '@freesewing/plugin-i18n'
import { plugin as patternTranslations } from '@freesewing/i18n'
import { withoutBreasts, withBreasts } from '@freesewing/models'
import { FormattedMessage } from 'react-intl'
import MainMenu from '../menus/main'
import SaveIcon from '@material-ui/icons/Save'
import SaveAsIcon from '@material-ui/icons/CloudUpload'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import CompareIcon from '@material-ui/icons/PeopleAlt'
import ShowIcon from '@material-ui/icons/Visibility'
import ExportIcon from '@material-ui/icons/Print'
import Icon from '@freesewing/components/Icon'
import ExportPattern from '../pattern/export'
import SaveAsPattern from '../pattern/save-as'

import DraftError from './error'
import DraftEvents from './events/'

import { sampleStyles, focusStyle, extraDefs } from './sample-styles'
import SampleLegend from './sample-legend'
import useUiMdx from '../../hooks/useUiMdx'
import Mdx from '../mdx'
import SizingGraph from '../person/size-graph'

const DraftUi = (props) => {
  const { app, person, design } = props
  const Pattern = useDesign(design)
  const uiMdx = useUiMdx()

  // Methods
  const raiseEvent = (type, data) => {
    setEventType(data.type)
    setEventValue(data.value)
  }
  const toggleUnits = () => {
    let newUnits = visitorUnits === 'metric' ? 'imperial' : 'metric'
    setVisitorUnits(newUnits)
    mergeData(newUnits, 'settings', 'units')
  }

  if (!person || !design)
    return (
      <>
        <p>This should never happen. Please report this.</p>
        <pre>{JSON.stringify(design, null, 2)}</pre>
        <pre>{JSON.stringify(person, null, 2)}</pre>
      </>
    )

  // State
  const [display, setDisplay] = useState('draft')
  const [fit, setFit] = useState('false')
  const [eventType, setEventType] = useState('')
  const [eventValue, setEventValue] = useState('')
  const [visitorUnits, setVisitorUnits] = useState('metric')
  const [data, setData, mergeData] = useMergeData(props.data) // Special state + update method to merge data
  const [menu, setMenu] = useState(false)
  const [crashReport, setCrashReport] = useState(false)
  const [issue, setIssue] = useState(false)
  const [personHasBreasts, setPersonHasBreasts] = useState(false)

  const tracesFromPatternProps = (patternProps) => {
    const errorAsMarkdown = (e) => `
## ${e.name}: ${e.message}

Error in ${e.fileName} line ${e.lineNumber}:${e.columnNumber}

\`\`\`js
${e.stack}
\`\`\`

`
    let md = ''
    for (const e of patternProps.events.error) {
      if (Array.isArray(e)) {
        let error = []
        for (let se of e) {
          if (se instanceof Error === true) md += errorAsMarkdown(se)
        }
      }
    }
    return md
  }

  // Effects
  useEffect(() => {
    setPersonHasBreasts(props.person.breasts)
    if (crashReport) {
      app.setLoading(true)
      let crashData = Object.assign(data)
      crashData.settings.debug = true
      crashData.breasts = props.person.breasts
      const [patternProps, error, compareWith, breasts] =
        display === 'compare' ? comparePattern(crashData) : draftPattern(crashData)
      app.backend
        .createIssue({
          design,
          data: YAML.stringify(data),
          patternProps: {
            settings: YAML.stringify(patternProps.settings),
            events: YAML.stringify(patternProps.events),
            parts: JSON.stringify(patternProps.parts, null, 2)
          },
          traces: tracesFromPatternProps(patternProps),
          error,
          compareWith
        })
        .then((res) =>
          setIssue(`https://github.com/freesewing/freesewing.org/issues/${res.data.id}`)
        )
        .catch((err) => console.log(err))
        .finally(() => app.setLoading(false))
    }
  }, [crashReport])

  // Draft the pattern
  const draftPattern = (data) => {
    let patternProps
    try {
      patternProps = new Pattern(data.settings)
        .use(i18nPlugin, { strings: patternTranslations })
        .draft()
        .getRenderProps()

      return [patternProps, false]
    } catch (err) {
      return [patternProps, err]
    }
  }

  // Find models to compare with
  const compareModels = () => {
    let breasts = true
    let compareWith = {}
    if (withBreastsPatterns.indexOf(design) !== -1) {
      compareWith = { ...withBreasts }
    } else {
      if (props.person.notAPerson && props.person.handle.indexOf('ith breasts') !== -1) {
        // Menswear pattern for model with breasts
        compareWith = { ...withBreasts }
      } else {
        compareWith = { ...withoutBreasts }
        breasts = false
      }
    }
    compareWith.model = person.measurements

    return [compareWith, breasts]
  }

  // Compare the pattern
  const comparePattern = (data) => {
    let error, patternProps
    let [compareWith, breasts] = compareModels()
    try {
      let draft = new Pattern(data.settings).use(i18nPlugin, { strings: patternTranslations })
      draft.settings.sample = {
        type: 'models',
        models: compareWith,
        styles: sampleStyles(app.theme === 'dark'),
        focus: 'model',
        focusStyle: focusStyle(app.theme === 'dark')
      }
      draft.sample()
      patternProps = draft.getRenderProps()

      return [patternProps, error, compareWith, breasts]
    } catch (err) {
      console.log('Error in comparePattern:', err)
      return [patternProps, error, compareWith, breasts]
    }
  }

  const [patternProps, error, compareWith, breasts] =
    display === 'compare' ? comparePattern(data) : draftPattern(data)

  // User actions
  const savePattern = (data) => {
    app.updatePattern(props.patternHandle, { data }).catch((err) => {
      console.log(err)
    })
  }
  const actions = {
    compare: (
      <li className="action" key="a-compare" id="draft-action-compare">
        {display === 'compare' ? (
          <span onClick={() => setDisplay('draft')}>
            <ShowIcon />
            <FormattedMessage id="app.showPattern" />
          </span>
        ) : (
          <span onClick={() => setDisplay('compare')}>
            <CompareIcon />
            <FormattedMessage id="app.comparePattern" />
          </span>
        )}
      </li>
    ),
    export: (
      <li className="action" key="a-export" id="draft-action-export">
        {display === 'export' ? (
          <span onClick={() => setDisplay('draft')}>
            <ShowIcon />
            <FormattedMessage id="app.showPattern" />
          </span>
        ) : (
          <span onClick={() => setDisplay('export')}>
            <ExportIcon />
            <FormattedMessage id="app.exportPattern" />
          </span>
        )}
      </li>
    ),
    exportOther: (
      <li className="action" key="a-exportother" id="draft-action-exportother">
        <span onClick={() => props.app.navigate(`/patterns/${props.patternHandle}/export/`)}>
          <ExportIcon />
          <FormattedMessage id="app.exportPattern" />
        </span>
      </li>
    ),
    exportOwn: (
      <li className="action" key="a-exportown" id="draft-action-exportown">
        <span
          onClick={() => props.app.navigate(`/account/patterns/${props.patternHandle}/export/`)}
        >
          <ExportIcon />
          <FormattedMessage id="app.exportPattern" />
        </span>
      </li>
    ),
    save: (
      <li className="action" key="a-save" id="draft-action-save">
        <span onClick={() => savePattern(data)}>
          <SaveIcon />
          <FormattedMessage id="app.savePattern" />
        </span>
      </li>
    ),
    saveAs: (
      <li className="action" key="a-saveas" id="draft-action-saveas">
        {display === 'saveas' ? (
          <span onClick={() => setDisplay('draft')}>
            <ShowIcon />
            <FormattedMessage id="app.showPattern" />
          </span>
        ) : (
          <span onClick={() => setDisplay('saveas')}>
            <SaveAsIcon />
            <FormattedMessage id="app.saveAsNewPattern" />
          </span>
        )}
      </li>
    ),
    saveAsOther: (
      <li className="action" key="a-saveasother" id="draft-action-saveasother">
        <span onClick={() => props.app.navigate(`/patterns/${props.patternHandle}/save-as/`)}>
          <SaveAsIcon />
          <FormattedMessage id="app.saveAsNewPattern" />
        </span>
      </li>
    ),
    saveAsOwn: (
      <li className="action" key="a-saveasown" id="draft-action-saveasown">
        <span
          onClick={() => props.app.navigate(`/account/patterns/${props.patternHandle}/save-as/`)}
        >
          <SaveAsIcon />
          <FormattedMessage id="app.saveAsNewPattern" />
        </span>
      </li>
    ),
    units: (
      <li className="action" key="a-units" id="draft-action-units">
        <span onClick={toggleUnits} key="a-units">
          <Icon icon="units" />
          {visitorUnits === 'metric' ? (
            <FormattedMessage id="app.metricUnits" />
          ) : (
            <FormattedMessage id="app.imperialUnits" />
          )}
        </span>
      </li>
    ),
    zoom: (
      <li className="action" key="a-zoom" id="draft-action-zoom">
        <span onClick={() => setFit(!fit)} key="a-zoom">
          {fit ? (
            <>
              <ZoomInIcon /> <FormattedMessage id="app.zoomIn" />
            </>
          ) : (
            <>
              <ZoomOutIcon /> <FormattedMessage id="app.zoomOut" />
            </>
          )}
        </span>
      </li>
    )
  }

  // Fit to screen
  if (fit && patternProps) patternProps.style = { maxHeight: '85vh' }

  // Events
  const draftEvents =
    patternProps && patternProps.events ? (
      <DraftEvents events={patternProps.events} app={app} debug={data.settings.debug} />
    ) : null

  // Main render element
  let main
  if (issue)
    main = (
      <>
        <h1>{uiMdx['other/issue-created'].title}</h1>
        <ul className="links">
          <li>
            <a href={issue}>{issue}</a>
          </li>
        </ul>
        {uiMdx['other/issue-created'].lead}
        <Mdx node={uiMdx['other/issue-created']} />
        <Mdx node={uiMdx['other/give-feedback']} />
      </>
    )
  else if (error || patternProps.events.error.length > 0)
    main = (
      <DraftError
        error={error}
        draftEvents={draftEvents}
        updatePatternData={mergeData}
        setCrashReport={setCrashReport}
        app={app}
        data={data}
      />
    )
  else if (display === 'export') main = <ExportPattern app={app} data={data} />
  else if (display === 'saveas')
    main = <SaveAsPattern app={app} data={data} person={props.person} />
  else
    main = (
      <>
        <figure key="pattern" style={{ textAlign: 'center' }} id={`freesewing-${display}`}>
          <Draft {...patternProps} extraDefs={extraDefs(app.theme === 'dark')} />
          {display === 'compare' && (
            <SampleLegend dark={app.theme === 'dark'} sizes={compareWith} breasts={breasts} />
          )}
        </figure>
        {display === 'compare' && (
          <>
            <SizingGraph breasts={personHasBreasts} person={props.person} app={app} />
          </>
        )}
        {display === 'draft' && draftEvents}
      </>
    )

  const mainMenu = <MainMenu app={props.app} slug={props.slug} />
  const preMenu = (
    <DraftConfigurator
      key="config"
      data={data}
      units={app.account.username ? app.account.settings.units : visitorUnits}
      config={Pattern.config}
      updatePatternData={mergeData}
      raiseEvent={raiseEvent}
      actions={props.actions ? props.actions.map((a) => actions[a]) : false}
    />
  )

  return (
    <Layout
      app={app}
      mainMenu={mainMenu}
      slug={props.slug}
      crumbs={props.crumbs}
      title={props.title}
      preMenu={preMenu}
      wide
    >
      <article>{main}</article>
      {app.mobile && (
        <>
          <Fab
            title={app.translate('app.menu')}
            color="primary"
            className="fab secondary only-xs accent"
            aria-label="Menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <CloseIcon fontSize="inherit" /> : <ConfigIcon fontSize="inherit" />}
          </Fab>
          {menu && (
            <div className="context-wrapper draft-ui-menu" style={{ zIndex: 10, opacity: 1 }}>
              {preMenu}
            </div>
          )}
        </>
      )}
    </Layout>
  )
}

export default DraftUi
