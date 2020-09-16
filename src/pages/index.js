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
import MainBlob from '../components/blobs/Main'
import SecondBlob from '../components/blobs/Second'
import ThirdBlob from '../components/blobs/Third'
import EmptyBlob from '../components/blobs/Empty'
import Hashtag from '../components/hashtag'

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

const HomePage = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

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
  const shades = [3, 4, 5, 6, 7, 8, 9]
  const pickOne = (array) => array[Math.floor(Math.random() * array.length)]
  const randomColor = () => oc[pickOne(colors) + pickOne(shades)]
  const randomColorWithContrast = () => {
    let shade = pickOne(shades)
    return {
      shade,
      contrast: shade < 5 ? '#212529' : '#f8f9fa',
      color: oc[pickOne(colors) + shade]
    }
  }

  // State
  const [count, setCount] = useState(0)

  const color3 = randomColorWithContrast()
  return (
    <AppWrapper app={app}>
      <div id="homepage">
        <div className="blobs">
          <EmptyBlob app={app} />
          <div className="blob-wrapper" onClick={() => setCount(count + 1)}>
            <SecondBlob {...randomColorWithContrast()} app={app} />
            <MainBlob {...randomColorWithContrast()} app={app} />
            <ThirdBlob {...color3} app={app} />
          </div>
        </div>

        {/* Icons */}
        <div className="icons" style={{ background: color3.color, color: color3.contrast }}>
          <Link to="/designs/" title={app.translate('app.designs')}>
            <Icon icon="withBreasts" />
            <br />
            <span>
              <FormattedMessage id="app.designs" />
            </span>
          </Link>
          <Link to="/community/" title={app.translate('app.community')}>
            <CommunityIcon />
            <br />
            <span>
              <FormattedMessage id="app.community" />
            </span>
          </Link>
          <Link to="/showcase/" title={app.translate('app.showcase')}>
            <ShowcaseIcon />
            <br />
            <span>
              <FormattedMessage id="app.showcase" />
            </span>
          </Link>
          <Link to="/blog/" title={app.translate('app.blog')}>
            <BlogIcon />
            <br />
            <span>
              <FormattedMessage id="app.blog" />
            </span>
          </Link>
          <Link to="/docs/" title={app.translate('app.docs')}>
            <DocsIcon />
            <br />
            <span>
              <FormattedMessage id="app.docs" />
            </span>
          </Link>
          <Link to="/account/" title={app.translate('app.account')}>
            <AccountIcon />
            <br />
            <span>
              <FormattedMessage id="app.account" />
            </span>
          </Link>
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
              style={{ margin: '1rem 1rem 0 0', background: color3.color, color: color3.contrast }}
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
          <div className="single">{renderBlogPost(props.data.allMdx.edges[0])}</div>
          <div className="many">
            {renderBlogPost(props.data.allMdx.edges[1])}
            {renderBlogPost(props.data.allMdx.edges[2])}
            {renderBlogPost(props.data.allMdx.edges[3])}
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
    allMdx(
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
  }
`
