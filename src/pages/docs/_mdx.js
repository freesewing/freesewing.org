import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import useNavigation from '../../hooks/useNavigation'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import DocsNavigation from '../../components/app/docs-navigation'
import crumbsFromNavigation from '../../components/app/crumbsFromNavigation'
import MdxToc from '../../components/mdx/toc'

import { graphql } from 'gatsby'
import { options } from '@freesewing/pattern-info'
import Mdx from '../../components/mdx'
import PrevNext from '../../components/prev-next'
import { FormattedMessage } from 'react-intl'

import { measurements } from '@freesewing/models'
import MeasurementImage from '../../components/measurements/images'

const DocsPage = (props) => {
  // State
  const app = useApp()
  const { tree, titles } = useNavigation(app)

  // Handle pages without title
  const patternOptionTitle = (pattern, option) => {
    for (let o of options[pattern]) {
      if (o.toLowerCase() === option) return app.translate(`options.${pattern}.${o}.title`)
    }

    return option
  }

  // We'll need this
  const chunks = props.path.split('/')

  let title = props.data.allMdx.edges[0].node.frontmatter.title || false
  if (!title) {
    if (chunks[2] === 'patterns') {
      if (chunks.length === 5) title = app.translate(`patterns.${chunks[3]}.title`)
      else if (chunks.length === 6) {
        if (chunks[4] === 'cutting') title = app.translate('app.cutting')
        else if (chunks[4] === 'fabric') title = app.translate('app.fabricOptions')
        else if (chunks[4] === 'instructions') title = app.translate('app.instructions')
        else if (chunks[4] === 'needs') title = app.translate('app.whatYouNeed')
        else if (chunks[4] === 'options') title = app.translate('app.patternOptions')
        else if (chunks[4] === 'measurements') title = app.translate('app.requiredMeasurements')
      } else if (chunks.length === 7 && chunks[4] === 'options')
        title = patternOptionTitle(chunks[3], chunks[5])
    }
  }

  // Effects
  useEffect(() => {
    app.setTitle(title)
    app.setDescription(props.data.allMdx.edges[0].node.excerpt)
    app.setCrumbs(crumbsFromNavigation(props.path, tree, titles))
  }, [])

  // Add measurement image if needed
  let measurementImage = null
  if (chunks.length === 5 && chunks[2] === 'measurements') {
    let measurement = false
    for (let m of measurements.womenswear) {
      if (m.toLowerCase() === chunks[3]) measurement = m
    }
    measurementImage = <MeasurementImage intl={app.intl} measurement={measurement} />
  }

  const context = []
  if (props.data.allMdx.edges[0].node.tableOfContents.items) {
    context.push(<h6>{props.data.allMdx.edges[0].node.frontmatter.title}</h6>)
    context.push(<MdxToc toc={props.data.allMdx.edges[0].node.tableOfContents} app={app} />)
  }
  context.push(
    <h6>
      <FormattedMessage id="app.docs" />
    </h6>
  )
  context.push(<DocsNavigation slug={props.path} app={app} />)

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="docs" context={context} text>
        {measurementImage}
        <Mdx node={props.data.allMdx.edges[0].node} />
        <PrevNext slug={props.path} tree={tree} titles={titles} />
      </Layout>
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
          excerpt
          tableOfContents(maxDepth: 3)
          frontmatter {
            title
          }
        }
      }
    }
  }
`
