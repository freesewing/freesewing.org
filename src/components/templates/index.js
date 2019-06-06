import React from "react";
import { withTheme } from '@material-ui/core/styles';
import Blockquote from "@freesewing/components/Blockquote";
import Example from "@freesewing/components/Example";
import BlogTemplate from "./blog";
import BlogIndexTemplate from "./blogindex";
import ShowcaseTemplate from "./showcase";
import ShowcaseIndexTemplate from "./showcaseindex";
import ShowcaseCategoryTemplate from "./showcasecategory";
import DocumentationTemplate from "./docs";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "gatsby";
import TopicsToc from "../topics-toc";
import Layout from "../layout";
import Breadcrumbs from "../breadcrumbs";
import { FormattedMessage } from "react-intl";
import { list as patterns } from "@freesewing/pattern-info";

const PageTemplate = props => {
  const mobile = useMediaQuery("(max-width:599px)");

  const renderLink = side => {
    const slug = props.pageContext.slug;
    let to = false;
    let title = false;
    let pos = props.pageContext.content.slugs.indexOf(slug);
    if (side === "next") pos++;
    else pos--;
    if (props.pageContext.content.slugs[pos] !== "undefined") {
      to = props.pageContext.content.slugs[pos];
      title = props.pageContext.content.titles[to];
    }
    if (!to) return <span>&nbsp;</span>

    return <Link to={to} style={{textAlign: (side === "prev" ? 'left' : 'right')}}>
      {side === "prev"
        ? <span>&laquo;&nbsp;</span>
        : null
      }
      {title}
      {side === "next"
        ? <span>&nbsp;&raquo;</span>
        : null
      }
    </Link>
  }

  const styles = {
    body: {
      maxWidth: '42em',
      margin: 'auto',
    },
    edit: {
      fontSize: "90%",
      paddingLeft: "1rem",
    }
  }

  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
    Example,
  }

  let toc = null;
  if (typeof props.pageContext.node !== "undefined")
    toc = props.pageContext.node.tableOfContents;

  console.log(props.pageContext);
  const menu = <TopicsToc
    slug={props.pageContext.slug}
    topicsToc={props.pageContext.topicsToc}
    topics={props.pageContext.topics}
    order={props.pageContext.topicsOrder}
    topic={props.pageContext.topic}
    toc={toc}
  />

  const trailer = props['*'].split("/").pop();
  const extraProps = {
    components,
    mobile,
    trailer
  }

  const getTitle = () => {
    if (typeof props.pageContext.node === "undefined") {
      if (typeof props.pageContext.titleFrom !== "undefined") return "#"+trailer;
      else return <FormattedMessage id={props.pageContext.i18nTitle} />
    }
    return props.pageContext.node.frontmatter.linktitle
      ? props.pageContext.node.frontmatter.linktitle
      : props.pageContext.node.frontmatter.title
  }
  const pageTitle = getTitle();

  let main = null;
  if (props.pageContext.slug === "/blog")
    main = <BlogIndexTemplate {...props} {...extraProps}/>
  else if (props.pageContext.slug.slice(0,6) === "/blog/")
    main = <BlogTemplate {...props} {...extraProps}/>
  else if (props.pageContext.slug === "/showcase")
    main = <ShowcaseIndexTemplate {...props} {...extraProps}/>
  else if (
    props.pageContext.slug.slice(0,10) === "/showcase/"
    && patterns.indexOf(trailer) !== -1
  ) main = <ShowcaseCategoryTemplate {...props} {...extraProps}/>
  else if (props.pageContext.slug.slice(0,10) === "/showcase/")
    main = <ShowcaseTemplate {...props} {...extraProps}/>
  else main = <DocumentationTemplate {...props} {...extraProps}/>

  return (
    <Layout
      pageToc={toc}
      topics={props.pageContext.topics}
      topicsToc={props.pageContext.topicsToc}
      menu={menu}
      mobile={props.mobile}
    >
      <div className="fs-sa">
        <section>
          <article style={styles.body}>
            <Breadcrumbs
              crumbs={props.pageContext.crumbs}
              pageTitle={pageTitle}
            />
            {main}
            <div className="prev-next">
              {renderLink("prev")}
              {renderLink("next")}
            </div>
            <Breadcrumbs
              crumbs={props.pageContext.crumbs}
              pageTitle={pageTitle}
              suffix={(
                <span style={styles.edit}>
                  [&nbsp;
                  <a href={"https://github.com/freesewing/markdown/edit/develop/dev"+props.pageContext.slug+"/"+props.pageContext.language+".md"}>
                    <FormattedMessage id="app.editThisPage" />
                  </a>
                  &nbsp;]
                </span>
              )}
            />
          </article>
        </section>
        { mobile ? null : (
        <aside>
          <div className="sticky">
            {menu}
          </div>
        </aside> )}
      </div>
    </Layout>
  );
}

export default withTheme(PageTemplate);
