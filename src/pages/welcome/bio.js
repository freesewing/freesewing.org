import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import WelcomeSteps from '../../components/context/welcome-steps'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Markdown from 'react-markdown'
import LoginRequired from '../../components/login-required'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [bio, setBio] = useState(app.account.bio || '')

  const styles = {
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem',
    },
  }

  return (
    <LoginRequired app={app}>
      <AppWrapper
        app={app}
        title={app.translate('account.bioTitle')}
        context={<WelcomeSteps app={app} />}
        crumbs={[{ slug: '/welcome/', title: <FormattedMessage id="app.welcome" /> }]}
      >
        <TextField
          id="bio"
          multiline={true}
          rows="4"
          rowsMax="12"
          fullWidth={true}
          label={app.translate('account.bio')}
          margin="normal"
          variant="outlined"
          value={bio}
          onChange={(evt) => setBio(evt.target.value)}
        />
        <h6>
          <FormattedMessage id="app.preview" />
        </h6>
        <div style={styles.preview} className="shadow">
          <Markdown source={bio} />
        </div>
        <p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([bio, 'bio'], '/welcome/newsletter/')}
          >
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={81} variant="determinate" />
        <Blockquote type="note">
          <FormattedMessage id="account.bioInfo" />
        </Blockquote>
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
