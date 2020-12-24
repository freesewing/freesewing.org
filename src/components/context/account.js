import React from 'react'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

const AccountContext = ({ app, active = '' }) => [
  <h5>
    <FormattedMessage id="app.account" />
  </h5>,
  <ul>
    <li>
      <Link to="/create/">
        <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
      </Link>
    </li>
    <li>
      <Link to="/person/">
        <FormattedMessage id="app.addThing" values={{ thing: app.translate('app.person') }} />
      </Link>
    </li>
    <li>
      <a href="#" onClick={app.logout}>
        <FormattedMessage id="app.logOut" />
      </a>
    </li>
  </ul>,
  <h6>
    <Link to="/account">
      <FormattedMessage id="app.browse" />
    </Link>
  </h6>,
  <ul>
    <li>
      <Link to="/patterns/">
        <FormattedMessage id="app.patterns" />
      </Link>
    </li>
    <li>
      <Link to="/people/">
        <FormattedMessage id="app.people" />
      </Link>
    </li>
    <li>
      <Link to={`/users/${app.account.username}/`}>
        <FormattedMessage id="app.profile" />
      </Link>
    </li>
  </ul>,
  <h6>
    <Link to="/account/settings/">
      <FormattedMessage id="app.settings" />
    </Link>
  </h6>,
  <ul>
    {[
      'avatar',
      'bio',
      'language',
      'units',
      'github',
      'instagram',
      'twitter',
      'newsletter',
      'email',
      'username',
      'password'
    ].map((setting) => (
      <li key={setting}>
        <Link to={`/account/settings/${setting}/`}>
          <FormattedMessage id={`account.${setting}`} />
        </Link>
      </li>
    ))}
  </ul>,
  <h6>
    <Link to="/account/">
      <FormattedMessage id="app.actions" />
    </Link>
  </h6>,
  <ul>
    <li>
      <Link to="/account/reload/">
        <FormattedMessage id="account.reloadAccount" />
      </Link>
    </li>
    <li>
      <Link to="/account/export/">
        <FormattedMessage id="account.exportYourData" />
      </Link>
    </li>
    <li>
      <Link to="/account/consent/">
        <FormattedMessage id="account.reviewYourConsent" />
      </Link>
    </li>
    <li>
      <Link to="/account/restrict/">
        <FormattedMessage id="account.restrictProcessingOfYourData" />
      </Link>
    </li>
    <li>
      <Link to="/account/remove/">
        <FormattedMessage id="account.removeYourAccount" />
      </Link>
    </li>
  </ul>
]

export default AccountContext
