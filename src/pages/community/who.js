import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import useUiMdx from '../../hooks/useUiMdx'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import Mdx from '../../components/mdx'
import contributors from '../../../contributors.yaml'
import { FormattedMessage } from 'react-intl'
import Patron from '../../components/cmty/patron'
import Contributor from '../../components/cmty/contributor'
import { graphql, Link } from 'gatsby'
import '../../components/cmty/style.scss'

const CommunityWhoPage = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()
  console.log(props.data)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('cty.whoWeAre'))
    app.setContext(context)
    app.setCrumbs([
      {
        slug: '/community',
        title: <span className="scribble">{app.translate('app.community')}</span>
      }
    ])
  }, [])

  const context = [
    <h5>
      <FormattedMessage id="app.community" />
    </h5>,
    <h6>
      <Link to="/community/who/">
        <FormattedMessage id="cty.whoWeAre" />
      </Link>
    </h6>,
    <ul>
      <li>
        <a href="#contributors">
          <FormattedMessage id="cty.contributors" />
        </a>
      </li>
      <li>
        <a href="#patrons">
          <FormattedMessage id="app.patrons" />
        </a>
      </li>
    </ul>,
    <h6>
      <Link to="/community/where/">
        <FormattedMessage id="cty.whereToFindUs" />
      </Link>
    </h6>,
    <h6>
      <Link to="/community/teams/">{uiMdx['community/teams'].title}</Link>
    </h6>
  ]

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="community" text noTitle>
        <h1 className="scribble">
          <FormattedMessage id="cty.whoWeAre" />
        </h1>
        <ul className="links">
          <li>
            <a href="#contributors">
              <FormattedMessage id="cty.contributors" />
            </a>
          </li>
          <li>
            <a href="#patrons">
              <FormattedMessage id="app.patrons" />
            </a>
          </li>
        </ul>
        <h2 id="contributors">
          <FormattedMessage id="cty.contributors" />
        </h2>
        {contributors.people.map((person) => (
          <div id={person.name.toLowerCase()}>
            <Contributor contributor={person} app={app} key={person.name} />
          </div>
        ))}
        <Mdx node={uiMdx[`community/who`]} />
        <h2 id="patrons">
          <FormattedMessage id="app.patrons" />
        </h2>
        <Blockquote type="note">
          <h4>
            <FormattedMessage id="app.supportFreesewing" />
          </h4>
          <p>
            <FormattedMessage id="account.patronInfo" />
          </p>
          <p>
            <Button variant="contained" color="primary" size="large" href="/patrons/join/">
              <FormattedMessage id="app.becomeAPatron" />
            </Button>
          </p>
        </Blockquote>
        {props.data.allFsPatron.edges.map((node) => (
          <Patron patron={node.node.patron} id={node.node.patron.handle} />
        ))}
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(CommunityWhoPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allFsPatron {
      edges {
        node {
          patron {
            username
            pictureUris {
              m
            }
            social {
              twitter
              instagram
              github
            }
            handle
            tier
          }
        }
      }
    }
  }
`
