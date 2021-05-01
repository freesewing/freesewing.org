import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import usePeople from '../../../hooks/usePeople'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import SelectSize from '../../../components/draft/select-size'

const Page = (props) => {
  const app = useApp()
  const people = usePeople(app, props.pageContext.design)

  // Design is added to page context in gatsby-node
  const design = props.pageContext.design

  const crumbs = [
    {
      slug: '/create/',
      title: (
        <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
      ),
    },
    {
      slug: '/create/',
      title: (
        <FormattedMessage id="app.newThing" values={{ thing: design ? capitalize(design) : '' }} />
      ),
    },
  ]

  return (
    <AppWrapper app={app} title={app.translate('app.chooseASize')} crumbs={crumbs} wide>
      <SelectSize app={app} design={design} people={people} />
    </AppWrapper>
  )
}

export default Page
