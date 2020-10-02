const React = require('react')
const IntlProvider = require('react-intl').IntlProvider
const strings = require('@freesewing/i18n').strings

exports.wrapRootElement = ({ element }) => (
  <IntlProvider
    locale={process.env.GATSBY_LANGUAGE}
    messages={strings[process.env.GATSBY_LANGUAGE]}
  >
    {element}
  </IntlProvider>
)
