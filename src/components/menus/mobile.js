import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Logo from '@freesewing/components/Logo'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'
import MapIcon from '@material-ui/icons/Map'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PatternsMenu from './patterns'
import DocsMenu from './docs'
import CommunityMenu from './community'
import AccountMenu from './account'
import DocsNavigation from '../app/docs-navigation'
import { Link } from 'gatsby'
import ShowIcon from '@material-ui/icons/ExpandMore'
import HideIcon from '@material-ui/icons/ExpandLess'

const MobileMenu = ({ app }) => {
  // State
  const [account, setAccount] = useState(false)
  const [docs, setDocs] = useState(false)
  const [community, setCommunity] = useState(false)
  const [patterns, setPatterns] = useState(false)

  const toggle = (type) => {
    let state = { account, docs, community, patterns }
    let methods = {
      account: setAccount,
      docs: setDocs,
      community: setCommunity,
      patterns: setPatterns
    }
    // Close all
    for (let method in methods) methods[method](false)
    // Open 1 if needed
    if (!state[type]) methods[type](true)
  }

  // Style
  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }
  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh'
    },
    icons: {
      textAlign: 'center',
      margin: '1rem auto'
    },
    iconButton: {
      color: colors[app.theme]
    },
    toggle: {
      display: 'flex',
      flexDirection: 'row',
      color: 'inherit',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1.5rem'
    }
  }

  // Figure out where we are
  let docsMenu = <DocsMenu app={app} className="transparent" />
  if (window && window.location.pathname.slice(0, 5) === '/docs')
    docsMenu = <DocsNavigation app={app} slug={window.location.pathname} />

  // Icons
  const icons = {
    home: {
      title: 'app.home',
      link: '/',
      icon: <Logo size={22} />
    },
    sitemap: {
      title: 'app.sitemap',
      link: '/sitemap/',
      icon: <MapIcon />
    },
    search: {
      title: 'app.search',
      link: '/search/',
      icon: <SearchIcon />
    },
    language: {
      title: 'account.language',
      link: '/language/',
      icon: <LanguageIcon />
    }
  }

  return (
    <div style={style.wrapper}>
      <div style={style.icons}>
        {Object.keys(icons).map((icon) => {
          return (
            <IconButton
              key={icon}
              style={style.iconButton}
              aria-label={icons[icon].title}
              color="inherit"
              href={icons[icon].link}
              title={icons[icon].title}
            >
              {icons[icon].icon}
            </IconButton>
          )
        })}
        <IconButton
          style={style.darkModeButton}
          aria-label={
            app.theme === 'dark' ? app.translate('app.lightMode') : app.translate('app.darkMode')
          }
          onClick={app.toggleDarkMode}
          title={
            app.theme === 'dark' ? app.translate('app.lightMode') : app.translate('app.darkMode')
          }
        >
          {app.theme === 'dark' ? (
            <LightModeIcon style={style.lightModeIcon} />
          ) : (
            <DarkModeIcon style={style.darkModeIcon} />
          )}
        </IconButton>
      </div>
      {app.account.username && (
        <>
          <h5>
            <a role="button" style={style.toggle} onClick={() => toggle('account')} className="poh">
              <FormattedMessage id="app.account" />
              {account ? <HideIcon /> : <ShowIcon />}
            </a>
          </h5>
          <div className={account ? '' : 'collapsed'}>
            <AccountMenu app={app} className="transparent" />
          </div>
        </>
      )}

      <h5>
        <a role="button" style={style.toggle} onClick={() => toggle('patterns')} className="poh">
          <FormattedMessage id="app.patterns" />
          {patterns ? <HideIcon /> : <ShowIcon />}
        </a>
      </h5>
      <div className={patterns ? '' : 'collapsed'}>
        <PatternsMenu app={app} className="transparent" />
      </div>

      <h5>
        <a role="button" style={style.toggle} onClick={() => toggle('docs')} className="poh">
          <FormattedMessage id="app.docs" />
          {docs ? <HideIcon /> : <ShowIcon />}
        </a>
      </h5>
      <div className={docs ? '' : 'collapsed'}>{docsMenu}</div>

      <h5>
        <a role="button" style={style.toggle} onClick={() => toggle('community')} className="poh">
          <FormattedMessage id="app.community" />
          {docs ? <HideIcon /> : <ShowIcon />}
        </a>
      </h5>
      <div className={community ? '' : 'collapsed'}>
        <CommunityMenu app={app} className="transparent" />
      </div>
    </div>
  )
}

export default MobileMenu
