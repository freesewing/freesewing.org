import React, { useEffect, useState } from 'react'
import useApp from '../../../../../../hooks/useApp'
import withLanguage from '../../../../../../components/withLanguage'
import AppWrapper from '../../../../../../components/app/wrapper'
import DraftUi from '../../../../../../components/draft/ui'

const CreatePatternForPersonPage = props => {
  const app = useApp(props)

  return (
    <AppWrapper app={app}>
      <DraftUi
        app={app}
        data={props.data}
        person={props.person}
        design={props.pageContext.design}
        recreate={props.pattern}
      />
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternForPersonPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query DraftDocsRecreate($optionsMdxRegex: String, $settingsMdxRegex: String) {
    options: allMdx(
      filter: { fileAbsolutePath: { regex: $optionsMdxRegex } }
      sort: { fields: [frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          body
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
          frontmatter {
            title
          }
        }
      }
    }
    settings: allMdx(
      filter: { fileAbsolutePath: { regex: $settingsMdxRegex } }
      sort: { fields: [frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          body
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
