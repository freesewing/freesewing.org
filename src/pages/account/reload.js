import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import AccountContext from '../../components/context/account'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('account.reloadAccount')}
      crumbs={[{ title: app.translate('app.account'), slug: '/account/' }]}
      context={<AccountContext app={app} />}
      active="account"
      text
    >
      <p>
        <FormattedMessage id="account.reloadAccountDescription" />
      </p>
      <p>
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{ margin: '2rem auto', width: '250px' }}
          onClick={app.refreshAccount}
        >
          <FormattedMessage id="account.reloadAccount" />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
