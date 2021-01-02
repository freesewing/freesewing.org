import React, { useState, useEffect } from 'react'
import useApp from '../../../../hooks/useApp'
import usePattern from '../../../../hooks/usePattern'
import AppWrapper from '../../../../components/app/wrapper'

import LoadingLayout from '../../../../components/layouts/loading'
import PatternData from '../../../../components/pattern/data'
import PatternNotes from '../../../../components/pattern/notes'
import PatternActions from '../../../../components/context/pattern-actions'
import { FormattedMessage } from 'react-intl'
import PatternPreview from '../../../../components/pattern/preview'
import './index.css'

import Dialog from '../../../../components/pattern/dialog'

const Page = (props) => {
  const app = useApp()

  const [pattern, setPattern] = useState('pending')
  const [person, setPerson] = useState('pending')
  const [dialog, setDialog] = useState(false)
  const [dialogAction, setDialogAction] = useState('pick')
  // Page title won't be available until async code runs
  const [title, setTitle] = useState(app.translate('app.pattern'))
  const [description, setDescription] = useState(false)

  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then((p) => {
        setPattern(p)
        setTitle(p.name)
        setDescription(p.notes || false)
      })
    } else {
      setPattern(patternOrPromise)
      setTitle(patternOrPromise.name)
      setDescription(patternOrPromise.notes || false)
    }
  }, [props.pattern])

  if (pattern === 'pending') return <LoadingLayout app={app} />
  else if (pattern === false) {
    if (app.account.username) app.navigate('/patterns/')
    else app.navigate('/')
    return null
  }

  const ownPattern = typeof app.patterns[props.pattern] === 'undefined' ? false : true

  const openDialog = (action) => {
    setDialogAction(action)
    setDialog(true)
  }

  // Note that the fabs order does not matter, it will be enforced by the PatternFabs component
  const fabs = ['export', 'edit', 'recreate']
  if (app.account.username) {
    fabs.push('saveAs')
    if (ownPattern) fabs.push('delete')
  }

  const context = []
  context.push(
    <h5>
      <a
        href="#"
        role="button"
        onClick={() => openDialog('pick')}
        title={app.translate('app.showDetails')}
      >
        <FormattedMessage id="app.actions" />
        <span style={{ display: 'inline-block', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
          [<FormattedMessage id="app.showDetails" />]
        </span>
      </a>
    </h5>
  )
  context.push(
    <PatternActions
      app={app}
      fabs={fabs}
      design={pattern.data.design}
      openDialog={openDialog}
      pattern={props.pattern}
    />
  )
  return (
    <AppWrapper app={app} title={title} {...app.treeProps(props.location.pathname)}>
      <div className="preview shadow">
        <PatternPreview data={pattern.data} app={app} pattern={props.pattern} />
      </div>
      {pattern.notes && (
        <div>
          <h5>
            <FormattedMessage id="app.notes" />
          </h5>
          <PatternNotes notes={pattern.notes} app={app} />
        </div>
      )}
      <h5>
        <FormattedMessage id="app.actions" />
        <a
          href="#"
          role="button"
          onClick={() => openDialog('pick')}
          title={app.translate('app.showDetails')}
        >
          <span style={{ display: 'inline-block', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
            [<FormattedMessage id="app.showDetails" />]
          </span>
        </a>
      </h5>
      <PatternActions
        app={app}
        fabs={fabs}
        design={pattern.data.design}
        openDialog={openDialog}
        pattern={props.pattern}
      />
      <h5>
        <FormattedMessage id="app.data" />
      </h5>
      <PatternData data={pattern} />
      <div id="pattern-mask" className={dialog ? 'show' : ''} onClick={() => setDialog(false)} />
      <div id="pattern-dialog" className={dialog ? 'show shadow' : ''}>
        <Dialog
          mode="view"
          owner={ownPattern}
          data={pattern.data}
          pattern={props.pattern}
          person={pattern.person}
          setPattern={setPattern}
          setPerson={setPerson}
          setDialog={setDialog}
          app={app}
          action={dialogAction}
          setAction={setDialogAction}
          fabs={fabs}
        />
      </div>
    </AppWrapper>
  )
}

export default Page
