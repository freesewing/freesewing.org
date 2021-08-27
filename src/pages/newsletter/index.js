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
          {props.data.allNewsletterPost.nodes.map((node) => {
            return (
              <li key={node.post.slug}>
                <Link to={`/newsletter/${node.post.slug}/`}>{node.post.title}</Link>
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
    allNewsletterPost(sort: { order: ASC, fields: post___slug }) {
      nodes {
        post {
          title
          slug
          body
        }
      }
    }
  }
`
