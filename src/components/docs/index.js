import React from "react";
import { list as patterns } from "@freesewing/pattern-info";
import { measurements } from "@freesewing/models";
import { FormattedMessage } from "react-intl";
import { capitalize } from "@freesewing/utils";
import { Link, useStaticQuery, graphql } from "gatsby"
import Blockquote from "@freesewing/components/Blockquote";

const DocumentationIndexPage = props => {
	const markdownDocs = useStaticQuery(graphql`
		{
      about: allMdx(
        filter:{ fileAbsolutePath: {regex: "/\/docs\/about\/[^.]*\/en.md/"}}
        sort:{ fields: [frontmatter___title], order: DESC }
      ) {
        edges {
          node {
            parent { ... on File { relativeDirectory } }
            frontmatter { title }
          }
        }
		  }
      sewing: allMdx(
        filter:{ fileAbsolutePath: {regex: "/\/docs\/sewing\/[^.]*\/en.md/"}}
        sort:{ fields: [frontmatter___title], order: DESC }
      ) {
        edges {
          node {
            parent { ... on File { relativeDirectory } }
            frontmatter { title }
          }
        }
		  }
      draft: allMdx(
        filter:{ fileAbsolutePath: {regex: "/\/docs\/draft\/[^.]*\/en.md/"}}
        sort:{ fields: [frontmatter___title], order: DESC }
      ) {
        edges {
          node {
            parent { ... on File { relativeDirectory } }
            frontmatter { title }
          }
        }
		  }
		}`
  );
  const docs = {};
  for (let topic of ["about", "sewing", "draft"]) {
    docs[topic] = {};
    for (let node of markdownDocs[topic].edges) {
      docs[topic][node.node.frontmatter.title] = "/" + node.node.parent.relativeDirectory;
    }
  }
  const sortMeasurements = measurements => {
    let sorted = [];
    let translated = {};
    for (let m of measurements) {
      let translation = props.app.frontend.intl.messages["measurements"+m] || m;
      translated[translation] = m;
    }
    for (let m of Object.keys(translated).sort()) sorted.push(translated[m]);

    return Object.values(translated);
  }

  const renderPatternDocs = pattern => {
    return (
      <li key={pattern}>
        <Link to={"/docs/patterns/"+pattern}>
          {capitalize(pattern)}
        </Link>
      </li>
    );
  }

  const renderMeasurementDocs = m => {
    return (
      <li key={m}>
        <Link to={"/docs/measurements/"+m.toLowerCase()}>
          <FormattedMessage id={"measurements."+m}/>
        </Link>
      </li>
    );
  }

  const renderTopicDocs = topic => {
    let links = [];
    let list = Object.keys(docs[topic]);
    list.sort();
    for (let title of list) links.push(<li><Link to={docs[topic][title]}>{title}</Link></li>)
    return <ul className="links">{links}</ul>
  }

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    column: {
      width: props.app.frontend.mobile ? "100%" : "48%"
    },
    subHeader: {
      margin: 0,
    }
  }

  return (
    <React.Fragment>
    <div style={styles.wrapper}>
      <div style={styles.column}>
        <h2><FormattedMessage id="app.patterns" /></h2>
        <ul className="links">
        {patterns.map( pattern => renderPatternDocs(pattern))}
        </ul>
      </div>
      <div style={styles.column}>
        <h2><FormattedMessage id="app.measurements" /></h2>
        <ul className="links">
          {sortMeasurements(measurements.womenswear).map( measurement => renderMeasurementDocs(measurement))}
        </ul>
      </div>
      <div style={styles.column}>
        <h2><FormattedMessage id="app.various" /></h2>
        <h5 style={styles.subHeader}><FormattedMessage id="app.aboutFreesewing" /></h5>
        {renderTopicDocs("about")}
        <h5 style={styles.subHeader}><FormattedMessage id="app.draft" /></h5>
        {renderTopicDocs("draft")}
      </div>
      <div style={styles.column}>
        <h2><FormattedMessage id="app.sewing" /></h2>
        {renderTopicDocs("sewing")}
      </div>
    </div>
    <Blockquote>
      <h5>More on freesewing.dev</h5>
      <p>Freesewing.org only hosts documentation for makers.</p>
      <p>Our documentation for developers, editors, and translators is available on  <a href="https://freesewing.dev/">freesewing.dev</a></p>
    </Blockquote>

    </React.Fragment>
  );
}

export default DocumentationIndexPage;
