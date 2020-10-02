import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import AccountContext from '../../components/context/account'

const Page = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.exportYourData'))
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
        <h6>
          <FormattedMessage id="account.exportYourDataTitle" />
        </h6>
        <p>
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
            data-test="export"
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            onClick={app.exportAccount}
          >
            <FormattedMessage id="account.exportYourData" />
          </Button>
        </p>
        <Blockquote type="note">
          <FormattedMessage
            id="account.exportYourDataInfo"
            values={{ em: (...chunks) => <em>{chunks}</em> }}
          />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default Page
