import React from 'react'
import { IntlProvider } from 'react-intl'
import { strings } from '@freesewing/i18n'

const withLanguage = (WrappedComponent, lang = 'en', store = false) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.setLanguage = this.setLanguage.bind(this)
      this.state = { language: lang }
    }

    setLanguage(l) {
      this.setState({ language: l })
    }

    render() {
      return (
        <IntlProvider locale={this.state.language} messages={strings[this.state.language]}>
          <WrappedComponent
            language={this.state.language}
            setLanguage={this.setLanguage}
            {...this.props}
          />
        </IntlProvider>
      )
    }
  }
}

export default withLanguage
