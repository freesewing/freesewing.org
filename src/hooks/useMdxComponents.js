import React from 'react'
import Blockquote from '@freesewing/components/Blockquote'

const customMdxComponents = {
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
  },
}

export default customMdxComponents
