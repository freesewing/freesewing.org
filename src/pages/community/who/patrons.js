import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import useUiMdx from '../../../hooks/useUiMdx'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import Mdx from '../../../components/mdx'
import contributors from '../../../../contributors.yaml'
import { FormattedMessage } from 'react-intl'
import Patron from '../../../components/cmty/patron'
import Contributor from '../../../components/cmty/contributor'
import { graphql, Link } from 'gatsby'
import '../../../components/cmty/style.scss'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app} title={app.translate('app.patrons')} {...app.treeProps(props.path)}>
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
        <Patron
          key={node.node.patron.handle}
          patron={node.node.patron}
          id={node.node.patron.handle}
        />
      ))}
    </AppWrapper>
  )
}

export default Page

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
