import React from 'react'
import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import { version } from '../../../package.json'
import MainIcons from '../menus/main-aside'
import { FormattedMessage } from 'react-intl'

import './footer.scss'

const Footer = (props) => {
  const social = {
    discord: 'https://discord.gg/YDV4GvU',
    twitter: 'https://twitter.com/freesewing_org',
    instagram: 'https://instagram.com/freesewing_org',
    github: 'https://github.com/freesewing'
  }

  return (
    <footer>
      <div className="cols">
        <div>
          <ul>
            <li className="heading">
              <FormattedMessage id="app.whatIsThis" />
            </li>
            <li>
              <Link to="/docs/about/">
                <FormattedMessage id="app.aboutFreesewing" />
              </Link>
            </li>
            <li>
              <Link to="/docs/about/faq/">
                <FormattedMessage id="app.faq" />
              </Link>
            </li>
            <li>
              <Link to="/patrons/join/">
                <FormattedMessage id="app.becomeAPatron" />
              </Link>
            </li>
            <li>
              <Link to="/docs/about/pledge/">
                <FormattedMessage id="app.ourRevenuePledge" />
              </Link>
            </li>
            <li>
              <Link to="/docs/about/privacy/">
                <FormattedMessage id="app.privacyNotice" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <MainIcons app={props.app} footer />
        </div>
        <div>
          <ul>
            <li className="heading">
              <FormattedMessage id="app.socialMedia" />
            </li>
            {Object.keys(social).map((i) => (
              <li key={i}>
                <a href={social[i]} title={i}>
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="logo">
            <Link to="/">
              <Logo size={props.app.mobile ? 96 : 133} />
            </Link>
            <div className="name">
              <span className="free">Free</span>Sewing
            </div>
          </div>
          <div className="slogan">
            <FormattedMessage id="app.slogan-come" />
            <br />
            <FormattedMessage id="app.slogan-stay" />
          </div>
          <p className="version">
            <a href={'https://github.com/freesewing/freesewing/releases/tag/v' + version}>
              v{version}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
