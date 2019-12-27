import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'
import AppContext from '../../context/app'
import * as themes from '@freesewing/mui-theme'
import Navbar from './navbar'
import Footer from './footer'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
import '@freesewing/css-theme'
import 'typeface-roboto-condensed'
import 'typeface-permanent-marker'
import Notification from '../notification'
import Loading from '../loading'
import Meta from './meta'
import MobileMenu from '../menus/mobile'

/* This component should wrap all page content */

const AppWrapper = ({ app, children }) => {
  let wrapperClasses = app.theme === 'light' ? 'theme-wrapper light' : 'theme-wrapper dark'
  if (app.menu) wrapperClasses += ' show-menu'

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[app.theme])}>
      <Meta app={app} />
      <div className={wrapperClasses}>
        <AppContext.Provider value={app}>
          {app.mobile ? (
            <React.Fragment>
              <Fab
                color="primary"
                className="fab primary only-xs"
                aria-label="Menu"
                onClick={app.toggleMenu}
              >
                {app.menu ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
              </Fab>
              <Navbar app={app} />
            </React.Fragment>
          ) : (
            <Navbar app={app} />
          )}
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
        </AppContext.Provider>
        <Footer language={process.env.GATSBY_LANGUAGE} />
      </div>
    </MuiThemeProvider>
  )
}

export default AppWrapper
