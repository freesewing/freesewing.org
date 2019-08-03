import React from 'react'
import Icon from '@material-ui/icons/KeyboardArrowRight'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'

const VisitorMenu = props => {
  const links = [
    {
      to: '/login',
      title: 'app.logIn'
    },
    {
      to: '/signup',
      title: 'app.signUp'
    }
  ]
  return (
    <ul className="topics">
      {links.map(link => (
        <li className="topic" key={link.title}>
          <Link className="topic" to={link.to}>
            <Icon fontSize="inherit" />
            <FormattedMessage id={link.title} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default VisitorMenu
