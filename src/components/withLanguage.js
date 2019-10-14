import React from 'react'
import { IntlProvider } from 'react-intl'
import { strings } from '@freesewing/i18n'

const withLanguage = (WrappedComponent, lang = 'en') => {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <IntlProvider locale={lang} messages={strings[lang]}>
          <WrappedComponent
            language={lang}
            {...this.props}
          />
        </IntlProvider>
      )
    }
  }
}

export default withLanguage
