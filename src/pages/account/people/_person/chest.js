import React, { useState } from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (typeof app.people[props.person] === 'undefined') return null

  // Figure out inital state in a SSR-safe way
  const initial =
    app.people &&
    props.params.person &&
    app.people[props.params.person] &&
    app.people[props.params.person].breasts
      ? app.people[props.params.person].breasts
      : false

  const [breasts, setBreasts] = useState(initial)

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.chest')}
      {...app.treeProps(`/account/people/${props.params.person}/chest/`)}
    >
      <RadioGroup
        name="breasts"
        onChange={(evt) => setBreasts(evt.target.value === 'false' ? false : true)}
        value={breasts}
      >
        <FormControlLabel
          control={<Radio color="primary" />}
          value="true"
          checked={breasts}
          label={app.translate('app.withBreasts')}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          value="false"
          checked={!breasts}
          label={app.translate('app.withoutBreasts')}
        />
      </RadioGroup>
      <p>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() =>
            app.updatePerson(
              props.params.person,
              [breasts, 'breasts'],
              `/account/people/${props.params.person}/`
            )
          }
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
