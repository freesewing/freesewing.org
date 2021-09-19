import { useStaticQuery, graphql } from 'gatsby'
import set from 'lodash.set'

const alwaysDrop = [
  'create',
  'recreate',
  'people',
  'login',
  'patterns',
  'people',
  'users',
  'confirm',
  'person',
  'admin',
  'welcome',
  '404.html',
]

const titles = {
  '/account/': 'app.account',
  '/account/actions/': 'app.actions',
  '/account/actions/consent/': 'account.reviewYourConsent',
  '/account/actions/export/': 'account.exportYourData',
  '/account/actions/reload/': 'account.reloadAccount',
  '/account/actions/remove/': 'account.removeYourAccount',
  '/account/actions/restrict/': 'account.restrictProcessingOfYourData',
  '/account/patterns/': 'app.patterns',
  '/account/people/': 'app.people',
  '/account/profile/': 'app.profile',
  '/account/settings/': 'app.settings',
  '/account/settings/avatar/': 'account.avatar',
  '/account/settings/bio/': 'account.bio',
  '/account/settings/email/': 'account.email',
  '/account/settings/github/': 'account.github',
  '/account/settings/instagram/': 'account.instagram',
  '/account/settings/language/': 'account.language',
  '/account/settings/newsletter/': 'account.newsletter',
  '/account/settings/password/': 'account.password',
  '/account/settings/twitter/': 'account.twitter',
  '/account/settings/units/': 'account.units',
  '/account/settings/username/': 'account.username',
  '/blog/': 'app.blog',
  '/community/': 'cty.community',
  '/community/calls/': 'cty.calls',
  '/community/join/': 'app.becomeAPatron',
  '/community/share/': 'app.shareFreesewing',
  '/community/teams/': 'cty.teams',
  '/community/teams/community/': ['cty.community', 'cty.team'],
  '/community/teams/pattern-design/': ['cty.patternDesign', 'cty.team'],
  '/community/where/': 'cty.whereToFindUs',
  '/community/who/': 'cty.whoWeAre',
  '/community/who/contributors/': 'cty.contributors',
  '/community/who/patrons/': 'app.patrons',
  '/designs/': 'app.designs',
  '/docs/': 'app.docs',
  '/showcase/': 'app.showcase',
}
// No translate for these
const brands = {
  '/community/hashtags/': 'Hashtags',
  '/community/newsletter/': 'Newsletter',
  '/community/where/discord/': 'Discord',
  '/community/where/facebook/': 'Facebook',
  '/community/where/github/': 'Github',
  '/community/where/instagram/': 'Instagram',
  '/community/where/reddit/': 'Reddit',
  '/community/where/twitter/': 'Twitter',
  '/community/where/youtube/': 'YouTube',
}

const getTranslatedTitle = (slug, translate) => {
  if (brands[slug]) return brands[slug]
  if (titles[slug]) {
    if (Array.isArray(titles[slug])) return titles[slug].map((s) => translate(s)).join(' ')
    else return translate(titles[slug])
  }

  return false
}

// This does a lot of work
const getTitle = (slug, page, chunks, translate) => {
  if (alwaysDrop.indexOf(chunks[0]) !== -1) return false
  if (chunks[0] === 'showcase' && chunks[1] === 'designs') return false
  if (!page.title) {
    if (chunks[0] === 'designs' && chunks.length === 2)
      return translate(`patterns.${chunks[1]}.title`)
    return getTranslatedTitle(slug, translate)
  }

  return page.title
}

const slugChunks = (slug) => {
  const chunks = []
  for (const chunk of slug.split('/')) {
    if (chunk.length > 0) chunks.push(chunk)
  }

  return chunks
}

const decorateTree = (tree, slug, page, translate) => {
  let chunks = slugChunks(slug)
  if (chunks.length === 0) return tree
  let title = getTitle(slug, page, chunks, translate)
  if (title) set(tree, chunks.join('.offspring.'), { title, slug, ordertitle: page.order + title })

  return tree
}

const buildTree = (pages, translate, account = {}) => {
  let tree = {}
  for (let slug of Object.keys(pages).sort()) {
    tree = decorateTree(tree, slug, pages[slug], translate)
  }

  return tree
}

function useTree(translate) {
  // Static query
  const data = useStaticQuery(graphql`
    {
      pages: allSitePage(
        filter: {
          path: {
            nin: [
              "/dev-404-page/"
              "/404/"
              "/404.html"
              "/"
              "/language/"
              "/logout/"
              "/search/"
              "/sizes/"
              "/signup/"
              "/thanks/"
              "/patrons/"
              "/patrons/join/"
              "/patrons/thanks/"
            ]
          }
        }
      ) {
        edges {
          node {
            path
            context {
              title
              order
            }
          }
        }
      }
      blogposts: allBlogPost {
        nodes {
          order
          post {
            title
            date
            slug
          }
        }
      }
      showcaseposts: allShowcasePost {
        nodes {
          order
          post {
            title
            date
            slug
          }
        }
      }
      newsletterposts: allNewsletterPost {
        nodes {
          order
          post {
            title
            slug
          }
        }
      }
      authorsposts: allAuthorsPost {
        nodes {
          post {
            displayname
            slug
          }
        }
      }
      makersposts: allMakersPost {
        nodes {
          post {
            displayname
            slug
          }
        }
      }
    }
  `)
  const pages = {}
  for (let edge of data.pages.edges) pages[edge.node.path] = edge.node.context
  // We'll sort posts by date, rather than title
  for (let node of data.blogposts.nodes)
    pages[`/blog/${node.post.slug}/`] = {
      order: node.order.toString().padStart(3, '0'),
      title: node.post.title,
    }
  for (let node of data.showcaseposts.nodes)
    pages[`/showcase/${node.post.slug}/`] = {
      order: node.order.toString().padStart(3, '0'),
      title: node.post.title,
    }
  for (let node of data.newsletterposts.nodes)
    pages[`/newsletter/${node.post.slug}/`] = {
      order: node.order.toString().padStart(3, '0'),
      title: node.post.title,
    }
  for (let node of data.authorsposts.nodes)
    pages[`/authors/${node.post.slug}/`] = {
      order: node.post.displayname,
      title: node.post.displayname,
    }
  for (let node of data.makersposts.nodes)
    pages[`/makers/${node.post.slug}/`] = {
      order: node.post.displayname,
      title: node.post.displayname,
    }
  const pageTree = buildTree(pages, translate)

  return { offspring: pageTree }
}

export default useTree
