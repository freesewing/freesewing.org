import React from 'react'
import DocsIcon from '@material-ui/icons/ChromeReaderMode'
import ShowcaseIcon from '@material-ui/icons/CameraAlt'
import BlogIcon from '@material-ui/icons/RssFeed'
import CommunityIcon from '@material-ui/icons/Favorite'
import AccountIcon from '@material-ui/icons/Face'
import LoginIcon from '@material-ui/icons/VpnKey'
import Icon from '@freesewing/components/Icon'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

const IconBar = ({ app }) => {
  // Keep icons from blowing up on SSR
  const iconStyle = { maxWidth: '64px' }

  const icons = {
    designs: <Icon icon="withBreasts" style={iconStyle} />,
    community: <CommunityIcon style={iconStyle} />,
    showcase: <ShowcaseIcon style={iconStyle} />,
    blog: <BlogIcon style={iconStyle} />,
    docs: <DocsIcon style={iconStyle} />,
  }

  if (app.account && app.account.username) icons.account = <AccountIcon style={iconStyle} />
  else icons.login = <LoginIcon style={iconStyle} />

  return (
    <div className="icons">
      {Object.keys(icons).map((icon) => (
        <div className="icon" key={icon}>
          <Link to={`/${icon}/`} title={app.translate((icon === 'login') ? 'app.logIn' : `app.${icon}`)}>
            {icons[icon]}
            <br />
            <span>
              <FormattedMessage id={icon === 'login' ? 'app.logIn' : `app.${icon}`} />
            </span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default IconBar
