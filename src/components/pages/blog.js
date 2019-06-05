import React from "react";
import { withTheme } from '@material-ui/core/styles';
import Blockquote from "@freesewing/components/Blockquote";
import Example from "@freesewing/components/Example";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "gatsby";
import TopicsToc from "../topics-toc";
import Layout from "../layout";
import Breadcrumbs from "../breadcrumbs";
import { FormattedMessage } from "react-intl";

const BlogIndex = props => {
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
  }
  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
    Example,
  }

  const menu = <TopicsToc
    slug={props.pageContext.slug}
    topicsToc={props.pageContext.topicsToc}
    topics={props.pageContext.topics}
    order={props.pageContext.topicsOrder}
    topic={props.pageContext.topic}
    toc={props.pageContext.node.tableOfContents}
  />

  const extraProps = {
    components,
  }

  let main = null;

  return (
    <Layout
      pageToc={false}
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
              pageTitle={
                props.pageContext.node.frontmatter.linktitle
                ? props.pageContext.node.frontmatter.linktitle
                : props.pageContext.node.frontmatter.title
              }
            />
            {main}
            <div>
              <div className="prev-next">
                {renderLink("prev")}
                {renderLink("next")}
              </div>
              <a
                style={{textAlign: "center", display: 'block', fontSize: '85%'}}
                href={"https://github.com/freesewing/markdown/edit/develop/dev"+props.pageContext.slug+"/"+props.pageContext.language+".md"}>
                <FormattedMessage id="app.editThisPage" />
              </a>
            </div>
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

export default withTheme(BlogIndex);
