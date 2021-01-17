import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import LoginRequired from '../../components/login-required'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [units, setUnits] = useState(app.account.settings.units)

  return (
    <LoginRequired app={app}>
      <AppWrapper
        app={app}
        title={app.translate('account.unitsTitle')}
        crumbs={[{ slug: '/welcome/', title: <FormattedMessage id="app.welcome" /> }]}
      >
        <RadioGroup name="units" onChange={(evt) => setUnits(evt.target.value)} value={units}>
          <FormControlLabel
            control={<Radio color="primary" />}
            value="metric"
            checked={units === 'metric' ? true : false}
            label={app.translate('app.metricUnits')}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            checked={units === 'imperial' ? true : false}
            value="imperial"
            label={app.translate('app.imperialUnits')}
          />
        </RadioGroup>
        <p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([units, 'settings', 'units'], '/welcome/username/')}
          >
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={24} variant="determinate" />
        <Blockquote type="note">
          <p>
            <FormattedMessage id="account.unitsInfo" />
          </p>
        </Blockquote>
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
