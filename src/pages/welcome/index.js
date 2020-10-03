import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import WelcomeSteps from '../../components/context/welcome-steps'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.welcome')}
      context={<WelcomeSteps app={app} />}
      active="account"
      text
    >
      <p>
        <FormattedMessage id="welcome.letUsSetupYourAccount" />
        <FormattedMessage id="welcome.walkYouThrough" />
      </p>
      <ol>
        {['units', 'username', 'avatar', 'bio', 'social'].map((step) => (
          <li key={step}>{app.translate(`welcome.${step}`)}</li>
        ))}
      </ol>
      <p>
        <FormattedMessage id="welcome.someOptional" />
      </p>
      <p>
        <Button size="large" variant="contained" color="primary" href="/welcome/units/">
          <FormattedMessage id="app.continue" />
          <RightIcon style={{ marginLeft: '1rem' }} />
        </Button>
      </p>
      <LinearProgress color="primary" value={5} variant="determinate" />
    </AppWrapper>
  )
}

export default Page
