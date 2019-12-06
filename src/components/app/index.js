import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'
import withLanguage from '../withLanguage'
import withStorage from '@freesewing/components/withStorage'
import AppContext from '../../context/app'
import useBackend from '../../hooks/useBackend'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import * as themes from '@freesewing/mui-theme'
import Navbar from './navbar'
import Footer from './footer'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import Breadcrumbs from '../breadcrumbs'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
import '@freesewing/css-theme'
import 'typeface-roboto-condensed'
import 'typeface-permanent-marker'
import { injectIntl, FormattedMessage } from 'react-intl'
import Notification from '../notification'
import PreviousNext from '../previous-next'
import MainMenu from './main-menu'
import Loading from '../loading'
import UserMenu from '../user-menu'
import VisitorMenu from '../visitor-menu'
import MainPage from './main-page'
import getLayout from './getLayout'
import crumbsFromNavigation from './crumbsFromNavigation'
import PatronIcon from '@material-ui/icons/Favorite'

/* This component is the root component for all pages */

const App = props => {
  // React hooks
  const mobile = useMediaQuery('(max-width:599px)')
  const tablet = useMediaQuery('(min-width: 600px) and (max-width: 959px)')
  const [theme, setTheme] = useState(props.storageData.theme || 'light')
  const [menu, setMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(props.storageData.notification || false)
  const [crumbs, setCrumbs] = useState(
    crumbsFromNavigation(
      props.location.pathname,
      props.pageContext.navigation,
      props.pageContext.titles
    )
  )
  const [title, setTitle] = useState('FreeSewing')
  const [description, setDescription] = useState(false)
  const [image, setImage] = useState(
    `https://freesewing.org/share/${process.env.GATSBY_LANGUAGE}.wide.jpg`
  )
  const [url, setUrl] = useState(`https://${process.env.GATSBY_LANGUAGE}.freesewing.org/`)
  const [next, setNext] = useState(false)
  const [pageLayout, setPageLayout] = useState('loading')
  useEffect(() => {
    setPageLayout(getLayout(props.location.pathname))
  }, [props.location.pathname])
  useEffect(() => {
    app.backend.refreshAccount()
  }, [])

  // Methods
  const showNotification = (type, message) => {
    props.updateStorageData({ type, message }, 'notification')
    setNotification({ type, message })
  }

  const closeNotification = () => {
    setNotification(false)
    props.updateStorageData(null, 'notification')
  }

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  // Prepare props
  const app = {
    account: props.storageData.account || {},
    models: props.storageData.models || {},
    recipes: props.storageData.recipes || {},
    impersonates: props.storageData.admin ? true : false,
    backend: useBackend({
      intl: props.intl,
      showNotification,
      startLoading: () => setLoading(true),
      stopLoading: () => setLoading(false),
      updateStorageData: props.updateStorageData,
      storageData: props.storageData
    }),
    frontend: {
      showNotification,
      closeNotification,
      toggleDarkMode: () => {
        if (theme === 'light') {
          setTheme('dark')
          props.updateStorageData('dark', 'theme')
        } else {
          setTheme('light')
          props.updateStorageData('light', 'theme')
        }
      },
      toggleMenu: () => setMenu(!menu),
      closeNav: () => {
        if (menu) setMenu(false)
      },
      startLoading,
      stopLoading,
      mobile,
      tablet,
      intl: props.intl,
      theme,
      setTitle,
      setDescription,
      setImage,
      setUrl,
      setCrumbs,
      setNext,
      updateStorageData: props.updateStorageData,
      storageData: props.storageData
    }
  }

  const uri =
    props.location.pathname.slice(-1) === '/'
      ? props.location.pathname.slice(0, -1)
      : props.location.pathname

  const mobileIconButton = {
    fontSize: '64px'
  }
  const mobileIcons = (
    <div style={{ margin: '2rem 0' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          margin: '2rem 0'
        }}
      >
        <Button href="/" color="primary" style={mobileIconButton}>
          <HomeIcon fontSize="inherit" />
        </Button>
        <Button href="/patrons" color="primary" style={mobileIconButton}>
          <PatronIcon fontSize="inherit" style={{ color: '#e64980' }} />
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          margin: '2rem 0'
        }}
      >
        <Button href="/search" color="primary" style={mobileIconButton}>
          <SearchIcon fontSize="inherit" />
        </Button>
        <Button href="/language" color="primary" style={mobileIconButton}>
          <LanguageIcon fontSize="inherit" />
        </Button>
        <Button onClick={app.frontend.toggleDarkMode} color="primary" style={mobileIconButton}>
          <DarkModeIcon
            fontSize="inherit"
            style={{ transform: 'rotate(26deg)', color: '#ffd43b' }}
          />
        </Button>
      </div>
    </div>
  )

  let layout = getLayout(props.location.pathname)
  const layouts = {
    home: <MainPage app={app} pageContext={props.pageContext} slug={props.slug} uri={uri} />,
    draft: (
      <MainPage
        app={app}
        pageContext={props.pageContext}
        slug={props.slug}
        uri={uri}
        mainMenu={<MainMenu app={app} pageContext={props.pageContext} uri={uri} />}
        userMenu={
          app.account.username ? (
            <UserMenu mobile={mobile} intl={props.intl} slug={uri} />
          ) : (
            <VisitorMenu />
          )
        }
        mobileIcons={mobileIcons}
      />
    ),
    default: (
      <div className="fs-sa">
        <section>
          <article style={{ maxWidth: '42em', margin: 'auto' }}>
            {crumbs && title ? <Breadcrumbs crumbs={crumbs} pageTitle={title} /> : null}
            {title ? <h1>{title}</h1> : null}
            <MainPage app={app} pageContext={props.pageContext} slug={props.slug} uri={uri} />
            {next ? <PreviousNext pageContext={props.pageContext} theme={theme} /> : null}
            {crumbs && title ? <Breadcrumbs crumbs={crumbs} pageTitle={title} /> : null}
          </article>
        </section>
        {mobile ? null : (
          <aside>
            <div className="sticky">
              <MainMenu app={app} pageContext={props.pageContext} uri={uri} />
              {app.account.username ? (
                <UserMenu mobile={mobile} intl={props.intl} slug={uri} />
              ) : (
                <VisitorMenu />
              )}
            </div>
          </aside>
        )}
      </div>
    ),
    loading: (
      <Loading loading={true} init>
        <MainMenu app={app} pageContext={props.pageContext} uri={uri} />
      </Loading>
    )
  }
  // Render
  let wrapperClasses = theme === 'light' ? 'theme-wrapper light' : 'theme-wrapper dark'
  if (menu) wrapperClasses += ' show-menu'
  wrapperClasses += ' layout' + pageLayout

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://freesewing.org/share/en.wide.jpg" />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://freesewing.org/share/en.wide.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className={wrapperClasses}>
        <AppContext.Provider value={app}>
          {mobile ? (
            <React.Fragment>
              <Fab
                color="primary"
                className="fab primary only-xs"
                aria-label="Menu"
                onClick={app.frontend.toggleMenu}
              >
                {menu ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
              </Fab>
              <Navbar app={app} />
            </React.Fragment>
          ) : (
            <Navbar app={app} />
          )}
          {layouts[pageLayout]}
          <Notification
            notification={notification}
            closeNotification={closeNotification}
            mobile={mobile}
          />
          <Loading loading={loading} />
          {mobile && layout !== 'Draft' ? (
            <div className="menu" onClick={app.frontend.closeNav}>
              <MainMenu app={app} pageContext={props.pageContext} uri={uri} />
              {app.account.username ? (
                <UserMenu mobile={mobile} intl={props.intl} slug={uri} />
              ) : (
                <VisitorMenu />
              )}
              {mobileIcons}
            </div>
          ) : null}
        </AppContext.Provider>
        <Footer language={props.language} />
      </div>
    </MuiThemeProvider>
  )
}

export default withStorage(
  withLanguage(injectIntl(App), process.env.GATSBY_LANGUAGE),
  'freesewing.org'
)
