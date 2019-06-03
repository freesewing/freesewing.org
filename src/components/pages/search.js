import React from "react"
import Layout from "../layout"
import TopicsToc from "../topics-toc";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "gatsby";

const SearchPage = props => {
  const mobile = useMediaQuery("(max-width:599px)");

  const styles = {
    container: {
      display: "flex",
      minHeight: "50vh",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    wrapper: {
      textAlign: "center",
    },
    button: {
      margin: "0.5rem",
      width: "120px",
    },
  }
  const menu = <TopicsToc
    slug={props.pageContext.slug}
    topicsToc={props.pageContext.topicsToc}
    topics={props.pageContext.topics}
    order={props.pageContext.topicsOrder}
  />

  return (
    <Layout
      topics={props.pageContext.topics}
      topicsToc={props.pageContext.topicsToc}
      menu={menu}
      mobile={mobile}
    >
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <h1 style={styles.heading}>Search</h1>
          FIXME: Under construction
          <p><Link to="/">Home</Link></p>
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
