import React from 'react'
import { list as patterns } from '@freesewing/pattern-info'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import './menu.scss'

const PatternMenu = ({ app, className = '' }) => (
  <div className={`style-wrapper ${app.theme} menu-instance wrapper ${className}`}>
    {!app.mobile && (
      <>
        <Button variant="contained" color="primary" href="/designs/" className="button">
          <FormattedMessage id="app.browseCollection" />
        </Button>
        {app.account.username && (
          <Button variant="outlined" color="primary" href="/account/patterns/" className="button">
            <FormattedMessage id="app.browseYourPatterns" />
          </Button>
        )}
        <Button color="primary" href="/create/" className="button">
          <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
        </Button>
      </>
    )}
    {app.mobile && (
      <>
        <ul className="inline">
          <li>
            <Link to="/designs/">
              <FormattedMessage id="app.browseCollection" />
            </Link>
          </li>
          {app.account.username && (
            <li>
              <Link to="/account/patterns/">
                <FormattedMessage id="app.browseYourPatterns" />
              </Link>
            </li>
          )}
          <li>
            <Link to="/create/">
              <FormattedMessage
                id="app.newThing"
                values={{ thing: app.translate('app.pattern') }}
              />
            </Link>
          </li>
        </ul>
      </>
    )}
    <h6>
      <FormattedMessage id="app.designs" />
    </h6>
    <ul className="inline">
      {patterns.map((pattern) => (
        <li key={pattern} className="link">
          <Link to={`/designs/${pattern}/`} title={app.translate(`patterns.${pattern}.title`)}>
            {app.translate(`patterns.${pattern}.title`)}
          </Link>
        </li>
      ))}
    </ul>
    {app.account.username && Object.keys(app.patterns).length > 0 && (
      <>
        <h6>
          <FormattedMessage id="app.yourPatterns" />
        </h6>
        <ul className="inline">
          {Object.keys(app.patterns).map((handle) => (
            <li key={handle} className="link">
              <Link to={`/account/patterns/${handle}/`}>{app.patterns[handle].name}</Link>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
)

export default PatternMenu
