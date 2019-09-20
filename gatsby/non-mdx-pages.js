const patterns = require("@freesewing/pattern-info").list;
const translate = require("./utils").translate

const pageConfig =  {
  single: {
    // These are slug => title
    "/": "app.home",
    "/language": "account.language",
    "/login": "app.logIn",
    "/logout": "app.logOut",
    "/search": "app.search",
    "/error": "error",
    "/signup": "app.signUp",
    "/model": "app.newModel",
    "/docs/": "app.docs",
    "/showcase/": "app.showcase",
    "/blog/": "app.blog",
    "/blog/years/": "app.years",
    "/blog/years/2019": "2019",
    "/blog/years/2018": "2018",
    "/blog/years/2017": "2017",
  },
  multiple: {
    // These are slug => matchPath regex
    "/404": "^\/?404\/?$",
    "/login/callback": "/login/callback/*",
    "/showcase/patterns": "/showcase/patterns/*",
    "/admin": "/admin/*",
    "/account": "/account/*",
    "/confirm": "/confirm/*",
    "/welcome": "/welcome/*",
    "/models": "/models/*",
    "/recipes": "/recipes/*",
    "/patrons": "/patrons/*",
    "/users": "/users/*",
    "/create": "/create/*",
    "/recreate": "/recreate/*",
    "/patterns": "/patterns/*"
  }
}


const getNonMdxPages = function() {
  const pages = {}
  for (let slug in pageConfig.single) {
    pages[slug] = {
      frontmatter: {
        title: translate(pageConfig.single[slug])
      }
    }
  }
  for (let slug in pageConfig.multiple) {
    pages[slug] = {
      frontmatter: {
        title: '' // Not relevant here
      },
      matchPath: pageConfig.multiple[slug]
    }
  }

  return pages
}

module.exports = getNonMdxPages()
