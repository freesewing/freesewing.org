import React, { useState } from 'react'
import useDesign from '../../hooks/useDesign'
import useMergeData from '../../hooks/useMergeData'
import DraftLayout from '../layouts/draft'

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

const DraftUi = (props) => {
  const { app, person, design } = props
  const Pattern = useDesign(design)

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

  // Draft the pattern
  let draft, error, patternProps, compareWith, breasts
  try {
    draft = new Pattern(data.settings).use(i18nPlugin, { strings: patternTranslations })
    if (display === 'compare') {
      compareWith = {}
      if (withBreastsPatterns.indexOf(design) !== -1) {
        compareWith = { ...withBreasts }
        breasts = true
      } else {
        if (props.person.notAPerson && props.person.handle.indexOf('ith breasts') !== -1) {
          // Menswear pattern for model with breasts
          compareWith = { ...withBreasts }
          breasts = true
        } else {
          compareWith = { ...withoutBreasts }
          breasts = false
        }
      }
      compareWith.model = person.measurements
      draft.settings.sample = {
        type: 'models',
        models: compareWith,
        styles: sampleStyles(app.theme === 'dark'),
        focus: 'model',
        focusStyle: focusStyle(app.theme === 'dark')
      }
      draft.sample()
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
  const main = error ? (
    <DraftError error={error} updatePatternData={mergeData} />
  ) : (
    <>
      <figure key="pattern" style={{ textAlign: 'center' }} data-test="draft">
        <Draft {...patternProps} extraDefs={extraDefs(app.theme === 'dark')} />
        {display === 'compare' && (
          <SampleLegend dark={app.theme === 'dark'} sizes={compareWith} breasts={breasts} />
        )}
      </figure>
      <DraftEvents events={patternProps.events} app={app} />
    </>
  )

  return (
    <DraftLayout app={app} aside={aside}>
      <article>
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
