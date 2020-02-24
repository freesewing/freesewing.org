import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import CenteredLayout from '../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import { languages } from '@freesewing/i18n'
import Button from '@material-ui/core/Button'

import LanguageIcon from '../components/language-icon'

const Language = props => {

  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('account.language'))
  }, [])

  const styles = {
    button: {
      height: '64px',
      lineHeight: 1,
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    icon: {
      marginRight: '1rem'
    },
    text: {
      marginRight: '1rem'
    },
    muted: {
      opacity: 0.6,
      fontStyle: 'italic'
    }
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        {Object.keys(languages).map(lang => {
          let current = lang === process.env.GATSBY_LANGUAGE ? true : false
          return (
            <Button
              key={lang}
              style={styles.button}
              variant={current ? 'contained' : 'outlined'}
              color="primary"
              href={'https://' + lang + '.freesewing.org'}
              fullWidth
              size="large"
            >
              <div style={styles.icon}>
                <LanguageIcon language={lang} />
              </div>
              <div style={styles.text}>
                {languages[lang]}
                {current
                  ? null
                  : [
                      <span key="open"> (</span>,
                      <FormattedMessage id={'i18n.' + lang} key="lang" />,
                      <span key="close">)</span>
                    ]}
              </div>
              <div>
                {lang}
                <span style={styles.muted}>.freesewing.org</span>
              </div>
            </Button>
          )
        })}
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(Language)
