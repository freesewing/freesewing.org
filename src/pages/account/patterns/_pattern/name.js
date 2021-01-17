import React, { useState } from 'react'
import useApp from '../../../../hooks/useApp'
import usePattern from '../../../../hooks/usePattern'
import AppWrapper from '../../../../components/app/wrapper'

import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'

const Page = (props) => {
  const app = useApp()
  const pattern = usePattern(app, props.params.pattern)

  // State
  const [name, setName] = useState(pattern.name ? pattern.name : '')

  if (!pattern) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  // Methods
  const updateName = (evt) => setName(evt.target.value)
  const handleSave = () => {
    let nameVal = name
    if (name === '') nameVal = props.params.pattern
    app.updatePattern(props.params.pattern, { name: nameVal }).catch((err) => console.log(err))
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.editThing', { thing: app.translate('app.name') })}
      {...app.treeProps(props.location.pathname, false)}
    >
      <TextField
        id="name"
        fullWidth={true}
        label={app.translate('app.name')}
        margin="normal"
        variant="outlined"
        value={name}
        type="text"
        onChange={updateName}
      />
      <p>
        <Button size="large" variant="contained" color="primary" onClick={handleSave}>
          <FormattedMessage id="app.saveThing" values={{ thing: app.translate('app.name') }} />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
