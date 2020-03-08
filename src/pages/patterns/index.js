import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import usePerson from '../../hooks/usePerson'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import WideLayout from '../../components/layouts/wide'
import PostPreview from '../../components/post-preview'

import LineDrawing from '@freesewing/components/LineDrawing'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const PatternsIndexPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.patterns'))
  }, [])

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    name: {
      wordWrap: 'anywhere',
      margin: 0,
      padding: 0
    },
    notes: {
      wordWrap: 'anywhere',
      margin: 0,
      padding: 0
    },
    linedrawing: {
      marginRight: '1rem'
    },
    warning: {
      maxWidth: '42rem',
      margin: '0 auto'
    },
    prefix: {
      display: 'block',
      fontSize: '1rem',
      color: app.theme === 'dark' ? '#dee2e6' : '#868e96'
    }
  }
  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <div style={styles.wrapper}>
          {Object.keys(app.patterns).length > 0 ? (
            Object.keys(app.patterns).map((handle, pattern) => {
              let person = usePerson(app, app.patterns[handle].person)
              let personName = app.patterns[handle].person
              if (person) personName = person.name
              let title = (
                <>
                  <span style={styles.prefix}>{personName}:</span> {app.patterns[handle].name}
                </>
              )
              return (
                <PostPreview
                  app={app}
                  key={handle}
                  title={title}
                  description={app.patterns[handle].notes}
                  link={'/patterns/' + handle}
                  width={app.mobile ? 92 : 164}
                  imgComponent={
                    <LineDrawing
                      pattern={
                        app.patterns[handle].data ? app.patterns[handle].data.design : 'aaron'
                      }
                      color={app.theme === 'dark' ? '#f8f9fa' : '#212529'}
                      size={app.mobile ? 92 : 164}
                    />
                  }
                />
              )
            })
          ) : (
            <div style={styles.warning}>
              <Blockquote type="note">
                <h6>
                  <FormattedMessage id="app.createFirst" />
                </h6>
                <p>
                  <FormattedMessage id="app.noPattern" />
                </p>
                <p style={{ textAlign: 'right' }}>
                  <Button href="/create/" color="primary" variant="contained">
                    <FormattedMessage
                      id="app.newThing"
                      values={{ thing: app.translate('app.pattern') }}
                    />
                  </Button>
                </p>
              </Blockquote>
            </div>
          )}
        </div>
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(PatternsIndexPage)
