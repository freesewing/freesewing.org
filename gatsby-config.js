const searchData = require('./src/algolia')
require('dotenv').config()

const plugins = [
  {
    resolve: 'gatsby-plugin-nprogress',
    options: {
      color: '#74c0fc'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/markdown/org`,
      name: 'markdown'
    }
  },
  {
    resolve: 'gatsby-mdx',
    options: {
      extensions: ['.mdx', '.md'],
      // Plugins workaround. See: https://github.com/gatsbyjs/gatsby/issues/15486
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 756
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
        'gatsby-remark-autolink-headers'
      ]
    }
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-netlify'
]

// Only update the Algolia indices when having the ALGOLIA_UPDATE_KEY set.
//   Most likely on deployment to production only
if (process.env.CONTEXT === 'production') {
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

module.exports = { plugins: plugins }
