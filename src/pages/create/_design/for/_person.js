import React from 'react'
import useApp from '../../../../hooks/useApp'
import withLanguage from '../../../../components/withLanguage'
import AppWrapper from '../../../../components/app/wrapper'
import DraftUi from '../../../../components/draft/ui'

const CreatePatternForPersonPage = props => {
  const app = useApp()

  return (
    <AppWrapper app={app}>
      <DraftUi
        app={app}
        data={props.data}
        person={props.person}
        design={props.pageContext.design}
      />
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternForPersonPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query DraftDocsCreate($optionsMdxRegex: String, $settingsMdxRegex: String) {
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
    ui: allMdx(
      filter: { fileAbsolutePath: { regex: "//ui/save-pattern-requires-an-account/[a-z]{2}.md/" } }
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
