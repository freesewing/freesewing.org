import React from 'react'
import NavbarBase from '@freesewing/components/Navbar'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'
import AccountIcon from '@material-ui/icons/Face'
import AddIcon from '@material-ui/icons/AddCircle'
import PatronIcon from '@material-ui/icons/Favorite'

const Navbar = props => {
  const navs = {
    left: {
      patterns: {
        type: 'link',
        href: '/patterns',
        text: 'app.patterns'
      },
      docs: {
        type: 'link',
        href: '/docs',
        text: 'app.docs'
      },
      blog: {
        type: 'link',
        href: '/blog',
        text: 'app.blog'
      }
    },
    right: {
      login: {
        type: 'link',
        href: '/login',
        text: 'app.logIn',
        title: props.app.frontend.intl.formatMessage({ id: 'app.logIn' })
      },
      signup: {
        type: 'link',
        href: '/signup',
        text: 'app.signUp',
        title: props.app.frontend.intl.formatMessage({ id: 'app.signUp' })
      },
      patrons: {
        type: 'link',
        href: '/patrons',
        text: <PatronIcon className="nav-icon" style={{ color: '#e64980', maxWidth: '24px' }} />,
        title: props.app.frontend.intl.formatMessage({ id: 'app.ourPatrons' })
      },
      create: {
        type: 'link',
        href: '/create',
        text: <AddIcon className="nav-icon" style={{ color: '#40c057', maxWidth: '24px' }} />,
        title: props.app.frontend.intl.formatMessage(
          { id: 'app.newPattern' },
          { pattern: props.app.frontend.intl.formatMessage({ id: 'app.pattern' }) }
        )
      },
      account: {
        type: 'link',
        href: '/account',
        title: props.app.frontend.intl.formatMessage({ id: 'app.account' }),
        text: <AccountIcon className="nav-icon" style={{ color: '#74c0fc', maxWidth: '24px' }} />
      },
      search: {
        type: 'link',
        href: '/search',
        text: <SearchIcon className="nav-icon" style={{ maxWidth: '24px' }} />,
        title: props.app.frontend.intl.formatMessage({ id: 'app.search' })
      },
      language: {
        type: 'link',
        href: '/language',
        text: <LanguageIcon className="nav-icon" style={{ maxWidth: '24px' }} />,
        title: props.app.frontend.intl.formatMessage({ id: 'account.languageTitle' })
      },
      theme: {
        type: 'button',
        onClick: props.app.frontend.toggleDarkMode,
        text: (
          <DarkModeIcon className="nav-icon moon" style={{ color: '#ffd43b', maxWidth: '24px' }} />
        ),
        title: props.app.frontend.intl.formatMessage({ id: 'app.darkMode' })
      }
    }
  }
  if (props.app.account.username) {
    delete navs.right.login
    delete navs.right.signup
  } else {
    delete navs.right.create
    delete navs.right.account
  }
  const baseProps = {
    navs,
    home: '/'
  }
  if (props.app.frontend.tablet) {
    baseProps.emblem = null
    delete navs.left.docs
  }
  return <NavbarBase {...baseProps} />
}

export default Navbar
