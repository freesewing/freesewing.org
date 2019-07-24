import React from "react";
import LanguagePage from "../pages/language";
import SearchPage from "../pages/search";
import LoginPage from "../session/login/";
import OauthPage from "../session/login/callback";
import LogoutPage from "../session/logout";
import SignupPage from "../session/signup/";
import ConfirmPage from "../session/confirm/";
import AccountPage from "../account/";
import WelcomePage from "../welcome/";
import BlogPage from "../templates/blog-index";
import BlogPostPage from "../templates/blog-post";
import BlogYearPage from "../templates/blog-year";
import ShowcasePage from "../templates/showcase-index";
import ShowcaseCategoryPage from "../templates/showcase-category";
import ShowcasePostPage from "../templates/showcase-post";
import DocumentationPage from "../templates/docs";
import CreateModelPage from "../models/create";
import ModelsPage from "../models/";
import RecipesPage from "../recipes/";
import DraftPage from "../draft/";
import PatronsPage from "../patrons/";
import UsersPage from "../users/";
import HomePage from "../pages/homepage";

const MainPage = props => {
  // Props for pages
  const pageProps = {
    app: props.app,
    pageContext: props.pageContext,
    slug: props.uri,
  }
  // Figure out what page to load
  switch (props.pageContext.slug) {
    case "/": return <HomePage {...pageProps} />
    case "/language": return <LanguagePage {...pageProps} />
    case "/search": return <SearchPage {...pageProps} />
    case "/login": return <LoginPage {...pageProps} />
    case "/login/callback": return <OauthPage {...pageProps} />
    case "/logout": return <LogoutPage {...pageProps} />
    case "/signup": return <SignupPage {...pageProps} />
    case "/confirm": return <ConfirmPage {...pageProps} />
    case "/model": return <CreateModelPage {...pageProps} />
    case "/create":
    case "/recreate": return <DraftPage {...pageProps} mainMenu={props.mainMenu} userMenu={props.userMenu}/>
    case "/blog": return <BlogPage {...pageProps} />
    case "/showcase": return <ShowcasePage {...pageProps} />
    case "/showcase/patterns": return <ShowcaseCategoryPage {...pageProps} category={props.uri.split("/").pop()}/>
    case "/docs": return <DocumentationPage {...pageProps} />
    default:
      if (props.pageContext.slug.slice(0,8) === "/account") return <AccountPage {...pageProps} />
      else if (props.pageContext.slug.slice(0,8) === "/welcome") return <WelcomePage {...pageProps} />
      else if (props.pageContext.slug.slice(0,7) === "/models") return <ModelsPage {...pageProps} />
      else if (props.pageContext.slug.slice(0,8) === "/recipes") return <RecipesPage {...pageProps} />
      else if (props.pageContext.slug.slice(0,8) === "/patrons") return <PatronsPage {...pageProps} />
      else if (props.pageContext.slug.slice(0,6) === "/users") return <UsersPage {...pageProps} />
      else if (props.pageContext.slug.slice(0,11) === "/blog/years") return <BlogYearPage {...pageProps} year={props.uri.split("/").pop()}/>
      else if (props.pageContext.slug.slice(0,6) === "/blog/") return <BlogPostPage {...pageProps} />
      else if (props.pageContext.slug.slice(0,10) === "/showcase/") return <ShowcasePostPage {...pageProps} />
      else if (props.pageContext.slug.slice(0,6) === "/docs/") return <DocumentationPage {...pageProps} />
  }
}

export default MainPage;

