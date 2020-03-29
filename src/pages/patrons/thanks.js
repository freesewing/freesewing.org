import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const PatronThanksPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.thanksForYourSupport'))
    app.setCrumbs([
      {
        title: app.translate('app.patrons'),
        slug: '/patrons/'
      }
    ])
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <div style={{ textAlign: 'center' }}>
          <Robot size={300} pose="yay" />
          <p>
            <Button variant="contained" color="primary" size="large" href="/share/">
              <FormattedMessage id="app.share" />
            </Button>
          </p>
          <Blockquote type="note">
            <FormattedMessage id="app.patronHelp" />
          </Blockquote>
        </div>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(PatronThanksPage)
