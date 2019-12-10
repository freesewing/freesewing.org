import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { languages } from '@freesewing/i18n'
import Button from '@material-ui/core/Button'
import LanguageIcon from '../language-icon'

const LanguagePage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({ id: 'account.language' }))
  }, [])
  const styles = {
    wrapper: {
      maxWidth: '500px',
      margin: 'auto'
    },
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
    <div style={styles.wrapper}>
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
    </div>
  )
}
export default LanguagePage
