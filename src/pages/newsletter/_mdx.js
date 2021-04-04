import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { Link, graphql } from 'gatsby'
import Mdx from '../../components/mdx'
import { FormattedDate, FormattedMessage } from 'react-intl'
import './newsletter.scss'

const Page = (props) => {
  const app = useApp(false)

  const style = {
    body: {
      maxWidth: '60ch',
      fontSize: '115%',
      margin: 'auto'
    }
  }
  const seasons = {
    q1: 'Winter',
    q2: 'Spring',
    q3: 'Summer',
    q4: 'Autumn'
  }
  const edition = props.data.allMdx.edges[0].node.parent.relativeDirectory
  const name = `${seasons[edition.slice(4, 6)]} ${edition.slice(0, 4)}`

  const crumbs = [
    {
      title: 'Newsletter',
      slug: '/newsletter/'
    }
  ]

  return (
    <AppWrapper
      app={app}
      title={name}
      description={`FreeSewing newsletter - ${name}`}
      crumbs={crumbs}
    >
      <Mdx node={props.data.allMdx.edges[0].node} />
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxNewsletterEdition($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
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
