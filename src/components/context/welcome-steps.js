import React from 'react'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

const WelcomeSteps = ({ app }) => (
  <>
    <h5>
      <FormattedMessage id="app.welcome" />
    </h5>
    ,
    <ul>
      {['units', 'username', 'avatar', 'bio', 'social'].map((step) => (
        <li key={step}>
          <Link to={`/welcome/${step}/`}>{app.translate(`welcome.${step}`)}</Link>
        </li>
      ))}
    </ul>
  </>
)

export default WelcomeSteps
