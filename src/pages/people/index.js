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

import Person from '../../components/person'

const PeopleIndexPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.people'))
  }, [])

  // Styles
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
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

  const add = (
    <p>
      <Button variant="contained" color="primary" href="/person/">
        <FormattedMessage id="app.addThing" values={{ thing: app.translate('app.person') }} />
      </Button>
    </p>
  )

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        {add}
        {Object.keys(app.people).length > 0 ? (
          <>
            <div style={styles.wrapper}>
              {Object.keys(app.people).map((handle) => (
                <Person
                  data={app.people[handle]}
                  link={`/people/${handle}/`}
                  translate={app.translate}
                />
              ))}
            </div>
          </>
        ) : (
          <MissingPeople />
        )}
        {app.people && Object.keys(app.people).length > 3 && add}
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(PeopleIndexPage)
