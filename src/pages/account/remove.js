import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import AccountContext from '../../components/context/account'

const RemoveAccountPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.removeYourAccount'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      }
    ])
  }, [])

  // Methods
  const handleRemove = (key) => {
    app.removeAccount()
  }

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" context={<AccountContext app={app} />} text>
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
              onClick={handleRemove}
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
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(RemoveAccountPage)
