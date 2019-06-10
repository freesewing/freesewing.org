import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Blockquote from "@freesewing/components/Blockquote";

const DocumentationPage = props => {
  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
  }

  return (
    <MDXProvider components={components}>
      <MDXRenderer>
        {props.pageContext.node.code.body}
      </MDXRenderer>
    </MDXProvider>
  );
}

export default DocumentationPage;
