import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import usePattern from '../../../hooks/usePattern'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Markdown from 'react-markdown'
import PatternData from '../../../components/patterns/data'
import ExportPattern from '../../../components/draft/export-pattern'
import { navigate } from 'gatsby'

const PatternPage = props => {
  // Hooks
  const app = useApp()
  const pattern = usePattern(app, props.pattern)

  // Effects
  useEffect(() => {
    app.setTitle(pattern.name)
    app.setCrumbs([
      {
        title: app.translate('app.patterns'),
        slug: '/patterns/'
      }
    ])
  }, [])

  if (!pattern) {
    if (app.account.username) navigate('/patterns/')
    else navigate('/')
    return null
  }

  // Style
  const styles = {
    button: {
      marginLeft: '0.5rem'
    }
  }

  // Own pattern ?
  const ownPattern = typeof app.patterns[props.pattern] === 'undefined' ? false : true

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        {pattern.notes && <Markdown source={pattern.notes} />}
        <p style={{ textAlign: 'right' }}>
          {ownPattern && (
            <>
              <Button
                style={styles.button}
                variant="contained"
                color="primary"
                className="danger"
                onClick={() => app.removePattern(pattern.handle)}
              >
                <FormattedMessage id="app.remove" />
              </Button>
              <Button
                style={styles.button}
                variant="contained"
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
            style={styles.button}
            href={`/recreate/${pattern.data.design}/from/${pattern.handle}/`}
            variant="contained"
          >
            <FormattedMessage id="app.recreate" />
          </Button>
        </p>

        <ExportPattern app={app} data={pattern.data} />

        <PatternData data={pattern} />
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(PatternPage)
