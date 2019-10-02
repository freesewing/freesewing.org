const utils = require("./utils")
const patternList = require("@freesewing/pattern-info").list

const tree = {
  '/patterns/': {
    title: utils.translate('app.patterns'),
    children: {}
  },
  '/blog/': {
    title: utils.translate('app.blog'),
    children: {
      '/blog/years/': {
        title: utils.translate('app.years'),
        children: {
          '/blog/years/2019/': { title: '2019' },
          '/blog/years/2018/': { title: '2018' },
          '/blog/years/2017/': { title: '2017' },
        }
      }
    }
  },
  '/showcase/': {
    title: utils.translate('app.showcase'),
    children: {
      '/showcase/patterns/': {
        title: utils.translate('app.patterns'),
        children: {
        }
      }
    },
  },
  '/docs/': {
    title: utils.translate('app.docs'),
    children: {}
  },
}

const buildNavigation = (mdxPages, titles) => {
  // Add pattern links
  for (let pattern of patternList) {
    tree['/patterns/'].children['/patterns/'+pattern+'/'] = { title: utils.translate(`patterns.${pattern}.title`) }
  }
  // Add per-pattern showcase links
  let patterns = {}
  for (let slug in mdxPages) {
    if (slug.slice(0,10) === "/showcase/") {
      for (let pattern of mdxPages[slug].frontmatter.patterns) patterns[pattern] = true
    }
  }
  for (let pattern in patterns) {
    tree['/showcase/']
      .children['/showcase/patterns/']
      .children['/showcase/patterns/'+pattern+'/'] = { title: utils.capitalize(pattern) }
  }
  // Add documentation from MDX pages
  for (let slug of Object.keys(mdxPages).sort()) {
    if (slug.slice(0,6) === "/docs/") addToTree(slug, mdxPages[slug], tree)
  }

  return tree
}


const addToTree = function(slug, page, tree) {
  let [a,b,c,d,e] = slug.slice(1,-1).split('/')
  let target
  if (e) target = tree[slugFor(a)].children[slugFor(a,b)].children[slugFor(a,b,c)].children[slugFor(a,b,c,d)].children
  else if (d) target = tree[slugFor(a)].children[slugFor(a,b)].children[slugFor(a,b,c)].children
  else if (c) target = tree[slugFor(a)].children[slugFor(a,b)].children
  else if (b) target = tree[slugFor(a)].children
  else if (a) target = tree
  target[slugFor(a,b,c,d,e)] = { title: utils.pageTitle(slug, page), children: {} };

  return
}

const slugFor = function(a,b,c,d,e) {
  let chunks = []
  if (a) chunks.push(a)
  if (b) chunks.push(b)
  if (c) chunks.push(c)
  if (d) chunks.push(d)
  if (e) chunks.push(e)

  return '/'+chunks.join('/')+'/'
}

module.exports = buildNavigation

