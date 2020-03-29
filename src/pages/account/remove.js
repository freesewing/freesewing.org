import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

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
      <CenteredLayout app={app} top>
        <Blockquote type="note">
          <FormattedHTMLMessage id="account.removeYourAccountInfo" />
        </Blockquote>
        <Blockquote type="warning">
          <h4>
            <FormattedMessage id="app.proceedWithCaution" />
          </h4>
          <p>
            <FormattedMessage id="account.removeYourAccountWarning" />
          </p>
          <p style={{ textAlign: 'right' }}>
            <Button href="/account/settings" variant="outlined" color="primary" data-test="back">
              <FormattedMessage id="app.back" />
            </Button>
          </p>
        </Blockquote>

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
            <FormattedHTMLMessage id="account.removeYourAccount" />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(RemoveAccountPage)
