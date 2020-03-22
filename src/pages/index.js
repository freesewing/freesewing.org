import React from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import WideLayout from '../components/layouts/wide'
import CenteredLayout from '../components/layouts/centered'

import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'

import Subscribe from '../components/subscribe'
import Mdx from '../components/mdx'
import { graphql, Link } from 'gatsby'

// Style
import './homepage.css'

const renderBlogPost = node => (
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

const HomePage = props => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app}>
      <div id="homepage">
        {/* Top banner */}
        <header>
          <div className="banner">
            <div className="text-block">
              <h1>FreeSewing</h1>
              <h2>
                <FormattedMessage id="app.sewingPatternsForNonAveragePeople" />
                <sup>*</sup>
                <br />
                <small>
                  <small data-test="subslogan">
                    * <FormattedMessage id="app.averagePeopleDoNotExist" />
                  </small>
                </small>
              </h2>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                className="btn-primary"
                href={
                  app.account.patron
                    ? '/share/'
                    : app.account.username
                    ? '/patrons/join/'
                    : '/create/'
                }
              >
                {app.account.patron ? (
                  <FormattedMessage id="app.share" />
                ) : app.account.username ? (
                  <FormattedMessage id="app.subscribe" />
                ) : (
                  <FormattedMessage id="app.browsePatterns" />
                )}
              </Button>
            </div>
          </div>
        </header>

        <WideLayout app={app} noTitle>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <Blockquote type='note'>
            <h4>COVID-19: Facemask pattern</h4>
            <p>
              If you're here looking for a facemask pattern, this is the link you're looking for:<br />
            </p>
            <ul>
              <li>
                <a href="/blog/facemask-frenzy/">
                  <b>face mask pattern and instructions</b>
                </a>.
              </li>
            </ul>
            <p>PS: You can support us by <a href="/patrons/join/">becoming a patron</a>  ❤️</p>
          </Blockquote>
          </div>
        </WideLayout>
        {/* First row of text boxes */}
        <WideLayout app={app} noTitle>
          <div className="boxes">
            {[1, 2, 3].map(id => (
              <div key={'row1-' + id}>
                <Mdx node={uiMdx[`homepage/row-1/${id}`]} />
              </div>
            ))}
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
            <Button className="btn-primary" variant="contained" href="#tiers">
              <FormattedMessage id="app.pricing" />
            </Button>
          </div>
        </div>

        <WideLayout app={app} noTitle>
          {/* Pricing */}
          <h3 className="pricing">
            <FormattedMessage id="app.pricing" />
          </h3>
          <Subscribe showFree={false} app={app} />
          {/* Second row of text boxes */}
          <div className="boxes">
            {[1, 2, 3].map(id => (
              <div key={'row2-' + id}>
                <Mdx node={uiMdx[`homepage/row-2/${id}`]} />
              </div>
            ))}
          </div>
        </WideLayout>
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
