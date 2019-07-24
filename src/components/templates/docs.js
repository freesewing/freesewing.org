import React, { useEffect } from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Blockquote from "@freesewing/components/Blockquote";
import MeasurementsImages from "../measurements/images";
import DocsIndexPage from "../docs/";
import PatternPage from "../docs/pattern";
import { list as patterns } from "@freesewing/pattern-info";
import { Link } from "gatsby";
import capitalize from "@freesewing/utils/capitalize";
import PatternOptions from "../docs/pattern-options";
import PatternMeasurements from "../docs/pattern-measurements";
import { measurements } from "@freesewing/models";

const DocumentationPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(props.pageContext.node.frontmatter.title);
  }, [props.slug]);
  if (props.slug === "/docs") return <DocsIndexPage {...props} />
  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
  }
  const realMeasurementName = m => {
    for (let measurement of measurements.womenswear) {
      if (measurement.toLowerCase() === m) return measurement;
    }
    return m;
  }

  let prefix = null;
  let suffix = null;
  // Add measurements images when needed
  const chunks = props.slug.split("/");
  if (
    chunks.length === 4
    && chunks[1] === "docs"
    && chunks[2] === "measurements"
  ) prefix = <MeasurementsImages measurement={realMeasurementName(chunks[3])} />
  else if (props.slug === "/docs/patterns")
    suffix = (
      <ul className="links">
        {patterns.map( pattern => (
          <li key={pattern}>
            <Link to={"/docs/patterns/"+pattern}>{capitalize(pattern)}</Link>
          </li>
        ))}
      </ul>
    );
  else if (
    chunks.length === 4
    && chunks[1] === "docs"
    && chunks[2] === "patterns"
  ) suffix = <PatternPage pattern={chunks[3]} {...props} />
  else if (
    chunks.length === 5
    && chunks[1] === "docs"
    && chunks[2] === "patterns"
    && chunks[4] === "options"
  ) suffix = <PatternOptions pattern={chunks[3]} />
  else if (
    chunks.length === 5
    && chunks[1] === "docs"
    && chunks[2] === "patterns"
    && chunks[4] === "measurements"
  ) suffix = <PatternMeasurements pattern={chunks[3]} app={props.app} />

  return (
    <React.Fragment>
      {prefix}
      {props.pageContext.node ? (
      <MDXProvider components={components}>
        <MDXRenderer>
          {props.pageContext.node.code.body}
        </MDXRenderer>
      </MDXProvider> ) : null }
      {suffix}
    </React.Fragment>
  );
}

export default DocumentationPage;
