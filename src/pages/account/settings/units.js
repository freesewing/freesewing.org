import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import AccountContext from '../../../components/context/account'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const UnitsSettingPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [units, setUnits] = useState(app.account.settings.units || 'metric')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.units'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      },
      {
        title: app.translate('app.settings'),
        slug: '/account/settings/'
      }
    ])
    app.setContext(<AccountContext app={app} />)
  }, [])

  // Methods
  const updateUnits = (evt) => setUnits(evt.target.value)

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text>
        <RadioGroup name="units" onChange={updateUnits} value={units}>
          {['metric', 'imperial'].map((type) => {
            return (
              <FormControlLabel
                data-test={type}
                control={<Radio color="primary" />}
                value={type}
                checked={type === units ? true : false}
                label={app.translate('app.' + type + 'Units')}
                key={type}
              />
            )
          })}
        </RadioGroup>
        <p style={{ textAlign: 'right' }}>
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
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([units, 'settings', 'units'], '/account/settings/')}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
        <Blockquote type="note">
          <FormattedMessage id="account.unitsInfo" />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(UnitsSettingPage)
