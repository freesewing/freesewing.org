import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const InstagramSettingPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [instagram, setInstagram] = useState(
    app.account.social ? app.account.social.instagram || '' : ''
  )

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.instagram'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      },
      {
        title: app.translate('app.settings'),
        slug: '/account/settings/'
      }
    ])
  }, [])

  // Methods
  const updateInstagram = (evt) => setInstagram(evt.target.value)

  return (
    <AppWrapper app={app} context={<AccountContext app={app} />}>
      <CenteredLayout app={app} top>
        <Blockquote type="note">
          <FormattedMessage id={'account.instagramInfo'} />
        </Blockquote>
        <TextField
          id="instagram"
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
        <p style={{ textAlign: 'right' }}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            href="/account/settings"
            data-test="cancel"
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button
            data-test="save"
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() =>
              app.updateAccount([instagram, 'social', 'instagram'], '/account/settings/')
            }
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(InstagramSettingPage)
