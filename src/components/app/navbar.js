import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

import Popover from '@material-ui/core/Popover'
import PatternMenu from '../menus/patterns'
import DocsMenu from '../menus/docs'
import CommunityMenu from '../menus/community'
import AccountMenu from '../menus/account'
import NavbarIcons from './navbar-icons'

export default function ButtonAppBar(props) {
  // Don't show on mobile
  if (props.app.mobile) return null

  // Use of effect to avoid SSR issues
  // Effects
  useEffect(() => {
    if (props.app.account.username) setLoggedIn(true)
  }, [props.app.account])

  const [patternAnchor, setPatternAnchor] = useState(null)
  const [docsAnchor, setDocsAnchor] = useState(null)
  const [communityAnchor, setCommunityAnchor] = useState(null)
  const [userAnchor, setUserAnchor] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const handlePatternOpen = (event) => setPatternAnchor(event.currentTarget)
  const handleDocsOpen = (event) => setDocsAnchor(event.currentTarget)
  const handleCommunityOpen = (event) => setCommunityAnchor(event.currentTarget)
  const handleUserOpen = (event) => setUserAnchor(event.currentTarget)

  const handlePopoverClose = () => {
    setPatternAnchor(null)
    setDocsAnchor(null)
    setCommunityAnchor(null)
    setUserAnchor(null)
  }

  const patternsOpen = Boolean(patternAnchor)
  const docsOpen = Boolean(docsAnchor)
  const communityOpen = Boolean(communityAnchor)
  const userOpen = Boolean(userAnchor)

  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }

  const style = {
    wrapper: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
      padding: 0,
      background: props.app.theme === 'dark' ? colors.light : colors.dark,
      zIndex: 15
    },
    logo: {
      textDecoration: 'none',
      height: '42px',
      width: '42px',
      padding: '11px',
      display: 'inline-block',
      color: colors[props.app.theme]
    },
    button: {
      height: '64px',
      padding: '0 18px'
    },
    iconButton: {
      color: colors[props.app.theme]
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

  const popoverProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    disableRestoreFocus: true,
    elevation: 1
  }

  const buttonProps = {
    color: 'primary',
    size: 'large',
    style: style.button
  }
  buttonProps['aria-haspopup'] = 'true'

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar disableGutters={true}>
          <Link to="/" style={style.logo}>
            <Logo embed />
          </Link>
          <Button
            aria-owns={patternsOpen ? 'patterns-popover' : undefined}
            onClick={handlePatternOpen}
            {...buttonProps}
          >
            <FormattedMessage id="app.patterns" />
          </Button>
          <Popover
            id="patterns-popover"
            open={patternsOpen}
            anchorEl={patternAnchor}
            onClose={handlePopoverClose}
            {...popoverProps}
          >
            <PatternMenu app={props.app} />
          </Popover>

          <Button
            aria-owns={docsOpen ? 'docs-popover' : undefined}
            onClick={handleDocsOpen}
            {...buttonProps}
          >
            <FormattedMessage id="app.docs" />
          </Button>
          <Popover
            id="docs-popover"
            open={docsOpen}
            anchorEl={docsAnchor}
            onClose={handlePopoverClose}
            {...popoverProps}
          >
            <DocsMenu app={props.app} />
          </Popover>

          <Button
            aria-owns={communityOpen ? 'docs-popover' : undefined}
            onClick={handleCommunityOpen}
            {...buttonProps}
          >
            <FormattedMessage id="app.community" />
          </Button>
          <Popover
            id="community-popover"
            open={communityOpen}
            anchorEl={communityAnchor}
            onClose={handlePopoverClose}
            {...popoverProps}
          >
            <CommunityMenu app={props.app} />
          </Popover>

          <span style={style.spacer} />

          {loggedIn ? (
            <>
              <Button
                aria-owns={userOpen ? 'user-popover' : undefined}
                onClick={handleUserOpen}
                {...buttonProps}
              >
                <FormattedMessage id="app.account" />
              </Button>
              <Popover
                id="user-popover"
                open={userOpen}
                anchorEl={userAnchor}
                onClose={handlePopoverClose}
                {...popoverProps}
              >
                <AccountMenu app={props.app} />
              </Popover>
            </>
          ) : (
            <Button href="/login/" color="inherit" size="large" style={style.button}>
              <FormattedMessage id="app.logIn" />
            </Button>
          )}
          <NavbarIcons
            translate={props.app.translate}
            toggleDarkMode={props.app.toggleDarkMode}
            theme={props.app.theme}
            language={props.app.language}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}
