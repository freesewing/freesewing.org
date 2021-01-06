import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import './menu.scss'

const AccountMenu = ({ app, className = '', settingsOnly = false }) => (
  <div className={`style-wrapper ${app.theme} menu-instance wrapper ${className}`}>
    {!app.mobile && !settingsOnly && (
      <>
        <Button className="button" variant="contained" href="/create/" color="primary">
          <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
        </Button>
        <Button className="button" variant="outlined" href="/person/" color="primary">
          <FormattedMessage id="app.addThing" values={{ thing: app.translate('app.person') }} />
        </Button>
        <Button className="button" onClick={app.logout} href="/" color="primary">
          <FormattedMessage id="app.logOut" />
        </Button>
      </>
    )}
    {app.mobile && (
      <ul className="inline fw-400">
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
          <Link to="/" onClick={app.logout}>
            <FormattedMessage id="app.logOut" />
          </Link>
        </li>
      </ul>
    )}
    {!settingsOnly && (
      <>
        <ul className="inline fw-400">
          <li>
            <Link to="/account/patterns/">
              <FormattedMessage id="app.patterns" />
            </Link>
          </li>
          <li>
            <Link to="/account/people/">
              <FormattedMessage id="app.people" />
            </Link>
          </li>
          <li>
            <Link to={`/account/profile/`}>
              <FormattedMessage id="app.profile" />
            </Link>
          </li>
        </ul>
      </>
    )}
    <h6>
      <Link to="/account/settings/">
        <FormattedMessage id="app.settings" />
      </Link>
    </h6>
    <ul className="inline fw-400">
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
    </ul>
    <h6>
      <FormattedMessage id="app.actions" />
    </h6>
    <ul className="inline fw-400">
      <li>
        <Link to="/account/actions/reload/">
          <FormattedMessage id="account.reloadAccount" />
        </Link>
      </li>
      <li>
        <Link to="/account/actions/export/">
          <FormattedMessage id="account.exportYourData" />
        </Link>
      </li>
      <li>
        <Link to="/account/actions/consent/">
          <FormattedMessage id="account.reviewYourConsent" />
        </Link>
      </li>
      <li>
        <Link to="/account/actions/restrict/">
          <FormattedMessage id="account.restrictProcessingOfYourData" />
        </Link>
      </li>
      <li>
        <Link to="/account/actions/remove/">
          <FormattedMessage id="account.removeYourAccount" />
        </Link>
      </li>
    </ul>
  </div>
)

export default AccountMenu
