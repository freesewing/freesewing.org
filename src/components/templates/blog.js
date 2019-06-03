import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import DateIcon from "@material-ui/icons/DateRange";
import CategoryIcon from "@material-ui/icons/Label";
import AuthorIcon from "@material-ui/icons/Face";

const BlogTemplate = props => {
  console.log('blog props', props.pageContext);
  let frontmatter = props.pageContext.node.frontmatter;
  let img = frontmatter.img.childImageSharp.fluid;

  const style = {
    meta: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      fontFamily: "'Roboto Condensed', sans-serif",
    },
    title: {
      marginBottom: 0,
    },
    figure: {
      marginTop: 0,
    }
  }

  return (
    <React.Fragment>
      <h1 style={style.title}>{props.pageContext.node.frontmatter.title}</h1>
      <div style={style.meta}>
        <FormattedDate value={frontmatter.date} year="numeric" month="long" day="2-digit"/>
        <div>
          <FormattedMessage id="app.in" />
          &nbsp;
          <Link to={"/blog/category/"+frontmatter.category}>{frontmatter.category}</Link>
          &nbsp;
          <FormattedMessage id="app.by" />
          &nbsp;
          <Link to={"/users/"+frontmatter.author}>{frontmatter.author}</Link>
        </div>
      </div>
      <figure style={style.figure}>
        <a href={img.originalImg}>
          <img
            src={img.base64}
            style={{width: "100%"}}
            srcset={img.srcSet}
          />
        </a>
        <figcaption>{frontmatter.caption}</figcaption>
      </figure>
      <MDXProvider components={props.components}>
        <MDXRenderer>
          {props.pageContext.node.code.body}
        </MDXRenderer>
      </MDXProvider>
      <p style={{textAlign: "right", marginTop: "2rem"}}>--- {frontmatter.author}</p>
    </React.Fragment>
  );
}

export default BlogTemplate;
