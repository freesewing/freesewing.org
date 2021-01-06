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
  const [notes, setNotes] = useState(pattern.notes || '')

  if (!pattern) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  // Methods
  const updateNotes = (evt) => setNotes(evt.target.value)
  const handleSave = () => {
    let nameVal = name
    if (name === '') nameVal = props.params.pattern
    app.updatePattern(props.params.pattern, { notes }).catch((err) => console.log(err))
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.editThing', { thing: app.translate('app.notes') })}
      {...app.treeProps(props.location.pathname, false)}
    >
      <TextField
        multiline={true}
        rows="4"
        rowsMax="12"
        fullWidth={true}
        label={app.translate('app.notes')}
        margin="normal"
        variant="outlined"
        value={notes}
        onChange={updateNotes}
      />
      <p>
        <Button size="large" variant="contained" color="primary" onClick={handleSave}>
          <FormattedMessage id="app.saveThing" values={{ thing: app.translate('app.notes') }} />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
