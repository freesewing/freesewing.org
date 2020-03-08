import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import usePattern from '../../../hooks/usePattern'
import usePerson from '../../../hooks/usePerson'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'
import LoadingLayout from '../../../components/layouts/loading'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import PatternData from '../../../components/pattern/data'
import ExportPattern from '../../../components/pattern/export'
import PatternNotes from '../../../components/pattern/notes'
import PatternShareLink from '../../../components/pattern/share-link'
import { navigate } from 'gatsby'

import PatternPreview from '../../../components/pattern/preview'
import './index.css'

import PatternFabs from '../../../components/pattern/fabs'
import Dialog from '../../../components/pattern/dialog'

// Style
const styles = {
  info: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  export: {
    minWidth: '500px'
  },
  share: {
    flexGrow: '1',
    maxWidth: '800px'
  },
  wrapper: {
    display: 'flex'
  },
  col: {
    maxwidth: '400px'
  }
}

const PatternPage = props => {
  // Hooks
  const app = useApp()

  // State
  const [pattern, setPattern] = useState('pending')
  const [person, setPerson] = useState('pending')
  const [dialog, setDialog] = useState(false)
  const [dialogAction, setDialogAction] = useState('pick')

  // Effects
  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    //let personOrPromise = usePerson(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then(p => {
        setPattern(p)
        app.setTitle(p.name)
        app.setCrumbs([
          {
            title: app.translate('app.patterns'),
            slug: '/patterns/'
          }
        ])
      })
    } else {
      setPattern(patternOrPromise)
      app.setTitle(patternOrPromise.name)
      app.setCrumbs([
        {
          title: app.translate('app.patterns'),
          slug: '/patterns/'
        }
      ])
    }
  }, [])

  if (pattern === 'pending') return <LoadingLayout app={app} />
  else if (pattern === false) {
    if (app.account.username) app.navigate('/patterns/')
    else app.navigate('/')
    return null
  }

  // Own pattern ?
  const ownPattern = typeof app.patterns[props.pattern] === 'undefined' ? false : true

  const openDialog = action => {
    setDialogAction(action)
    setDialog(true)
  }

  // Note that the fabs order does not matter, it will be enforced by the PatternFabs component
  const fabs = ['export', 'details', 'edit', 'recreate']
  if (app.account.username) {
    fabs.push('saveAs')
  }

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <PatternFabs app={app} fabs={fabs} openDialog={openDialog} pattern={props.pattern} design={pattern.data.design}/>
        <div className='pwrap'>
          <div>
            <h3>Preview</h3>
            <div className='preview shadow'>
              <PatternPreview data={pattern.data} app={app} />
            </div>
          </div>
        {pattern.notes && (
          <div>
            <h3>Notes</h3>
            <PatternNotes notes={pattern.notes} app={app} />
          </div>
    )}
        </div>
            <h3>Data</h3>
            <PatternData data={pattern} />
      </WideLayout>
      <div id='pattern-mask' className={dialog ? 'show' : ''} onClick={() => setDialog(false)}/>,
      <div id='pattern-dialog' className={dialog ? 'show shadow' : ''}>
        <Dialog
          mode='view'
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

export default withLanguage(PatternPage)
