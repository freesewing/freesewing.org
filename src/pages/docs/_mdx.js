import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { graphql, Link } from 'gatsby'
import Mdx from '../../components/mdx'
import { measurements } from '@freesewing/models'
import MeasurementImage from '../../components/measurements/images'

const Page = (props) => {
  const app = useApp(false)

  // Add measurement image if needed
  const chunks = props.path.split('/')
  let measurementImage = null
  if (chunks.length === 5 && chunks[2] === 'measurements') {
    let measurement = false
    for (let m of measurements.womenswear) {
      if (m.toLowerCase() === chunks[3]) measurement = m
    }
    measurementImage = <MeasurementImage intl={app.intl} measurement={measurement} />
  }

  return (
    <AppWrapper
      app={app}
      title={props.pageContext.title}
      description={props.data.allMdx.edges[0].node.excerpt}
      {...app.treeProps(props.path)}
    >
      {measurementImage}
      <Mdx node={props.data.allMdx.edges[0].node} offspring={app.getOffspring(props.path)} />
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxDocsPage($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
          excerpt
        }
      }
    }
  }
`
