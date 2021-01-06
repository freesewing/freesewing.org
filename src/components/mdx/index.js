import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Blockquote from '@freesewing/components/Blockquote'
import ReadMore from './readmore'
import YouTube from '../youtube'
import Legend from '@freesewing/components/Legend'
import Hashtag from '../hashtag'

const customComponents = {
  Note: ({ children }) => <Blockquote type="note">{children}</Blockquote>,
  Tip: ({ children }) => <Blockquote type="tip">{children}</Blockquote>,
  Warning: ({ children }) => <Blockquote type="warning">{children}</Blockquote>,
  Fixme: ({ children }) => <Blockquote type="fixme">{children}</Blockquote>,
  YouTube,
  Legend,
  Hashtag
}

const Mdx = ({ node, offspring }) => {
  if (!node) return null
  customComponents.ReadMore = (props) => <ReadMore node={node} pages={offspring} {...props} />
  return (
    <section id="mdx">
      <MDXProvider components={customComponents}>
        <MDXRenderer>{node.body}</MDXRenderer>
      </MDXProvider>
    </section>
  )
}

export default Mdx
