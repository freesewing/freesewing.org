import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const PersonNamePage = (props) => {
  // Hooks
  const app = useApp()

  if (typeof app.people[props.person] === 'undefined') return null // FIXME: Show something better than nothing in SSR

  // State
  const [name, setName] = useState(app.people[props.person].name)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.name'))
    app.setCrumbs([
      {
        slug: '/people/',
        title: app.translate('app.people')
      },
      {
        slug: '/people/' + props.person + '/',
        title: app.people[props.person].name || props.person
      }
    ])
  }, [])

  // Methods
  const updateName = (evt) => setName(evt.target.value)

  // Styles

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <TextField
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
                  <ValidIcon style={{ color: '#40c057' }} />
                ) : (
                  <InvalidIcon color="error" />
                )}
              </InputAdornment>
            )
          }}
        />
        <p style={{ textAlign: 'right' }}>
          <Button
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="outlined"
            color="primary"
            href={`/people/${props.person}/`}
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
              app.updatePerson(props.person, [name, 'name'], `/people/${props.person}/`)
            }
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(PersonNamePage)
