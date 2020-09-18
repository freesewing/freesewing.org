import React, { useState } from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import WideLayout from '../components/layouts/wide'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import DocsIcon from '@material-ui/icons/ChromeReaderMode'
import ShowcaseIcon from '@material-ui/icons/CameraAlt'
import BlogIcon from '@material-ui/icons/RssFeed'
import CommunityIcon from '@material-ui/icons/Favorite'
import AccountIcon from '@material-ui/icons/Face'
import Icon from '@freesewing/components/Icon'

import Subscribe from '../components/subscribe'
import Mdx from '../components/mdx'
import { graphql, Link } from 'gatsby'
import oc from 'open-color-js'
//import MainBlob from '../components/blobs/Main'
//import SecondBlob from '../components/blobs/Second'
//import ThirdBlob from '../components/blobs/Third'
import EmptyBlob from '../components/blobs/Empty'
import Blob from '../components/blobs'
import Hashtag from '../components/hashtag'
import contrast from 'get-contrast'

// Style
import './homepage.scss'

const renderBlogPost = (node) => (
  <div className="post">
    <Link
      to={`/${node.node.parent.relativeDirectory}/`}
      title={node.node.frontmatter.linktitle}
      className="image"
    >
      <figure>
        <img
          src={node.node.frontmatter.img.childImageSharp.fluid.src}
          srcSet={node.node.frontmatter.img.childImageSharp.fluid.srcSet || ''}
          alt={node.node.frontmatter.title}
          className="shadow"
        />
      </figure>
    </Link>
    <Link
      to={`/${node.node.parent.relativeDirectory}/`}
      title={node.node.frontmatter.linktitle}
      className="text"
    >
      <h3>{node.node.frontmatter.title}</h3>
      <p>{node.node.excerpt}</p>
    </Link>
  </div>
)

const colors = [
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange'
]
const shades = [5, 6, 7, 8, 9]
const pickOne = (array) => array[Math.floor(Math.random() * array.length)]
const getContrast = (color) => {
  let black = '#212529'
  let white = '#f8f9fa'
  let ratio = {
    black: contrast.ratio(color, black),
    white: contrast.ratio(color, white)
  }

  return ratio.black > ratio.white ? black : white
}
const randomColor = (theme = 'light') => {
  let color = oc[pickOne(colors) + pickOne(shades)]
  return {
    color,
    contrast: getContrast(color)
  }
}

const HomePage = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  // State
  const [color, setColor] = useState(randomColor(app.theme))

  const patrons = props.data.patrons.edges.map((node) => ({
    name: node.node.patron.username,
    img: node.node.patron.pictureUris.m
  }))

  return (
    <AppWrapper app={app}>
      <div id="homepage">
        <div className="blob-wrapper" onClick={() => setColor(randomColor(app.theme))}>
          <Blob color={color} patrons={patrons} app={app} />
        </div>

        {/* Icons */}
        <div className="icons" style={{ background: color.color, color: color.contrast }}>
          <div className="icon">
            <Link to="/designs/" title={app.translate('app.designs')}>
              <Icon icon="withBreasts" />
              <br />
              <span>
                <FormattedMessage id="app.designs" />
              </span>
            </Link>
          </div>
          <div className="icon">
            <Link to="/community/" title={app.translate('app.community')}>
              <CommunityIcon />
              <br />
              <span>
                <FormattedMessage id="app.community" />
              </span>
            </Link>
          </div>
          <div className="icon">
            <Link to="/showcase/" title={app.translate('app.showcase')}>
              <ShowcaseIcon />
              <br />
              <span>
                <FormattedMessage id="app.showcase" />
              </span>
            </Link>
          </div>
          <div className="icon">
            <Link to="/blog/" title={app.translate('app.blog')}>
              <BlogIcon />
              <br />
              <span>
                <FormattedMessage id="app.blog" />
              </span>
            </Link>
          </div>
          <div className="icon">
            <Link to="/docs/" title={app.translate('app.docs')}>
              <DocsIcon />
              <br />
              <span>
                <FormattedMessage id="app.docs" />
              </span>
            </Link>
          </div>
          <div className="icon">
            <Link to="/account/" title={app.translate('app.account')}>
              <AccountIcon />
              <br />
              <span>
                <FormattedMessage id="app.account" />
              </span>
            </Link>
          </div>
        </div>

        {/* Support banner */}
        <div className="stripe">
          <div>
            <h1>
              <FormattedMessage id="app.supportFreesewing" />
            </h1>
            <h2>
              <FormattedMessage id="app.txt-tiers" />
            </h2>
            <p>
              <FormattedMessage id="app.patronPitch" />
            </p>
            <Button
              color="primary"
              className="accent"
              size="large"
              variant="contained"
              href="/patrons/join/"
              style={{
                margin: '1rem 1rem 0 0',
                background: color.color,
                color: color.contrast
              }}
            >
              <FormattedMessage id="app.becomeAPatron" />
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              href="/docs/about/pledge/"
              style={{ marginTop: '1rem' }}
            >
              <FormattedMessage id="app.ourRevenuePledge" />
            </Button>
          </div>
        </div>

        {/* First row of text boxes */}
        <WideLayout app={app} noTitle>
          <div className="boxes">
            <div>
              <Mdx node={uiMdx[`homepage/updates`]} />
            </div>
            <div>
              <Mdx node={uiMdx[`homepage/row-1`]} />
            </div>
            <div>
              <Mdx node={uiMdx[`homepage/row-2`]} />
            </div>
          </div>
        </WideLayout>

        {/* Latest blog posts */}
        <div id="blog">
          <div className="single">{renderBlogPost(props.data.blog.edges[0])}</div>
          <div className="many">
            {renderBlogPost(props.data.blog.edges[1])}
            {renderBlogPost(props.data.blog.edges[2])}
            {renderBlogPost(props.data.blog.edges[3])}
            <h3 style={{ textAlign: 'right', padding: '0 1rem' }}>
              <Link to="/blog/" className="more">
                <FormattedMessage id="app.browseBlogposts" /> &raquo;
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </AppWrapper>
  )
}

export default withLanguage(HomePage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    blog: allMdx(
      limit: 4
      filter: { fileAbsolutePath: { regex: "//blog/[^/]*/[a-z]{2}.md/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date
            linktitle
            author
            img {
              childImageSharp {
                fluid(maxWidth: 400) {
                  src
                  srcSet
                  sizes
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
      }
    }
    patrons: allFsPatron {
      edges {
        node {
          patron {
            username
            pictureUris {
              m
            }
          }
        }
      }
    }
  }
`
