import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'

import usePeople from '../../../hooks/usePeople'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import SelectSize from '../../../components/draft/select-size'
import SelectSizeContext from '../../../components/context/select-size'

const CreatePatternPage = (props) => {
  // Hooks
  const app = useApp()
  const people = usePeople(app, props.pageContext.design)

  // Design is added to page context in gatsby-node
  const design = props.pageContext.design

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.chooseASize'))
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
    <AppWrapper app={app} context={<SelectSizeContext app={app} design={design} people={people} />}>
      <Layout
        app={app}
        active="designs"
        context={<SelectSizeContext app={app} design={design} people={people} />}
      >
        <SelectSize app={app} design={design} people={people} />
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternPage)
