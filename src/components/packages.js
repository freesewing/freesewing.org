import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby"

const Packages = props => {
	const data = useStaticQuery(graphql`
		{
		  allSitePage(filter: {path: {regex: "/\/packages\//"}}) {
        edges { node { path, context { node { frontmatter { title } } } } }
		  }
		}`);

  return (
      <ul className="links">
        {data.allSitePage.edges.map(e => {
          return <li><Link key={e.node.path} to={e.node.path}>{e.node.context.node.frontmatter.title}</Link></li>
        })
        }
    </ul>
  );
};

export default Packages;
