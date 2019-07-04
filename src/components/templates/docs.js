import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Blockquote from "@freesewing/components/Blockquote";
import MeasurementsImages from "../measurements/images";

const DocumentationPage = props => {
  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
  }

  // Add measurements images when needed
  let prefix = null;
  const chunks = props.slug.split("/");
  if (
    chunks.length === 4
    && chunks[1] === "docs"
    && chunks[2] === "measurements"
  ) prefix = <MeasurementsImages measurement={chunks[3]} />

  return (
    <React.Fragment>
      {prefix}
      <MDXProvider components={components}>
        <MDXRenderer>
          {props.pageContext.node.code.body}
        </MDXRenderer>
      </MDXProvider>
    </React.Fragment>
  );
}

export default DocumentationPage;
