import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import './menu.scss'

const CommunityMenu = ({ app, className = '' }) => (
  <div className={`style-wrapper ${app.theme} menu-instance wrapper ${className}`}>
    <div>
      <h6>
        <Link to="/community/">
          <FormattedMessage id="app.community" />
        </Link>
      </h6>
      <Link to="/community/#who">
        <FormattedMessage id="cty.whoWeAre" />
      </Link>
      <span> & </span>
      <Link to="/community/#where">
        <FormattedMessage id="cty.whereToFindUs" />
      </Link>
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
