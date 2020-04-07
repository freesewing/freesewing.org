import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const WelcomeSocialPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [github, setGithub] = useState(app.account.social ? app.account.social.github || '' : '')
  const [twitter, setTwitter] = useState(app.account.social ? app.account.social.twitter || '' : '')
  const [instagram, setInstagram] = useState(
    app.account.social ? app.account.social.instagram || '' : ''
  )

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.socialTitle'))
    app.setCrumbs([
      {
        slug: '/welcome/',
        title: <FormattedMessage id="app.welcome" />
      }
    ])
  }, [])

  // Methods
  const updateGithub = (evt) => setGithub(evt.target.value)
  const updateTwitter = (evt) => setTwitter(evt.target.value)
  const updateInstagram = (evt) => setInstagram(evt.target.value)

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <div style={{ textAlign: 'left' }}>
          <Blockquote type="note">
            <p dangerouslySetInnerHTML={{ __html: app.translate('account.socialInfo') }} />
          </Blockquote>
          <h5>Github</h5>
          <TextField
            fullWidth={true}
            label={app.translate('account.github')}
            margin="normal"
            variant="outlined"
            value={github}
            type="text"
            onChange={updateGithub}
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
            onChange={updateTwitter}
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
            onChange={updateInstagram}
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>
            }}
          />
        </div>
        <p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() =>
              app.updateAccount([{ social: github, twitter, instagram }, 'social'], '/')
            }
          >
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={100} variant="determinate" />
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(WelcomeSocialPage)
