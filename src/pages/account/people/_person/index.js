import React, { useState } from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import usePerson from '../../../../hooks/usePerson'
import Person from '../../../../components/person'
import { FormattedMessage } from 'react-intl'
import Markdown from 'react-markdown'

const Page = (props) => {
  const app = useApp()
  const person = usePerson(app, props.person)

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  return (
    <AppWrapper
      app={app}
      title={person.name}
      crumbs={[{ slug: '/people/', title: <FormattedMessage id="app.people" /> }]}
      {...app.treeProps(`/account/people/${props.params.person}/`)}
    >
      <Person data={person} translate={app.translate} fullWidth />
      {person.notes && (
        <>
          <h5>
            <FormattedMessage id="app.notes" />
          </h5>
          <Markdown source={person.notes} data-test="notes" />
        </>
      )}
    </AppWrapper>
  )
}

export default Page
