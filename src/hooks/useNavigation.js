import { useStaticQuery, graphql } from 'gatsby'
import { list as patternList, options } from '@freesewing/pattern-info'
import { duplicates } from '../../gatsby-routes'

/* this hook builds the documentation structure and navigation based on MDX content and pattern-info */

function useNavigation(app) {
  // Gets the web URL slug from file path
  const slugFromFilePath = (filePath) => {
    return (
      '/' +
      filePath
        .match(/[\/|\\]markdown[\/|\\]org[\/|\\](.*)/)
        .pop()
        .slice(0, -5)
    )
  }

  // Gets the web URL slug fro part of a path
  const slugFor = function (a, b, c, d, e) {
    let chunks = []
    if (a) chunks.push(a)
    if (b) chunks.push(b)
    if (c) chunks.push(c)
    if (d) chunks.push(d)
    if (e) chunks.push(e)

    return '/' + chunks.join('/') + '/'
  }

  // Gets the page title for a given slug
  const pageTitle = (slug, page) => {
    if (typeof page === 'undefined') {
      throw 'No page found for ' + slug
    } else if (typeof page.frontmatter === 'undefined') {
      throw 'No frontmatter found for ' + slug + '\n' + JSON.stringify(page, null, 2)
    } else if (typeof page.frontmatter.title === 'undefined') {
      throw 'No title found for ' + slug + '\n' + JSON.stringify(page.frontmatter, null, 2)
    }
    if (page.frontmatter.title === '') {
      let chunks = slug.split('/')
      // Perhaps a pattern option or sub page
      if (chunks[1] === 'docs' && chunks[2] === 'patterns') {
        if (chunks.length === 7 && chunks[4] === 'options') {
          // This is a pattern option
          for (let option of options[chunks[3]]) {
            if (option.toLowerCase() === chunks[5])
              return app.translate(`options.${chunks[3]}.${option}.title`)
          }
        }
        if (chunks.length === 6) {
          // Perhaps a pattern subpage
          if (chunks[4] === 'options') return app.translate('app.patternOptions')
          if (chunks[4] === 'measurements') return app.translate('app.requiredMeasurements')
          if (chunks[4] === 'needs') return app.translate('app.whatYouNeed')
          if (chunks[4] === 'fabric') return app.translate('app.fabricOptions')
          if (chunks[4] === 'cutting') return app.translate('app.cutting')
          if (chunks[4] === 'instructions') return app.translate('app.instructions')
        }
      }
    }
    if (typeof page.frontmatter.linktitle !== 'undefined') return page.frontmatter.linktitle

    return page.frontmatter.title
  }

  const getTitlesAndPages = (mdx) => {
    let titles = {}
    let pages = {
      docs: {}
    }
    for (let section of ['docs']) {
      for (let edge of mdx[section].edges) {
        let slug = slugFromFilePath(edge.node.fileAbsolutePath)
        titles[slug] = pageTitle(slug, edge.node)
        pages[section][slug] = edge.node
        // Add duplicates
        if (duplicates[slug]) {
          for (let dupe of duplicates[slug]) {
            titles[dupe] = pageTitle(dupe, edge.node)
            pages[section][dupe] = edge.node
          }
        }
      }
    }
    // Add pattern titles manually
    for (let pattern of patternList) {
      titles[`/docs/patterns/${pattern}/`] = app.translate(`patterns.${pattern}.title`)
    }

    return { titles, pages }
  }

  const getTree = (pages) => {
    const tree = {
      '/docs/about/': {
        title: app.translate('app.docs'),
        children: {}
      }
    }

    // Add documentation from MDX pages
    // Better make sure they are in order
    for (let slug of Object.keys(pages.docs).sort()) {
      addToTree(slug, pages.docs[slug], tree)
    }

    return tree['/docs/'].children
  }

  const addToTree = function (slug, page, tree) {
    let [a, b, c, d, e] = slug.slice(1, -1).split('/')
    let target
    if (e) {
      target =
        tree[slugFor(a)].children[slugFor(a, b)].children[slugFor(a, b, c)].children[
          slugFor(a, b, c, d)
        ].children
    } else if (d)
      target = tree[slugFor(a)].children[slugFor(a, b)].children[slugFor(a, b, c)].children
    else if (c) target = tree[slugFor(a)].children[slugFor(a, b)].children
    else if (b) target = tree[slugFor(a)].children
    else if (a) target = tree
    target[slugFor(a, b, c, d, e)] = { title: pageTitle(slug, page), children: {} }

    return
  }

  const mdx = useStaticQuery(graphql`
    {
      docs: allMdx(
        filter: { fileAbsolutePath: { regex: "//markdown/org/docs/[^.]*/*.md/" } }
        sort: { fields: fileAbsolutePath, order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  const { titles, pages } = getTitlesAndPages(mdx)
  const tree = getTree(pages)

  const getTitle = (slug) => titles[slug]

  return {
    titles,
    tree,
    getTitle
  }
}

export default useNavigation
