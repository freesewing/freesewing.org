import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import WideLayout from '../../components/layouts/wide'

import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Avatar from '../../components/avatar'
import MissingPeople from '../../components/missing/people'
import ModelGraph from '../../components/model-graph.js'

const PeopleIndexPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.people'))
  }, [])

  // Styles
  const styles = {
    person: {
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
      <WideLayout app={app} top>
        {Object.keys(app.people).length > 0 ? (
          <>
            {Object.keys(app.people).map((handle, person) => {
              return (
                <div className="box" key={handle}>
                  <Link to={'/people/' + handle + '/'} title={app.people[handle].name}>
                    <div style={styles.person}>
                      <div style={styles.avatar}>
                        <Avatar variant="model" data={app.people[handle]} size='64px'/>
                      </div>
                      <div>
                        <h6 style={styles.name}>{app.people[handle].name}</h6>
                        <p style={styles.notes}>{app.people[handle].notes}</p>
                      </div>
                    </div>
                    <div>
                      <ModelGraph model={app.people[handle]} intl={app.intl} />
                    </div>
                  </Link>
                </div>
              )
            })}
            <p style={{ textAlign: 'right' }}>
              <Button size="large" variant="contained" color="primary" href="/person/">
                <FormattedMessage id="app.addThing" values={{thing: app.translate('app.person')}} />
              </Button>
            </p>
          </>
        ) : (
          <MissingPeople />
        )}
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(PeopleIndexPage)
