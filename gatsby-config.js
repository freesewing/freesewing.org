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
  `gatsby-plugin-image`,
  'gatsby-plugin-mdx-source-name',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/monorepo/markdown/org`,
      name: 'markdown',
      ignore: ignore,
    },
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md'],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 756,
            showCaptions: ['title', 'alt'],
            backgroundColor: `transparent`,
          },
        },
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            inlineCodeMarker: null,
            aliases: {},
          },
        },
        'gatsby-remark-copy-linked-files',
        'gatsby-remark-autolink-headers',
        {
          resolve: 'gatsby-remark-jargon',
          options: { jargon },
        },
      ],
    },
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
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
      icon: `src/images/logo.svg`,
    },
  },
  'gatsby-plugin-netlify',
  //{
  //  resolve: `gatsby-plugin-feed`,
  //  options: {
  //    feeds: feeds,
  //  },
  //},
]

// Only update the Algolia indices when having the ALGOLIA_UPDATE_KEY set.
//   Most likely on deployment to production only
if (process.env.CONTEXT === 'production' && process.env.HEAD === 'main') {
  plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_API_ID,
      apiKey: process.env.GATSBY_ALGOLIA_UPDATE_KEY,
      queries: searchData(process.env.GATSBY_LANGUAGE),
      chunkSize: 10000,
    },
  })
}

module.exports = {
  flags: {
    FAST_DEV: false,
    DEV_SSR: false,
    PRESERVE_WEBPACK_CACHE: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
  },
  plugins: plugins,
  siteMetadata: {
    title: 'FreeSewing',
    titleTemplate: 'FreeSewing',
    description: 'Made-to-measure sewing patterns. Free. Collaborative. Open source.',
    url: `https://${domain}`,
    siteUrl: `https://${domain}`,
    image: `https://${domain}/share/${language}.wide.jpg`,
    twitterUsername: '@freesewing_org',
  },
}
