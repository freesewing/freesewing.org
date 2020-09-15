import React from 'react'
import { Link } from 'gatsby'
import DocsIcon from '@material-ui/icons/ChromeReaderMode'
import ShowcaseIcon from '@material-ui/icons/CameraAlt'
import BlogIcon from '@material-ui/icons/RssFeed'
import CommunityIcon from '@material-ui/icons/Favorite'
import AccountIcon from '@material-ui/icons/Face'
import { FormattedMessage } from 'react-intl'
import Icon from '@freesewing/components/Icon'

const links = {
  designs: 'app.designs',
  community: 'app.community',
  showcase: 'app.showcase',
  blog: 'app.blog',
  docs: 'app.docs',
  account: 'app.account'
}
const icons = {
  designs: <Icon icon="withBreasts" />,
  showcase: <ShowcaseIcon />,
  blog: <BlogIcon />,
  docs: <DocsIcon />,
  community: <CommunityIcon />,
  account: <AccountIcon />
}

const MainMenu = (props) => (
  <ul className="aside-main-menu">
    {Object.keys(links).map((link) => {
      return (
        <li key={link}>
          <Link
            to={`/${link}/`}
            className={link === props.active ? 'active' : ''}
            title={props.app.translate(links[link])}
          >
            {icons[link]}
            <span className="text">{<FormattedMessage id={links[link]} />}</span>
          </Link>
        </li>
      )
    })}
  </ul>
)

export default MainMenu
