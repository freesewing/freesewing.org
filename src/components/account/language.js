import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import { languages } from '@freesewing/i18n'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const AccountLanguage = props => {
  const [language, setLanguage] = useState(props.app.account.settings.language || 'en')

  const updateLanguage = evt => setLanguage(evt.target.value)

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id="account.languageInfo" />
      </Blockquote>
      <RadioGroup name="language" onChange={updateLanguage} value={language}>
        {Object.keys(languages).map((lang, index) => {
          return (
            <FormControlLabel
              data-test={lang}
              control={<Radio color="primary" />}
              value={lang}
              checked={language === lang ? true : false}
              label={
                props.app.frontend.intl.formatMessage({ id: 'i18n.' + lang }) +
                ' (' +
                languages[lang] +
                ')'
              }
              key={lang}
            />
          )
        })}
      </RadioGroup>
      <p style={{ textAlign: 'right' }}>
        <Button size="large" variant="outlined" color="primary" href="/account/settings" data-test="cancel">
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          data-test="save"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() =>
            props.app.backend.saveAccount(
              { settings: { language: language } },
              props.app.frontend.intl.formatMessage({ id: 'account.language' })
            )
          }
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default AccountLanguage
