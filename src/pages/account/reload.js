import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import AccountContext from '../../components/context/account'

const ReloadAccountPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.reloadAccount'))
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
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(ReloadAccountPage)
