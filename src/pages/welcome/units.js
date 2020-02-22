import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const WelcomeUnitsPage = props => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [units, setUnits] = useState(app.account.settings.units)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.unitsTitle'))
    app.setCrumbs([
      {
        slug: '/welcome/',
        title: <FormattedMessage id="app.welcome" />
      }
    ])
  }, [])

  // Methods
  const handleUnitsChange = evt => {
    setUnits(evt.target.value)
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <div style={{ textAlign: 'left' }}>
          <Blockquote type="note">
            <p>
              <FormattedMessage id="account.unitsInfo" />
            </p>
          </Blockquote>
          <RadioGroup name="units" onChange={handleUnitsChange} value={units}>
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
        </div>
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
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(WelcomeUnitsPage)
