import React, { useState } from 'react'
import Logo from '@freesewing/components/Logo'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import MainAside from './main-aside'
import Icon from '@freesewing/components/Icon'

const MobileMenu = ({ app, mainMenu }) => {
  // State
  const [account, setAccount] = useState(false)
  const [community, setCommunity] = useState(false)
  const [patterns, setPatterns] = useState(false)

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

  // Icons
  const icons = {
    home: {
      title: 'app.home',
      link: '/',
      icon: <Logo size={22} />
    },
    discord: {
      title: 'app.chatOnDiscord',
      link: 'https://chat.freesewing.org/',
      icon: <Icon icon="discord" />
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
              title={app.translate(icons[icon].title)}
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
      {mainMenu}
    </div>
  )
}

export default MobileMenu
