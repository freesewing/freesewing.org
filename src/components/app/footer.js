import React from 'react'
import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import MainIcons from '../menus/main-aside'
import { FormattedMessage } from 'react-intl'
import Icon from '@freesewing/components/Icon'

import './footer.scss'

const Footer = (props) => {
  const social = {
    discord: 'https://discord.gg/YDV4GvU',
    instagram: 'https://instagram.com/freesewing_org',
    facebook: 'https://www.facebook.com/groups/627769821272714/',
    github: 'https://github.com/freesewing',
    reddit: 'https://www.reddit.com/r/freesewing/',
    twitter: 'https://twitter.com/freesewing_org',
  }

  const links = {
    aboutFreesewing: '/docs/guide/what/',
    faq: '/docs/faq/',
    becomeAPatron: '/patrons/join/',
    ourRevenuePledge: '/docs/various/pledge/',
    privacyNotice: '/docs/various/privacy/',
    yourRights: '/docs/various/rights/',
  }

  return (
    <footer>
      <div className="cols">
        <div>
          <ul>
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
          <div className="row">
            {Object.keys(social).map((i) => (
              <a key={i} href={social[i]} title={i}>
                <Icon icon={i} size={32} />
              </a>
            ))}
          </div>
          <div className="cc" style={{ padding: '2.5rem 0' }}>
            <div style={{ textAlign: 'center', paddingBottom: '0.5rem' }}>
              <img src="/cc-logo.svg" id="cc-logo" style={{ maxWidth: '200px' }} />
            </div>
            <div className="row license">
              <img src="/cc-by.svg" id="cc-by" style={{ height: '32px', width: '32px' }} />
              <p className="license">
                <b>Content</b> on freesewing.org is licensed under a{' '}
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  Creative Commons Attribution 4.0 International license
                </a>
              </p>
            </div>
            <div className="row license">
              <img src="/osi-logo.svg" id="cc-by" style={{ height: '31px', width: '32px' }} />
              <p className="license">
                Our <b>source code</b> and <b>markdown</b> is{' '}
                <a href="https://github.com/freesewing/">available on GitHub</a> under a{' '}
                <a href="https://opensource.org/licenses/MIT">MIT license</a>
              </p>
            </div>
          </div>
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
