import React, { useState, useEffect } from "react";
//import { Helmet } from "react-helmet";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import withLanguage from "./withLanguage";
import withStorage from "@freesewing/components/withStorage";
import AppContext from "../context/app";
import useBackend from "../hooks/useBackend";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as themes from "@freesewing/mui-theme";
import Navbar from "@freesewing/components/Navbar";
import Footer from "@freesewing/components/Footer";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import Breadcrumbs from "./breadcrumbs";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Fab from '@material-ui/core/Fab';
import "@freesewing/css-theme";
import capitalize from "@freesewing/utils/capitalize";
import "typeface-roboto-condensed";
import "typeface-permanent-marker";
import { FormattedMessage, injectIntl } from "react-intl";
import Notification from "./notification";
import PreviousNext from "./previous-next";
import TopicsToc from "./topics-toc";
import Loading from "./loading";
import UserMenu from "./user-menu";
import VisitorMenu from "./visitor-menu";
import { list as patterns } from "@freesewing/pattern-info";
// pages
import HomePage from "./pages/homepage";
import LanguagePage from "./pages/language";
import SearchPage from "./pages/search";
import LoginPage from "./session/login/";
import OauthPage from "./session/login/callback";
import LogoutPage from "./session/logout";
import SignupPage from "./session/signup/";
import ConfirmPage from "./session/confirm/";
import AccountPage from "./account/";
import WelcomePage from "./welcome/";
import BlogPage from "./templates/blog-index";
import BlogPostPage from "./templates/blog-post";
import BlogYearPage from "./templates/blog-year";
import ShowcasePage from "./templates/showcase-index";
import ShowcaseCategoryPage from "./templates/showcase-category";
import ShowcasePostPage from "./templates/showcase-post";
import DocumentationPage from "./templates/docs";
import CreateModelPage from "./models/create";
import ModelsPage from "./models/";
import RecipesPage from "./recipes/";
import DraftPage from "./draft/";
//import DraftPattern from "./draft/draft";
import PatronsPage from "./patrons/";
import UsersPage from "./users/";

/* This component is the root component for all pages */

