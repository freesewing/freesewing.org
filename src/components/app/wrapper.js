import React, { useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'
import * as themes from '@freesewing/mui-theme'
import Navbar from './navbar'
import Footer from './footer'
import MenuIcon from '@material-ui/icons/Menu'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import CloseIcon from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
import '@freesewing/css-theme'
import 'typeface-roboto-condensed'
import 'typeface-permanent-marker'
import Notification from '../notification'
import Loading from '../loading'
import Meta from './meta'
import MobileMenu from '../menus/mobile'
import useScrolledDown from '../../hooks/useScrolledDown'
import Bugsnag from './bugsnag'

/* This component should wrap all page content */
const AppWrapper = ({ app, children }) => {
  const [scrolledDown, setScrolledDown] = useState(false)
  useScrolledDown((s) => setScrolledDown(s))

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // Scroll to top style
  let sttBase = {
    right: app.mobile ? 'calc(1.5rem + 64px)' : '1rem',
    transition: 'margin-bottom ease-in-out 0.1s'
  }
  const style = {
    showStt: {
      ...sttBase,
      marginBottom: 0
    },
    hideStt: {
      ...sttBase,
      marginBottom: 'calc(-64px - 1rem)'
    }
  }

  let wrapperClasses = app.theme === 'light' ? 'theme-wrapper light' : 'theme-wrapper dark'
  if (app.menu) wrapperClasses += ' show-menu'
  if (app.mobileAside) wrapperClasses += ' show-mobile-aside'
  if (app.tablet) wrapperClasses += ' tablet'
  if (app.mobile) wrapperClasses += ' mobile'
  if (!app.mobile && !app.tablet) wrapperClasses += ' desktop'

  return (
    <Bugsnag>
      <MuiThemeProvider theme={createMuiTheme(themes[app.theme])}>
        <Meta app={app} />
        <div className={wrapperClasses}>
          {app.mobile ? (
            <>
              <Fab
                title={app.translate('app.menu')}
                color="primary"
                className="fab primary only-xs"
                aria-label="Menu"
                onClick={app.toggleMenu}
              >
                {app.menu ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
              </Fab>
              <Navbar app={app} />
            </>
          ) : (
            <Navbar app={app} />
          )}
          <Fab
            title={app.translate('app.scrollToTop')}
            color="primary"
            className="fab secondary"
            arial-label="Scroll to top"
            onClick={scrollToTop}
            style={scrolledDown && !app.menu ? style.showStt : style.hideStt}
          >
            <UpIcon fontSize="inherit" />
          </Fab>
          {children}
          <Notification
            notification={app.notification}
            setNotification={app.setNotification}
            mobile={app.mobile}
          />
          <Loading loading={app.loading} />
          {app.mobile && (
            <div className="menu" onClick={app.closeNav}>
              <MobileMenu app={app} />
            </div>
          )}
          <Footer language={process.env.GATSBY_LANGUAGE} app={app} />
        </div>
      </MuiThemeProvider>
    </Bugsnag>
  )
}

export default AppWrapper
