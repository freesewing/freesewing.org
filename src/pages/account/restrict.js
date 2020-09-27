import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import AccountContext from '../../components/context/account'

const RestrictProcessingPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.restrictProcessingOfYourData'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      }
    ])
    app.setContext(<AccountContext app={app} />)
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text>
        <Blockquote type="warning">
          <h4>
            <FormattedMessage id="app.proceedWithCaution" />
          </h4>
          <p>
            <FormattedMessage id="account.restrictProcessingWarning" />
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
              onClick={app.restrictAccount}
            >
              <FormattedMessage id="account.restrictProcessingOfYourData" />
            </Button>
          </p>
        </Blockquote>
        <Blockquote type="note">
          <FormattedMessage
            id="account.restrictProcessingOfYourDataInfo"
            values={{ em: (...chunks) => <em>{chunks}</em> }}
          />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(RestrictProcessingPage)
