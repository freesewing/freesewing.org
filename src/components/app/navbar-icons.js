import React from 'react'
import IconButton from '@material-ui/core/IconButton'

import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'
import SitemapIcon from '@material-ui/icons/Map'

const NavbarIcons = ({ translate, toggleDarkMode, theme, language }) => {
  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }

  const style = {
    iconButton: {
      color: colors[theme]
    },
    icon: {
      maxWidth: '24px',
      maxHeight: '24px'
    },
    spacer: {
      flexGrow: 1
    },
    darkModeIcon: {
      transform: 'rotate(26deg)',
      maxWidth: '24px',
      maxHeight: '24px'
    }
  }

  return (
    <>
      <IconButton
        style={style.iconButton}
        aria-label="menu"
        color="inherit"
        href="/search/"
        title={translate('app.search')}
      >
        <SearchIcon style={style.icon} />
      </IconButton>
      <IconButton
        style={style.iconButton}
        aria-label="menu"
        color="inherit"
        href="/sitemap/"
        title={translate(`app.sitemap`)}
      >
        <SitemapIcon style={style.icon} />
      </IconButton>
      <IconButton
        style={style.iconButton}
        aria-label="menu"
        color="inherit"
        href="/language/"
        title={translate(`i18n.${language}`)}
      >
        <LanguageIcon style={style.icon} />
      </IconButton>
      <IconButton
        style={style.darkModeButton}
        aria-label="menu"
        onClick={toggleDarkMode}
        title={theme === 'dark' ? translate('app.lightMode') : translate('app.darkMode')}
      >
        {theme === 'dark' ? (
          <LightModeIcon style={style.icon} />
        ) : (
          <DarkModeIcon style={style.darkModeIcon} />
        )}
      </IconButton>
    </>
  )
}

export default React.memo(NavbarIcons)
