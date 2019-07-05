import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Blockquote from "@freesewing/components/Blockquote";
import MeasurementsImages from "../measurements/images";
import DocsIndexPage from "../docs/";

const DocumentationPage = props => {
  if (props.slug === "/docs") return <DocsIndexPage {...props} />

  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
  }

  let prefix = null;
  // Add measurements images when needed
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
