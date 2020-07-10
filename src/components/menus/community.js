import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import './menu.scss'

const CommunityMenu = ({ app, className = '' }) => (
  <div className={`style-wrapper ${app.theme} menu-instance wrapper ${className}`}>
    <div>
      <h6>
        <Link to="/blog/">
          <FormattedMessage id="app.blog" />
        </Link>
      </h6>
      <Link to="/blog/">
        <FormattedMessage id="intro.txt-blog" />
      </Link>
      <h6>
        <Link to="/showcase/">
          <FormattedMessage id="app.showcase" />
        </Link>
      </h6>
      <Link to="/showcase/">
        <FormattedMessage id="intro.txt-showcase" />
      </Link>
      <h6>Chat rooms on Gitter</h6>
      <ul className="inline">
        <li className="link">
          <a href="https://gitter.im/freesewing/chat">Chat</a>
        </li>
        <li className="link">
          <a href="https://gitter.im/freesewing/help">Help</a>
        </li>
        <li className="link">
          <a href="https://gitter.im/freesewing/development">Development</a>
        </li>
        <li className="link">
          <a href="https://gitter.im/freesewing/translation">Translation</a>
        </li>
        <li className="link">
          <a href="https://gitter.im/freesewing/design">Design</a>
        </li>
      </ul>
      <h6>
        <FormattedMessage id="app.socialMedia" />
      </h6>
      <ul className="inline">
        <li className="link">
          <a href="https://twitter.com/freesewing_org">Twitter</a>
        </li>
        <li className="link">
          <a href="https://instagram.com/freesewing_org">Instagram</a>
        </li>
      </ul>
    </div>
    <div>
      <h6>
        <FormattedMessage id="app.supportFreesewing" />
        <span> - </span>
        <FormattedMessage id="app.becomeAPatron" />
      </h6>
      <FormattedMessage id="account.patronInfo" />
      <br />
      <Button
        className="button"
        variant="contained"
        color="primary"
        href="/patrons/join/"
        style={{ marginBottom: 0 }}
      >
        <FormattedMessage id="app.becomeAPatron" />
      </Button>
    </div>
  </div>
)

export default CommunityMenu
