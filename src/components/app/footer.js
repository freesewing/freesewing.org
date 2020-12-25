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
    instagram: 'https://instagram.com/freesewing_org',
    facebook: 'https://www.facebook.com/groups/627769821272714/',
    github: 'https://github.com/freesewing',
    reddit: 'https://www.reddit.com/r/freesewing/',
    twitter: 'https://twitter.com/freesewing_org'
  }

  const links = {
    aboutFreesewing: '/docs/about/',
    faq: '/docs/about/faq',
    becomeAPatron: '/patrons/join/',
    ourRevenuePledge: '/docs/about/pledge',
    privacyNotice: '/docs/about/privacy',
    yourRights: '/docs/about/rights'
  }

  return (
    <footer>
      <div className="cols">
        <div>
          <ul>
            <li className="heading">
              <FormattedMessage id="app.whatIsThis" />
            </li>
            {Object.keys(links).map((key) => (
              <li key={key}>
                <Link to={links[key]} title={props.app.translate(`app.${key}`)}>
                  <FormattedMessage id={`app.${key}`} />
                </Link>
              </li>
            ))}
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
            <Link to="/" title={props.app.translate('app.home')}>
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
        </div>
      </div>
    </footer>
  )
}

export default Footer
