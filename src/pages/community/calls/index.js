import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.community')}
      crumbs={[{ slug: '/community/', title: <FormattedMessage id="app.community" /> }]}
      active="community"
      text
    >
      <Blockquote type="fixme">Add calls page here</Blockquote>
    </AppWrapper>
  )
}

export default Page
