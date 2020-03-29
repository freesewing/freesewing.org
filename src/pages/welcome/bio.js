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
import Markdown from 'react-markdown'

const WelcomeBioPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [bio, setBio] = useState(app.account.bio || '')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.bioTitle'))
    app.setCrumbs([
      {
        slug: '/welcome/',
        title: <FormattedMessage id="app.welcome" />
      }
    ])
  }, [])

  // Methods
  const updateBio = (evt) => setBio(evt.target.value)

  // Style
  const styles = {
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem'
    }
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <div style={{ textAlign: 'left' }}>
          <Blockquote type="note">
            <FormattedMessage id="account.bioInfo" />
          </Blockquote>
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
            onChange={updateBio}
          />
          <h6>
            <FormattedMessage id="app.preview" />
          </h6>
          <div style={styles.preview} className="shadow">
            <Markdown source={bio} />
          </div>
        </div>
        <p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([bio, 'bio'], '/welcome/social/')}
          >
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={81} variant="determinate" />
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(WelcomeBioPage)
