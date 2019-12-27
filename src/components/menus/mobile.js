import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import Logo from '@freesewing/components/Logo'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import PatternsMenu from './patterns'
import DocsMenu from './docs'
import CommunityMenu from './community'
import AccountMenu from './account'
import DocsNavigation from '../app/docs-navigation'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const MobileMenu = ({ app }) => {
  // State
  const [expanded, setExpanded] = useState(
    window && window.location.pathname.slice(0, 5) === '/docs' ? 'docs' : false
  )

  // Methods
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  // Style
  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }
  const style = {
    wrapper: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column'
    },
    icons: {
      textAlign: 'center',
      marginBottom: '1rem'
    },
    iconButton: {
      color: colors[app.theme]
    },
    h5: {}
  }

  // Figure out where we are
  let docsMenu = <DocsMenu app={app} />
  if (window && window.location.pathname.slice(0, 5) === '/docs')
    docsMenu = <DocsNavigation app={app} slug={window.location.pathname} />

  return (
    <div style={style.wrapper}>
      <div style={style.icons}>
        <IconButton
          style={style.iconButton}
          aria-label="menu"
          color="inherit"
          href="/"
          title={app.translate('app.home')}
        >
          <Logo size={22} />
        </IconButton>
        <IconButton
          style={style.iconButton}
          aria-label="menu"
          color="inherit"
          href="/search/"
          title={app.translate('app.search')}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          style={style.iconButton}
          aria-label="menu"
          color="inherit"
          href="/language/"
          title={app.translate(`i18n.${app.language}`)}
        >
          <LanguageIcon />
        </IconButton>
        <IconButton
          style={style.darkModeButton}
          aria-label="menu"
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

      <ExpansionPanel expanded={expanded === 'account'} onChange={handleChange('account')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-content"
          id="account-header"
        >
          <h5 style={style.h5}>
            <FormattedMessage id="app.account" />
          </h5>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AccountMenu app={app} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={expanded === 'patterns'} onChange={handleChange('patterns')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="patterns-content"
          id="patterns-header"
        >
          <h5 style={style.h5}>
            <FormattedMessage id="app.patterns" />
          </h5>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PatternsMenu app={app} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={expanded === 'docs'} onChange={handleChange('docs')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h5 style={style.h5}>
            <FormattedMessage id="app.docs" />
          </h5>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{docsMenu}</ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={expanded === 'community'} onChange={handleChange('community')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="community-content"
          id="community-header"
        >
          <h5 style={style.h5}>
            <FormattedMessage id="app.community" />
          </h5>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CommunityMenu app={app} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default MobileMenu
