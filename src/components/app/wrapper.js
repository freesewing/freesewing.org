import React, { useState, useEffect } from 'react'
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
import '@fontsource/ubuntu/300.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource/ubuntu/700.css'
//import '@fontsource/roboto-mono'
//import '@fontsource/permanent-marker'
import Notification from '../notification'
import Loading from '../loading'
import Meta from './meta'
import MobileMenu from '../menus/mobile'
import useScrolledDown from '../../hooks/useScrolledDown'
import Bugsnag from './bugsnag'
import Layout from '../layouts/default'
import MainMenu from '../menus/main'
import { patternLeaf, personLeaf } from './leafs'

/* This component should wrap all page content */
const AppWrapper = (props) => {
  const [scrolledDown, setScrolledDown] = useState(false)

  useEffect(() => {
    let tree = { ...props.app.tree }
    if (props.app.account.username) {
      if (props.app.patterns && Object.keys(props.app.patterns).length > 0) {
        tree.offspring.account.offspring.patterns.offspring = {}
        for (let pattern in props.app.patterns) {
          tree.offspring.account.offspring.patterns.offspring[pattern] = patternLeaf(
            props.app.patterns[pattern],
            props.app.translate
          )
        }
      }
      if (props.app.people && Object.keys(props.app.people).length > 0) {
        tree.offspring.account.offspring.people.offspring = {}
        for (let person in props.app.people) {
          tree.offspring.account.offspring.people.offspring[person] = personLeaf(
            props.app.people[person],
            props.app.translate
          )
        }
      }
    } else delete tree.offspring.account
    props.app.setTree(tree)
    props.app.setMounted(true)
  }, [])

  useScrolledDown((s) => setScrolledDown(s))

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // Scroll to top style
  let sttBase = {
    right: props.app.mobile ? 'calc(1.5rem + 64px)' : '1rem',
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

  let wrapperClasses = props.app.theme === 'light' ? 'theme-wrapper light' : 'theme-wrapper dark'
  if (props.app.menu) wrapperClasses += ' show-menu'
  if (props.app.tablet) wrapperClasses += ' tablet'
  if (props.app.mobile) wrapperClasses += ' mobile'
  if (!props.app.mobile && !props.app.tablet) wrapperClasses += ' desktop'

  const meta = {
    title: props.title || false,
    description: props.description || false,
    image: props.image || false
  }
  const theme = createMuiTheme(themes[props.app.theme])
  const mainMenu = <MainMenu app={props.app} slug={props.slug} />

  if (!props.app.mounted)
    return (
      <MuiThemeProvider theme={theme}>
        <Meta {...meta} />
        <div className={wrapperClasses}>
          {props.noLayout ? (
            props.children
          ) : (
            <Layout {...props} mainMenu={mainMenu}>
              {props.children}
            </Layout>
          )}
          <Footer language={process.env.GATSBY_LANGUAGE} app={props.app} />
        </div>
      </MuiThemeProvider>
    )

  return (
    <Bugsnag>
      <MuiThemeProvider theme={theme}>
        <Meta {...meta} />
        <div className={wrapperClasses}>
          {props.app.mobile ? (
            <>
              <Fab
                title={props.app.translate('app.menu')}
                color="primary"
                className="fab primary only-xs"
                aria-label="Menu"
                onClick={props.app.toggleMenu}
              >
                {props.app.menu ? (
                  <CloseIcon fontSize="inherit" />
                ) : (
                  <MenuIcon fontSize="inherit" />
                )}
              </Fab>
            </>
          ) : (
            !props.noNavbar && <Navbar app={props.app} />
          )}
          <Fab
            title={props.app.translate('app.scrollToTop')}
            color="primary"
            className="fab secondary"
            arial-label="Scroll to top"
            onClick={scrollToTop}
            style={scrolledDown && !props.app.menu ? style.showStt : style.hideStt}
          >
            <UpIcon fontSize="inherit" />
          </Fab>
          {props.noLayout ? (
            props.children
          ) : (
            <Layout {...props} mainMenu={mainMenu}>
              {props.children}
            </Layout>
          )}
          <Notification
            notification={props.app.notification}
            setNotification={props.app.setNotification}
            mobile={props.app.mobile}
          />
          <Loading loading={props.app.loading} />
          {props.app.mobile && (
            <div className="menu" id="mobile-menu" onClick={props.app.closeNav}>
              <MobileMenu app={props.app} mainMenu={mainMenu} />
            </div>
          )}
          <Footer language={process.env.GATSBY_LANGUAGE} app={props.app} />
        </div>
      </MuiThemeProvider>
    </Bugsnag>
  )
}

export default AppWrapper
