import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';

const BlogTemplate = props => {

  return (
    <React.Fragment>
      <h1>{props.pageContext.node.frontmatter.title}</h1>
        <MDXProvider components={props.components}>
          <MDXRenderer>
            {props.pageContext.node.code.body}
          </MDXRenderer>
        </MDXProvider>
    </React.Fragment>
  );
}

export default BlogTemplate;
