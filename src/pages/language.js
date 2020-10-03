import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { languages } from '@freesewing/i18n'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'
import LanguageIcon from '../components/language-icon'

const Page = (props) => {
  const app = useApp(false)

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

  const context = [
    <h5>{app.translate('account.language')}</h5>,
    <ul>
      {Object.keys(languages).map((lang) => {
        let current = lang === process.env.GATSBY_LANGUAGE ? true : false
        return current ? (
          <li>
            <Link to="/">{languages[lang]}</Link>
          </li>
        ) : (
          <li>
            <a href={'https://' + lang + '.freesewing.org'}>{languages[lang]}</a>
          </li>
        )
      })}
    </ul>
  ]

  return (
    <AppWrapper app={app} title={app.translate('account.language')} context={context} text>
      {Object.keys(languages).map((lang) => {
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
    </AppWrapper>
  )
}

export default Page
