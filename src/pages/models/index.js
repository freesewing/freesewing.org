import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Avatar from '../../components/avatar'
import NoModel from '../../components/no-model'
import ModelGraph from '../../components/model-graph.js'

const ModelsIndexPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.models'))
  }, [])

  // Styles
  const styles = {
    model: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
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
    avatar: {
      height: '64px',
      width: '64px',
      padding: '8px'
    }
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        {Object.keys(app.models).length > 0 ? (
          Object.keys(app.models).map((handle, model) => {
            return (
              <div className="box" key={handle}>
                <Link
                  to={'/models/' + handle}
                  title={app.models[handle].name}
                  data-test="model-link"
                >
                  <div style={styles.model}>
                    <div style={styles.avatar}>
                      <Avatar variant="model" data={app.models[handle]} />
                    </div>
                    <div>
                      <h6 style={styles.name}>{app.models[handle].name}</h6>
                      <p style={styles.notes}>{app.models[handle].notes}</p>
                    </div>
                  </div>
                  <div>
                    <ModelGraph model={app.models[handle]} intl={app.intl} />
                  </div>
                </Link>
              </div>
            )
          })
        ) : (
          <NoModel />
        )}
        <p style={{ textAlign: 'right' }}>
          <Button size="large" variant="contained" color="primary" href="/model">
            <FormattedMessage id="app.newModel" />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(ModelsIndexPage)
