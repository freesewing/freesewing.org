import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import MissingPeople from '../../components/missing/people'
import Person from '../../components/person'
import PeopleContext from '../../components/context/people'

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
    <AppWrapper app={app} context={<PeopleContext app={app} />}>
      <Layout app={app} active="account" context={<PeopleContext app={app} />}>
        {add}
        {Object.keys(app.people).length > 0 ? (
          <>
            <div style={styles.wrapper}>
              {Object.keys(app.people).map((handle) => (
                <Person
                  key={handle}
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
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(PeopleIndexPage)
