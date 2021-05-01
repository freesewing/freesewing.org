import React from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import usePerson from '../../../../hooks/usePerson'
import Person from '../../../../components/person'
import Offspring from '../../../../components/offspring'
import { FormattedMessage } from 'react-intl'
import Markdown from 'react-markdown'

const Page = (props) => {
  const app = useApp()
  const person = usePerson(app, props.person)

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  let slug = `/account/people/${props.params.person}/`

  return (
    <AppWrapper app={app} title={person.name} {...app.treeProps(slug)}>
      <Person data={person} translate={app.translate} fullWidth />
      <Offspring app={app} slug={slug} />
      {person.notes && (
        <>
          <h5>
            <FormattedMessage id="app.notes" />
          </h5>
          <Markdown>{person.notes}</Markdown>
        </>
      )}
    </AppWrapper>
  )
}

export default Page
