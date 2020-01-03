import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Blockquote from '@freesewing/components/Blockquote'

const customComponents = {
  Note: ({ children }) => {
    return <Blockquote type="note">{children}</Blockquote>
  },
  Tip: ({ children }) => {
    return <Blockquote type="tip">{children}</Blockquote>
  },
  Warning: ({ children }) => {
    return <Blockquote type="warning">{children}</Blockquote>
  },
  Fixme: ({ children }) => {
    return <Blockquote type="fixme">{children}</Blockquote>
  }
}

const Mdx = ({ node }) => (
  <MDXProvider components={customComponents}>
    <MDXRenderer>{node.body}</MDXRenderer>
  </MDXProvider>
)

export default Mdx
