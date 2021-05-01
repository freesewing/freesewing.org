import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import MissingPeople from '../../../components/missing/people'
import Person from '../../../components/person'

const Page = (props) => {
  const app = useApp()

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  }

  const add = (
    <p>
      <Button variant="contained" color="primary" href="/person/">
        <FormattedMessage id="app.addThing" values={{ thing: app.translate('app.person') }} />
      </Button>
    </p>
  )

  return (
    <AppWrapper app={app} title={app.translate('app.people')} {...app.treeProps(props.path)} wide>
      {add}
      {Object.keys(app.people).length > 0 ? (
        <>
          <div style={styles.wrapper}>
            {Object.keys(app.people).map((handle) => (
              <Person
                key={handle}
                data={app.people[handle]}
                link={`/account/people/${handle}/`}
                translate={app.translate}
              />
            ))}
          </div>
        </>
      ) : (
        <MissingPeople />
      )}
      {app.people && Object.keys(app.people).length > 3 && add}
    </AppWrapper>
  )
}

export default Page
