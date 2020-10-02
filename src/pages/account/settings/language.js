import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import AccountContext from '../../../components/context/account'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import { languages } from '@freesewing/i18n'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Page = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [language, setLanguage] = useState(app.account.settings.language || 'en')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.language'))
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
    app.setContext(<AccountContext app={app} />)
  }, [])

  // Methods
  const updateLanguage = (evt) => setLanguage(evt.target.value)

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text>
        <RadioGroup name="language" onChange={updateLanguage} value={language}>
          {Object.keys(languages).map((lang, index) => {
            return (
              <FormControlLabel
                data-test={lang}
                control={<Radio color="primary" />}
                value={lang}
                checked={language === lang ? true : false}
                label={app.translate('i18n.' + lang) + ' (' + languages[lang] + ')'}
                key={lang}
              />
            )
          })}
        </RadioGroup>
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
              app.updateAccount([language, 'settings', 'language'], '/account/settings/')
            }
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
        <Blockquote type="note">
          <FormattedMessage id="account.languageInfo" />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default Page
