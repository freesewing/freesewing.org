import React from 'react'
import useApp from '../../hooks/useApp'
import useUiMdx from '../../hooks/useUiMdx'
import AppWrapper from '../../components/app/wrapper'
import { graphql, Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import Newsletter from '../../components/newsletter'

const Page = (props) => {
  const app = useApp(false)
  const uiMdx = useUiMdx()

  const seasons = {
    q1: 'Winter',
    q2: 'Spring',
    q3: 'Summer',
    q4: 'Autumn',
  }

  return (
    <AppWrapper app={app} title="The FreeSewing newsletter">
      <Blockquote type="tip">
        {app?.account?.username ? (
          <>
            <h5>Subscribe to our newsletter</h5>
            <p>
              You can <Link to="/account/settings/newsletter/">subscribe to our newsletter</Link> in
              your <Link to="/account/settings/">account settings</Link>
            </p>
          </>
        ) : (
          <Newsletter app={app} uiMdx={uiMdx} />
        )}
      </Blockquote>
      <Blockquote type="note">
        <h5>Browse the newsletter archive</h5>
        <ul className="links">
          {props.data.allMdx.edges.map((node) => {
            let edition = node.node.parent.relativeDirectory
            let name = `${seasons[edition.slice(4, 6)]} ${edition.slice(0, 4)}`
            return (
              <li key={edition}>
                <Link to={`/newsletter/${edition}/`}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </Blockquote>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allMdx(
      filter: { fields: { source: { eq: "newsletter" } } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
`
