import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import AccountContext from '../../components/context/account'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('account.removeYourAccount')}
      crumbs={[{ title: app.translate('app.account'), slug: '/account/' }]}
      context={<AccountContext app={app} />}
      active="account"
      text
    >
      <Blockquote type="warning">
        <h4>
          <FormattedMessage id="app.proceedWithCaution" />
        </h4>
        <p>
          <FormattedMessage id="account.removeYourAccountWarning" />
        </p>
        <p style={{ textAlign: 'center' }}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            href="/account/settings"
            data-test="cancel"
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button
            data-test="save"
            className="danger"
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            onClick={app.removeAccount}
          >
            <FormattedMessage id="account.removeYourAccount" />
          </Button>
        </p>
      </Blockquote>
      <Blockquote type="note">
        <FormattedMessage
          id="account.removeYourAccountInfo"
          values={{ em: (...chunks) => <em>{chunks}</em> }}
        />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
