import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const ExportAccountPage = (props) => {
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
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <Blockquote type="note">
          <FormattedMessage
            id="account.exportYourDataInfo"
            values={{ em: (...chunks) => <em>{chunks}</em> }}
          />
        </Blockquote>
        <h6 style={{ textAlign: 'center' }}>
          <FormattedMessage id="account.exportYourDataTitle" />
        </h6>
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
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(ExportAccountPage)
