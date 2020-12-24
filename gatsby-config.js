require('dotenv').config()
const searchData = require('./src/algolia')
const feeds = require('./src/feeds')
const languages = require('@freesewing/i18n').languages
const ignore = []
for (let lang in languages) {
  if (lang !== process.env.GATSBY_LANGUAGE) ignore.push(`**/${lang}.md`)
}
const jargon = require('@freesewing/i18n').jargon[process.env.GATSBY_LANGUAGE]
const language = process.env.GATSBY_LANGUAGE
const domain = language === 'en' ? 'freesewing.org' : language + '.freesewing.org'

const plugins = [
  `gatsby-plugin-sass`,
  // Automatically restores your cache and caches new files within the Netlify cache folder.
  //   To reset the cache, hit the Clear build cache checkbox in the Netlify app.
  'gatsby-plugin-netlify-cache',
  {
    resolve: 'gatsby-plugin-nprogress',
    options: {
      color: '#9775fa'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/markdown/org`,
      name: 'markdown',
      ignore: ignore
    }
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.mdx', '.md'],
      // Plugins workaround. See: https://github.com/gatsbyjs/gatsby/issues/15486
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 800,
            showCaptions: ['title', 'alt'],
            markdownCaptions: true
          }
        }
      ],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 756
          }
        },
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            inlineCodeMarker: null,
            aliases: {}
          }
        },
        'gatsby-remark-copy-linked-files',
        'gatsby-remark-autolink-headers',
        'gatsby-remark-smartypants',
        {
          resolve: 'gatsby-remark-jargon',
          options: { jargon }
        }
      ]
    }
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-helmet',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `FreeSewing`,
      short_name: `FreeSewing`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#212529`,
      display: `standalone`,
      icon: `src/images/logo.svg`
    }
  },
  'gatsby-plugin-netlify',
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      feeds: feeds
    }
  }
]

// Only update the Algolia indices when having the ALGOLIA_UPDATE_KEY set.
//   Most likely on deployment to production only
if (false && process.env.CONTEXT === 'production' && process.env.HEAD === 'master') {
  plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_API_ID,
      apiKey: process.env.GATSBY_ALGOLIA_UPDATE_KEY,
      queries: searchData(process.env.GATSBY_LANGUAGE),
      chunkSize: 10000
    }
  })
}

module.exports = {
  flags: {
    DEV_SSR: true,
    //QUERY_ON_DEMAND: true,
    FAST_DEV: true,
    LAZY_IMAGES: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_REFRESH: true
  },
  plugins: plugins,
  siteMetadata: {
    title: 'FreeSewing',
    titleTemplate: 'FreeSewing',
    description: 'Made-to-measure sewing patterns. Free. Collaborative. Open source.',
    url: `https://${domain}`,
    siteUrl: `https://${domain}`,
    image: `https://${domain}/share/${language}.wide.jpg`,
    twitterUsername: '@freesewing_org'
  }
}
