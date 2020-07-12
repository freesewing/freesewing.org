import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

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
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <FormattedMessage id="account.reloadAccountDescription" />
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{ margin: '2rem auto', width: '250px' }}
          onClick={app.refreshAccount}
        >
          <FormattedMessage id="account.reloadAccount" />
        </Button>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(ReloadAccountPage)
