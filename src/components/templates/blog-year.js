import React from "react";
import { FormattedMessage } from "react-intl";
import { useStaticQuery, graphql, Link } from "gatsby"
import Breadcrumbs from "../breadcrumbs";

const BlogCategoryTemplate = props => {
  if (props.year === "years") {
    return (
      <React.Fragment>
        <Breadcrumbs
          crumbs={[{
            slug: "/blog",
            title: <FormattedMessage id="app.blog"/>
          }]}
          pageTitle={<FormattedMessage id="app.years"/>}
        />
        <h1>
          <FormattedMessage id="app.blog" />
          : <FormattedMessage id="app.years" />
        </h1>
      <ul className="links">
        {[2019,2018,2017].map( year  => <li key={year}><Link to={"/blog/years/"+year}>{year}</Link></li>)}
      </ul>
      </React.Fragment>
    );
  }

	const data = useStaticQuery(graphql`
		{
		  allMdx(
        filter:{ fileAbsolutePath: {regex: "/\/blog\/[^\/]*\/en.md/"}}
        sort:{
          fields: [frontmatter___date]
          order: DESC
        }
      ) {
        edges {
          node {
            parent {
              ... on File {
                relativeDirectory
              }
            }
            frontmatter {
              linktitle
              year:date(formatString: "YYYY")
            }
          }
        }
		  }
		}`
  );

  const crumbs = [
    {
      slug: "/blog",
      title: <FormattedMessage id="app.blog"/>
    },
    {
      slug: "/blog/years",
      title: <FormattedMessage id="app.years"/>
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumbs crumbs={crumbs} pageTitle={props.year}/>
      <h1>
        <FormattedMessage id="app.blog" />
        : {props.year}
      </h1>
      <ul className="links">
        {
          data.allMdx.edges.map( node => {
            let frontmatter = node.node.frontmatter;
            if (frontmatter.year !== props.year) return null;
            return (
              <li>
                <Link
                  to={"/"+node.node.parent.relativeDirectory}
                  title={frontmatter.linktitle}
                >
                  {frontmatter.linktitle}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </React.Fragment>
  );
}

export default BlogCategoryTemplate;
