import React, { useState } from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Blockquote from '@freesewing/components/Blockquote'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import { FormattedMessage } from 'react-intl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

const Page = (props) => {
  const app = useApp()

  const [units, setUnits] = useState(
    app.account
      ? app.account.settings
        ? app.account.settings.units || 'metric'
        : 'metric'
      : 'metric'
  )
  const [name, setName] = useState('')
  const [breasts, setBreasts] = useState('false')
  const [help, setHelp] = useState(false)

  const updateUnits = (evt) => setUnits(evt.target.value)
  const updateName = (evt) => setName(evt.target.value)
  const updateBreasts = (evt) => setBreasts(evt.target.value)
  const createPerson = () =>
    app.createPerson({
      name,
      units,
      breasts: breasts === 'true' ? true : false,
    })

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.addThing', { thing: app.translate('app.person') })}
      description={app.translate('app.addThing', { thing: app.translate('app.person') })}
      active="account"
      text
    >
      <div style={{ textAlign: 'left' }}>
        <h5 data-test="name-title">
          <FormattedMessage id="app.name" />
        </h5>
        <TextField
          data-test="name"
          fullWidth={true}
          label={app.translate('app.name')}
          margin="normal"
          variant="outlined"
          value={name}
          type="text"
          onChange={updateName}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {name.length > 0 ? (
                  <ValidIcon style={{ color: '#40c057' }} data-test="valid" />
                ) : (
                  <InvalidIcon color="error" data-test="invalid" />
                )}
              </InputAdornment>
            ),
          }}
        />
        <h5 data-test="units-title">
          <FormattedMessage id="account.units" />
        </h5>
        <RadioGroup name="units" onChange={updateUnits} value={units} data-test="units">
          {['metric', 'imperial'].map((type) => {
            return (
              <FormControlLabel
                control={<Radio color="primary" data-test={type} />}
                value={type}
                checked={type === units ? true : false}
                label={app.translate('app.' + type + 'Units')}
                key={type}
              />
            )
          })}
        </RadioGroup>
        <h5 data-test="chest-title">
          <FormattedMessage id="app.chest" />
          <sup>
            <a
              href="#logo"
              data-test="help"
              onClick={() => setHelp(!help)}
              style={{ padding: '2rem', fontSize: '85%', marginLeft: 'calc(-2rem + 5px)' }}
            >
              {help ? 'x' : '?'}
            </a>
          </sup>
        </h5>
        {help ? (
          <Blockquote type="note">
            <p>
              <FormattedMessage id="app.chestInfo" />
            </p>
          </Blockquote>
        ) : null}
        <RadioGroup name="breasts" onChange={updateBreasts} value={breasts}>
          {['true', 'false'].map((type) => {
            return (
              <FormControlLabel
                control={
                  <Radio
                    color="primary"
                    data-test={type === 'true' ? 'withBreasts' : 'withoutBreasts'}
                  />
                }
                value={type}
                checked={type === breasts ? true : false}
                label={app.translate('app.' + (type === 'true' ? 'withBreasts' : 'withoutBreasts'))}
                key={type}
              />
            )
          })}
        </RadioGroup>
        <p style={{ textAlign: 'center' }}>
          <Button
            data-test="save"
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            disabled={name.length > 0 ? false : true}
            onClick={createPerson}
          >
            <FormattedMessage
              id="app.addThing"
              values={{ thing: <FormattedMessage id="app.person" /> }}
            />
          </Button>
        </p>
      </div>
    </AppWrapper>
  )
}

export default Page
