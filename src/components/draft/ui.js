import React, { useState, useEffect } from 'react'
import useDesign from '../../hooks/useDesign'
import useMergeData from '../../hooks/useMergeData'
import DraftLayout from '../layouts/draft'
import YAML from 'yaml'

import { withBreasts as withBreastsPatterns } from '@freesewing/pattern-info'
import DraftConfigurator from '@freesewing/components/DraftConfigurator'
import Draft from '@freesewing/components/Draft'
import i18nPlugin from '@freesewing/plugin-i18n'
import { plugin as patternTranslations } from '@freesewing/i18n'
import { withoutBreasts, withBreasts } from '@freesewing/models'

import DraftError from './error'
import DraftEvents from './events/'

import Dialog from '../pattern/dialog'
import PatternFabs from '../pattern/fabs'
import { sampleStyles, focusStyle, extraDefs } from './sample-styles'
import SampleLegend from './sample-legend'
import './ui.css'
import useUiMdx from '../../hooks/useUiMdx'
import Mdx from '../mdx'

const DraftUi = (props) => {
  const { app, person, design } = props
  const Pattern = useDesign(design)
  const uiMdx = useUiMdx()

  // Methods
  const raiseEvent = (type, data) => {
    setEventType(data.type)
    setEventValue(data.value)
  }
  const openDialog = (action) => {
    setDialogAction(action)
    setDialog(true)
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
  const [dialog, setDialog] = useState(false)
  const [dialogAction, setDialogAction] = useState('pick')
  const [crashReport, setCrashReport] = useState(false)
  const [issue, setIssue] = useState(false)

  const tracesFromPatternProps = (patterProps) => {
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
          patternProps: YAML.stringify(patternProps),
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
      return [patternProps, error, compareWith, breasts]
    }
  }

  const [patternProps, error, compareWith, breasts] =
    display === 'compare' ? comparePattern(data) : draftPattern(data)

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

  // Events
  const draftEvents = (
    <DraftEvents events={patternProps.events} app={app} debug={data.settings.debug} />
  )

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
      />
    )
  else
    main = (
      <>
        <figure key="pattern" style={{ textAlign: 'center' }} data-test="draft">
          <Draft {...patternProps} extraDefs={extraDefs(app.theme === 'dark')} />
          {display === 'compare' && (
            <SampleLegend dark={app.theme === 'dark'} sizes={compareWith} breasts={breasts} />
          )}
        </figure>
        {draftEvents}
      </>
    )

  return (
    <DraftLayout app={app} aside={aside}>
      <article>
        {!error && patternProps.events.error.length === 0 && (
          <PatternFabs
            app={app}
            fabs={props.fabs}
            openDialog={openDialog}
            pattern={props.pattern}
            toggleUnits={toggleUnits}
            units={visitorUnits}
            fit={fit}
            display={display}
            setDisplay={setDisplay}
            setFit={setFit}
            data={data}
          />
        )}
        {main}
      </article>
      <div id="pattern-mask" className={dialog ? 'show' : ''} onClick={() => setDialog(false)} />
      <div id="pattern-dialog" className={dialog ? 'show shadow' : ''}>
        <Dialog
          mode={props.recreate ? 'recreate' : 'create'}
          fabs={props.fabs}
          data={data}
          pattern={props.pattern}
          person={props.person}
          setDialog={setDialog}
          openDialog={openDialog}
          app={app}
          action={dialogAction}
          setAction={setDialogAction}
          setFit={setFit}
          fit={fit}
          display={display}
          setDisplay={setDisplay}
          toggleUnits={toggleUnits}
          units={visitorUnits}
        />
      </div>
    </DraftLayout>
  )
}

export default DraftUi
