import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'

const WelcomePage = props => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.welcome'))
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <div style={{ textAlign: 'left' }}>
          <p>
            <FormattedMessage id="welcome.letUsSetupYourAccount" />
            <FormattedMessage id="welcome.walkYouThrough" />
          </p>
          <ol>
            {['units', 'username', 'avatar', 'bio', 'social'].map(step => (
              <li key={step}>{app.translate(`welcome.${step}`)}</li>
            ))}
          </ol>
          <p>
            <FormattedMessage id="welcome.someOptional" />
          </p>
        </div>
        <p>
          <Button size="large" variant="contained" color="primary" href="/welcome/units/">
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={5} variant="determinate" />
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(WelcomePage)
