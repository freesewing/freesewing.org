import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { graphql, Link } from 'gatsby'

const Page = (props) => {
  const app = useApp(false)

  // FIXME: Authors is untranslated here
  return (
    <AppWrapper app={app} title="Authors" {...app.treeProps(props.path)} wide>
      <ul className="links">
        {props.data.allAuthorsPost.nodes.map(({ post }) => (
          <li>
            <Link key={post.slug} to={`/authors/${post.slug}/`}>
              {post.displayname}
            </Link>
          </li>
        ))}
      </ul>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allAuthorsPost(sort: { order: ASC, fields: post___slug }) {
      nodes {
        post {
          displayname
          slug
        }
      }
    }
  }
`
