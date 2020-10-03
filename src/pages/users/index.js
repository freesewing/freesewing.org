import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.users')}
      description={app.translate('app.noUserBrowsingTitle')}
      text
    >
      <Robot pose="shrug2" size={250} />
      <h4>
        <FormattedMessage id="app.noUserBrowsingTitle" />
      </h4>
      <p>
        <FormattedMessage id="app.noUserBrowsingText" />
      </p>
    </AppWrapper>
  )
}

export default Page
