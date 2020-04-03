import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'

import usePeople from '../../../hooks/usePeople'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import SelectPerson from '../../../components/draft/select-person'

const CreatePatternPage = (props) => {
  // Hooks
  const app = useApp()
  const people = usePeople(app, props.pageContext.design)

  // Design is added to page context in gatsby-node
  const design = props.pageContext.design

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.chooseAPerson'))
    app.setCrumbs([
      {
        slug: '/create/',
        title: (
          <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
        )
      },
      {
        slug: '/create/',
        title: <FormattedMessage id="app.newThing" values={{ thing: capitalize(design) }} />
      }
    ])
  }, [])

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <SelectPerson app={app} design={design} people={people} />
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternPage)
