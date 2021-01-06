import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import { languages } from '@freesewing/i18n'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [language, setLanguage] = useState(app.account.settings.language || 'en')

  return (
    <AppWrapper app={app} title={app.translate('account.language')} {...app.treeProps(props.path)}>
      <RadioGroup
        name="language"
        onChange={(evt) => setLanguage(evt.target.value)}
        value={language}
      >
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
    </AppWrapper>
  )
}

export default Page
