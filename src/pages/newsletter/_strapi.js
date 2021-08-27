import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import { graphql } from 'gatsby'
import Markdown from 'react-markdown'

const Page = (props) => {
  const app = useApp(false)

  const style = {
    body: {
      maxWidth: '60ch',
      fontSize: '115%',
      margin: 'auto',
    },
  }

  return (
    <AppWrapper
      app={app}
      title={`FreeSewing newsletter: ${props.data.newsletterPost.post.title}`}
      {...app.treeProps(props.path)}
    >
      <div style={style.body}>
        <Markdown>{props.data.newsletterPost.post.body}</Markdown>
      </div>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query newsletterPost($slugId: String) {
    newsletterPost(post: { slug: { eq: $slugId } }) {
      post {
        title
        body
      }
    }
  }
`
