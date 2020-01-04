import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import usePattern from '../../../hooks/usePattern'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'
import LoadingLayout from '../../../components/layouts/loading'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import PatternData from '../../../components/pattern/data'
import ExportPattern from '../../../components/pattern/export'
import PatternShareLink from '../../../components/pattern/share'
import PatternNotes from '../../../components/pattern/notes'

const PatternPage = props => {
  // Hooks
  const app = useApp()

  // State
  const [pattern, setPattern] = useState('pending')

  // Effects
  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
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

  // Style
  const styles = {
    button: {
      marginLeft: '0.5rem'
    },
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
    }
  }

  // Own pattern ?
  const ownPattern = typeof app.patterns[props.pattern] === 'undefined' ? false : true

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <p style={{ textAlign: 'center' }}>
          {ownPattern && (
            <>
              <Button
                style={styles.button}
                variant="contained"
                color="primary"
                size="large"
                className="danger"
                onClick={() => app.removePattern(pattern.handle)}
              >
                <FormattedMessage id="app.remove" />
              </Button>
              <Button
                style={styles.button}
                variant="contained"
                size="large"
                color="primary"
                className="info"
                href={'/patterns/' + pattern.handle + '/edit'}
              >
                <FormattedMessage id="app.update" />
              </Button>
            </>
          )}
          <Button
            color="primary"
            size="large"
            style={styles.button}
            href={`/recreate/${pattern.data.design}/from/${pattern.handle}/`}
            variant="contained"
          >
            <FormattedMessage id="app.recreate" />
          </Button>
        </p>
        {pattern.notes && <PatternNotes notes={pattern.notes} app={app} />}
        <div style={styles.info}>
          <div style={styles.export}>
            <ExportPattern app={app} data={pattern.data} />
          </div>
          <div style={styles.share}>
            <h5 style={{ marginBottom: '-1rem' }}>
              <FormattedMessage id="app.share" />
            </h5>
            <PatternShareLink app={app} pattern={props.pattern} />
          </div>
        </div>
        <h5>YAML</h5>
        <PatternData data={pattern} />
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(PatternPage)
