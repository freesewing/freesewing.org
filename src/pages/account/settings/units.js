import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [units, setUnits] = useState(app.account.settings.units || 'metric')

  return (
    <AppWrapper app={app} title={app.translate('account.units')} {...app.treeProps(props.path)}>
      <RadioGroup name="units" onChange={(evt) => setUnits(evt.target.value)} value={units}>
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
    </AppWrapper>
  )
}

export default Page
