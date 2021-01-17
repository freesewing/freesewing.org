import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import WelcomeSteps from '../../components/context/welcome-steps'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import LoginRequired from '../../components/login-required'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [newsletter, setNewsletter] = useState(app.account.newsletter || false)

  return (
    <LoginRequired app={app}>
      <AppWrapper
        app={app}
        title={app.translate('account.newsletterTitle')}
        context={<WelcomeSteps app={app} />}
        crumbs={[{ slug: '/welcome/', title: <FormattedMessage id="app.welcome" /> }]}
      >
        <RadioGroup name="profile" onChange={() => setNewsletter(!newsletter)} value={newsletter}>
          <FormControlLabel
            data-test="noIDoNot"
            control={<Radio color="primary" />}
            value={false}
            checked={newsletter ? false : true}
            label={app.translate('gdpr.noIDoNot')}
          />
          <FormControlLabel
            data-test="yesIDo"
            control={<Radio color="primary" />}
            value={true}
            checked={newsletter ? true : false}
            label={app.translate('gdpr.yesIDo')}
          />
        </RadioGroup>
        <p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([newsletter, 'newsletter'], '/welcome/social/')}
          >
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={81} variant="determinate" />
        <Blockquote type="note">
          <FormattedMessage id="account.newsletterInfo" />
        </Blockquote>
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
