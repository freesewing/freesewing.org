import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import WelcomeSteps from '../../components/context/welcome-steps'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Markdown from 'react-markdown'

const Page = (props) => {
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
    app.setContext(<WelcomeSteps app={app} />)
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
      <Layout app={app} active="account" text>
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
        <Blockquote type="note">
          <FormattedMessage id="account.bioInfo" />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default Page
