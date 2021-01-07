import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

import Popover from '@material-ui/core/Popover'
import AccountMenu from '../menus/account'
import NavbarIcons from './navbar-icons'

import AccountIcon from '@material-ui/icons/Face'
import Icon from '@freesewing/components/Icon'

import DocsIcon from '@material-ui/icons/ChromeReaderMode'
import ShowcaseIcon from '@material-ui/icons/CameraAlt'
import BlogIcon from '@material-ui/icons/RssFeed'
import CommunityIcon from '@material-ui/icons/Favorite'

const ButtonAppBar = (props) => {
  // Don't show on mobile
  if (props.app.mobile) return null

  // Use of effect to avoid SSR issues
  // Effects
  useEffect(() => {
    if (props.app.account.username) setLoggedIn(true)
  }, [props.app.account])

  const [userAnchor, setUserAnchor] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleUserOpen = (event) => setUserAnchor(event.currentTarget)

  const handlePopoverClose = () => {
    setUserAnchor(null)
  }

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
      background: '#1a1d21',
      zIndex: 15
    },
    logo: {
      textDecoration: 'none',
      height: '42px',
      width: '42px',
      padding: '11px',
      display: 'inline-block',
      color: colors.dark
    },
    button: {
      height: '64px',
      padding: '0',
      color: colors.dark
    },
    icon: {
      maxWidth: '24px',
      maxHeight: '24px'
    },
    iconButton: {
      width: '36px'
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
  const icons = {
    blog: <BlogIcon />,
    community: <CommunityIcon />,
    designs: <Icon icon="withBreasts" />,
    docs: <DocsIcon />,
    showcase: <ShowcaseIcon />
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

  const iconStyle = {
    marginRight: props.app.tablet ? '0' : '0.5rem'
  }

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="transparent" elevation={2}>
        <Toolbar disableGutters={true}>
          <Link to="/" style={style.logo} title={props.app.translate('app.home')} className="logo">
            <Logo embed />
          </Link>

          {loggedIn ? (
            <>
              {props.app.tablet ? (
                <IconButton
                  aria-owns={userOpen ? 'user-popover' : undefined}
                  onClick={handleUserOpen}
                  {...buttonProps}
                  style={style.iconButton}
                  title={props.app.translate('app.account')}
                >
                  <AccountIcon style={iconStyle} />
                </IconButton>
              ) : (
                <Button
                  aria-owns={userOpen ? 'user-popover' : undefined}
                  onClick={handleUserOpen}
                  {...buttonProps}
                  title={props.app.translate('app.account')}
                >
                  <AccountIcon style={iconStyle} />
                  <FormattedMessage id="app.account" />
                </Button>
              )}
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
            <Button
              href="/login/"
              color="inherit"
              style={style.button}
              title={props.app.translate('app.login')}
            >
              <FormattedMessage id="app.logIn" />
            </Button>
          )}
          {Object.keys(icons).map((icon) => (
            <IconButton
              style={style.iconButton}
              href={`/${icon}/`}
              size="small"
              title={props.app.translate(`app.${icon}`)}
            >
              {icons[icon]}
            </IconButton>
          ))}

          <span style={style.spacer} />

          {props.app.tablet ? (
            <IconButton style={style.iconButton} href="https://chat.freesewing.org/">
              <Icon style={{ ...iconStyle }} icon="discord" />
            </IconButton>
          ) : (
            <Button {...buttonProps} href="https://chat.freesewing.org/">
              <Icon style={{ ...iconStyle }} icon="discord" />
              <FormattedMessage id="app.chatOnDiscord" />
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

export default React.memo(ButtonAppBar)