const App = props => {
  const mobile = useMediaQuery("(max-width:599px)");
  const tablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");
  const [theme, setTheme] = useState(props.storageData.theme || "light");
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(props.storageData.notification || false);

  let uri = props.location.pathname;
  // Strip trailing slash
  if (uri.slice(-1) === "/") uri = uri.slice(0,-1);
  const showNotification = (type, message) => {
    props.updateStorageData({type, message}, "notification");
    setNotification({type, message});
  }
  const closeNotification = () => {
    setNotification(false);
    props.updateStorageData(null, "notification");
  }
  const startLoading = () => {
    setLoading(true);
    // FIXME: Add time-out for when loading takes too long
  }
  const stopLoading = () => {
    setLoading(false);
  }
  const backend = useBackend({
    intl: props.intl,
    showNotification,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
    updateStorageData: props.updateStorageData,
    storageData: props.storageData
  });
  useEffect(() => {
    backend.refreshAccount();
  }, []);
  const frontend = {
    showNotification,
    closeNotification,
    toggleDarkMode: () => {
      if (theme === "light") {
        setTheme("dark");
        props.updateStorageData("dark", "theme");
      } else {
        setTheme("light");
        props.updateStorageData("light", "theme");
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
  }
  const app = {
    account: props.storageData.account || {},
    models: props.storageData.models || {},
    recipes: props.storageData.recipes || {},
    backend,
    frontend,
  };

  // Vars
  const navs = {
    left: {
      patterns: {
        type: "link",
        href: "/patterns",
        text: "app.patterns"
      },
      docs: {
        type: "link",
        href: "/docs",
        text: "app.docs"
      },
      blog: {
        type: "link",
        href: "/blog",
        text: "app.blog"
      },
    },
    right: {
      account: app.account.username
      ? { type: "link", href: "/account", text: "app.account" }
      : { type: "link", href: "/login", text: "app.logIn" },
      signup: {
        type: "link",
        href: "/signup",
        text: "app.signUp"
      },
      search: {
        type: "link",
        href: "/search",
        text: <SearchIcon className="nav-icon" />,
        title: "app.search"
      },
      language: {
        type: "link",
        href: "/language",
        text: <LanguageIcon className="nav-icon" />,
        title: "account.languageTitle"
      },
      theme: {
        type: "button",
        onClick: app.frontend.toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      }
    },
  };
  if (app.account.username)  delete navs.right.signup;
  else  delete navs.right.logout;
  const styles = {
    menuIcons: {
      margin: "2rem 0 100px 0",
      textAlign: "center",
    }
  }

  // Figure out page title
  const getTitle = () => {
    if (typeof props.pageContext.node === "undefined") {
      if (props.pageContext.title) {
        return <FormattedMessage id={props.pageContext.title} />
      }
      else return "fixme";
    }
    return props.pageContext.node.frontmatter.linktitle
      ? props.pageContext.node.frontmatter.linktitle
      : props.pageContext.node.frontmatter.title
  }
  app.frontend.pageTitle = getTitle();

  // Build naviation
  let toc = null;
  let slug = props.pageContext.slug;
  if (typeof props.pageContext.node !== "undefined")
    toc = props.pageContext.node.tableOfContents;

  let topics = props.pageContext.topics;
  let topicsToc = props.pageContext.topicsToc;

  if (app.account.username) {
    if (topics.indexOf('models') === -1) topics.push('models');
    topicsToc.models = {
      title: props.intl.formatMessage({id: "app.models"}),
      children: {}
    }
    for (let m in app.models) {
      topicsToc.models.children["/models/"+m] = {
        title: app.models[m].name
      }
    }
    if (topics.indexOf('recipes') === -1) topics.push('recipes');
    topicsToc.recipes = {
      title: props.intl.formatMessage({id: "app.recipes"}),
      children: {}
    }
    if (typeof app.recipes !== "undefined") {
      for (let r in app.recipes) {
        if (typeof app.recipes[r].recipe !== "undefined") {
          topicsToc.recipes.children["/recipes/"+r] = {
            title: capitalize(app.recipes[r].recipe.pattern) + ": " + app.recipes[r].name
          }
        }
      }
    }
  }
  const mainMenu = [<TopicsToc
    page={uri}
    slug={slug}
    topicsToc={topicsToc}
    topics={props.pageContext.topics}
    order={props.pageContext.topicsOrder}
    topic={slug.split("/")[1]}
    toc={toc}
    app={app}
  />];

  // Gather props for pages
  const pageProps = {
    app,
    location: props.location,
    pageContext: props.pageContext,
    slug: uri,
  }

  // Figure out what page to load
  let main = null;
  let noTitle = false;
  let noCrumbs = false;
  let showNext = false;
  if (slug === "/language") main = <LanguagePage {...pageProps} />
  else if (slug === "/search") main = <SearchPage {...pageProps} />
  else if (slug === "/login") {
    main = <LoginPage {...pageProps} />
    noTitle = true;
  }
  else if (slug === "/login/callback") {
    main = <OauthPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug === "/logout") main = <LogoutPage {...pageProps} />
  else if (slug === "/signup") {
    main = <SignupPage {...pageProps} />
    noTitle = true;
  }
  else if (slug === "/confirm") {
    main = <ConfirmPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug.slice(0,8) === "/account") {
    main = <AccountPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug.slice(0,8) === "/welcome") {
    main = <WelcomePage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug === "/model") main = <CreateModelPage {...pageProps} />
  else if (slug.slice(0,7) === "/models") {
    main = <ModelsPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug.slice(0,8) === "/recipes") {
    main = <RecipesPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug.slice(0,8) === "/patrons") {
    main = <PatronsPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug.slice(0,6) === "/users") {
    main = <UsersPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug === "/create" || slug === "/recreate") {
    main = <DraftPage {...pageProps} />
    noTitle = true;
    noCrumbs = true;
  }
  else if (slug === "/blog") main = <BlogPage {...pageProps} />
  else if (slug.slice(0,11) === "/blog/years") {
    const year = uri.split('/').pop();
    main = <BlogYearPage {...pageProps} year={year}/>
    noCrumbs = true;
    noTitle = true;
  }
  else if (slug.slice(0,6) === "/blog/") {
    main = <BlogPostPage {...pageProps} />
    noTitle = true;
    showNext = true;
  }
  else if (slug === "/showcase") main = <ShowcasePage {...pageProps} />
  else if (slug === "/showcase/patterns") {
    const category = uri.split('/').pop();
    main = <ShowcaseCategoryPage {...pageProps} category={category}/>
    noCrumbs = true;
    noTitle = true;
  } else if (slug.slice(0,10) === "/showcase/") {
    main = <ShowcasePostPage {...pageProps} />
    noTitle = true;
    showNext = true;
  }
  else if (slug === "/docs") main = <DocumentationPage {...pageProps} />
  else if (slug.slice(0,6) === "/docs/") {
    main = <DocumentationPage {...pageProps} />
    showNext = true
    if (slug.slice(0,15) === "/docs/patterns/") {
      let chunks = uri.split('/');
      if (chunks.length === 4 && patterns.indexOf(chunks[3]) !== -1) noTitle = true;
    }
  }

  const mobileIcons = (
    <p style={styles.menuIcons}>
      <IconButton href="/" color="primary" variant="contained"><HomeIcon /></IconButton>
      <IconButton href="/search" color="primary" variant="contained"><SearchIcon /></IconButton>
      <IconButton href="/language" color="primary" variant="contained"><LanguageIcon /></IconButton>
      <IconButton onClick={app.frontend.toggleDarkMode} color="primary" variant="contained"><DarkModeIcon style={{transform: "rotate(26deg)"}}/></IconButton>
    </p>
  );


  // Figure out what layout to load (default, draft,  or homepage)
  const crumbs = <Breadcrumbs crumbs={props.pageContext.crumbs} pageTitle={app.frontend.pageTitle} />
  let draftLayout = false;
  let layout = (
    <div className="fs-sa">
      <section>
        <article style={{ maxWidth: '42em', margin: 'auto', }}>
          {noCrumbs ? null : crumbs }
          {noTitle ? null : <h1>{app.frontend.pageTitle}</h1> }
          {main}
          {showNext ? <PreviousNext pageContext={props.pageContext} theme={theme}/> : null }
          {noCrumbs ? null : crumbs }
        </article>
      </section>
      { mobile ? null : (
      <aside>
        <div className="sticky">
          {mainMenu}
          { app.account.username
              ? <UserMenu mobile={mobile} intl={props.intl} slug={uri} />
              : <VisitorMenu />
          }
        </div>
      </aside> )}
    </div>
  );
  if (slug === "/") layout = <HomePage app={app} />
  else {
    let chunks = uri.split('/');
    if (
      (
        chunks.length === 5
        && (chunks[1] === "create" || chunks[1] === "recreate")
        && chunks[3] === "for"
      ) || (
        chunks.length === 4
        && chunks[1] === "recreate"
        && chunks[3] === "replica"
      )
    ) {
      draftLayout = true;
      layout = <DraftPage
        slug={uri}
        app={app}
        mainMenu={mainMenu}
        userMenu={app.account.username
          ? <UserMenu mobile={mobile} intl={props.intl} slug={uri} />
          : <VisitorMenu />
        }
        mobileIcons={mobileIcons}
      />
    }
  }
  const footerLinks = {
    left: {
      blog: "/blog",
      aboutFreesewing: "/docs/about",
      faq: "/docs/faq"
    },
    right: {
      becomeAPatron: "/patrons/join",
      makerDocs: "/docs",
      devDocs: "https://" + props.language + ".freesewing.dev/"
    }
  }

  // Render
  let wrapperClasses = theme === "light"
    ? "theme-wrapper light"
    : "theme-wrapper dark";
  if (menu) wrapperClasses += " show-menu";

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div className={wrapperClasses}>
        <AppContext.Provider value={app}>
          {mobile
            ? (
              <React.Fragment>
                <Fab
                  color="primary"
                  className="fab primary only-xs"
                  aria-label="Menu"
                  onClick={app.frontend.toggleMenu}>
                  { menu
                    ? <CloseIcon fontSize="inherit" />
                    : <MenuIcon fontSize="inherit" />
                  }
                </Fab>
                <Navbar navs={navs} home="/" />
              </React.Fragment>
            )
            : <Navbar navs={navs} home="/" />
          }
          {layout}
          <Notification
            notification={notification}
            closeNotification={closeNotification}
            mobile={mobile}
          />
          <Loading loading={loading} />
          { (mobile && !draftLayout) ? (
            <div className="menu" onClick={app.frontend.closeNav}>
              {mainMenu}
              { app.account.username
                  ? <UserMenu mobile={mobile} intl={props.intl} slug={uri} />
                  : <VisitorMenu />
              }
              {mobileIcons}
            </div>
          ) : null }
        </AppContext.Provider>
        <Footer language={props.language} links={footerLinks}/>
      </div>
    </MuiThemeProvider>
  );
}

export default withStorage(
  withLanguage(
    injectIntl(App),
    process.env.GATSBY_LANG
  ), "freesewing.org"
);
