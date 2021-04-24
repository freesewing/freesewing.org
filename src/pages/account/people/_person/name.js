import React, { useState } from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (typeof app.people[props.person] === 'undefined') return null

  const [name, setName] = useState(app.people[props.person].name)

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.name')}
      {...app.treeProps(`/account/people/${props.params.person}/name/`)}
    >
      <TextField
        fullWidth={true}
        label={app.translate('app.name')}
        margin="normal"
        variant="outlined"
        value={name}
        type="text"
        onChange={(evt) => setName(evt.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {name.length > 0 ? (
                <ValidIcon style={{ color: '#40c057' }} />
              ) : (
                <InvalidIcon color="error" />
              )}
            </InputAdornment>
          ),
        }}
      />
      <p style={{ textAlign: 'right' }}>
        <Button
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="outlined"
          color="primary"
          href={`/account/people/${props.person}/`}
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          disabled={name.length > 0 ? false : true}
          onClick={() =>
            app.updatePerson(props.person, [name, 'name'], `/account/people/${props.person}/`)
          }
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
