import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import WelcomeSteps from '../../components/context/welcome-steps'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [github, setGithub] = useState(app.account.social ? app.account.social.github || '' : '')
  const [twitter, setTwitter] = useState(app.account.social ? app.account.social.twitter || '' : '')
  const [instagram, setInstagram] = useState(
    app.account.social ? app.account.social.instagram || '' : ''
  )

  return (
    <AppWrapper
      app={app}
      title={app.translate('account.socialTitle')}
      context={<WelcomeSteps app={app} />}
      crumbs={[{ slug: '/welcome/', title: <FormattedMessage id="app.welcome" /> }]}
      active="account"
      text
    >
      <h5>Github</h5>
      <TextField
        fullWidth={true}
        label={app.translate('account.github')}
        margin="normal"
        variant="outlined"
        value={github}
        type="text"
        onChange={(evt) => setGithub(evt.target.valuet)}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>
        }}
      />
      <h5>Twitter</h5>
      <TextField
        fullWidth={true}
        label={app.translate('account.twitter')}
        margin="normal"
        variant="outlined"
        value={twitter}
        type="text"
        onChange={(evt) => setTwitter(evt.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>
        }}
      />
      <h5>Instagram</h5>
      <TextField
        fullWidth={true}
        label={app.translate('account.instagram')}
        margin="normal"
        variant="outlined"
        value={instagram}
        type="text"
        onChange={(evt) => setInstagram(evt.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>
        }}
      />
      <p>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => app.updateAccount([{ social: github, twitter, instagram }, 'social'], '/')}
        >
          <FormattedMessage id="app.continue" />
          <RightIcon style={{ marginLeft: '1rem' }} />
        </Button>
      </p>
      <LinearProgress color="primary" value={100} variant="determinate" />
      <Blockquote type="note">
        <p dangerouslySetInnerHTML={{ __html: app.translate('account.socialInfo') }} />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
