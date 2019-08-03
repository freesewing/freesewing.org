import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { languages } from '@freesewing/i18n'

const LanguagePage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="account.language" />)
  }, [])
  const bold = { fontWeight: 'bold' }
  return (
    <ul className="links">
      {Object.keys(languages).map(lang => {
        let current = lang === process.env.GATSBY_LANGUAGE ? true : false
        return (
          <li key={lang} style={current ? bold : {}}>
            <a href={current ? '/' : 'https://' + lang + '.freesewing.org'}>
              {lang}.freesewing.org
            </a>
            : {languages[lang]}
            {current
              ? null
              : [
                  <span key="open"> (</span>,
                  <FormattedMessage id={'i18n.' + lang} key="lang" />,
                  <span key="close">)</span>
                ]}
          </li>
        )
      })}
    </ul>
  )
}
export default LanguagePage
