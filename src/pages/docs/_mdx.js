import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import useNavigation from '../../hooks/useNavigation'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import DocsLayout from '../../components/layouts/docs'
import crumbsFromNavigation from '../../components/app/crumbsFromNavigation'

import { graphql } from 'gatsby'
import { options } from '@freesewing/pattern-info'
import Mdx from '../../components/mdx'

const DocsPage = props => {
  // State
  const app = useApp()
  const { tree, titles } = useNavigation(app)

  // Data from page query
  const { body, frontmatter } = props.data.allMdx.edges[0].node

  // Handle pages without title
  const patternOptionTitle = (pattern, option) => {
    for (let o of options[pattern]) {
      if (o.toLowerCase() === option) return app.translate(`options.${pattern}.${o}.title`)
    }

    return option
  }

  let title = props.data.allMdx.edges[0].node.frontmatter.title || false
  if (!title) {
    const chunks = props.location.pathname.split('/')
    if (chunks[2] === 'patterns') {
      if (chunks.length === 5) title = app.translate(`patterns.${chunks[3]}.title`)
      else if (chunks.length === 6) {
        if (chunks[4] === 'cutting') title = app.translate('app.cutting')
        else if (chunks[4] === 'fabric') title = app.translate('app.fabricOptions')
        else if (chunks[4] === 'instructions') title = app.translate('app.instructions')
        else if (chunks[4] === 'needs') title = app.translate('app.whatYouNeed')
        else if (chunks[4] === 'options') title = app.translate('app.patternOptions')
      } else if (chunks.length === 7 && chunks[4] === 'options')
        title = patternOptionTitle(chunks[3], chunks[5])
    }
  }

  // Effects
  useEffect(() => {
    app.setTitle(title)
    app.setCrumbs(crumbsFromNavigation(props.location.pathname, tree, titles))
  }, [])

  return (
    <AppWrapper app={app}>
      <DocsLayout app={app} slug={props.location.pathname}>
        <Mdx node={props.data.allMdx.edges[0].node} />
      </DocsLayout>
    </AppWrapper>
  )
}

export default withLanguage(DocsPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxDocsPage($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
          frontmatter {
            title
          }
        }
      }
    }
  }
`
