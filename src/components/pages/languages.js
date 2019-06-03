import React from "react"
import Layout from "../layout"
import Robot from "@freesewing/components/Robot";
import TopicsToc from "../topics-toc";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "gatsby";

const LanguagePage = props => {
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
    text: {
      maxWidth: "600px"
    },
    heading: {
      margin: "2rem 0 0"
    }
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
          <h1 style={styles.heading}>Languages</h1>
          <Robot size={300} pose="shrug"/>
          <div style={styles.text}>
            <p>Unfortunately, our developer documentation is currently only available in English.</p>
            <p>If you'd like to help us translate the developer documentation to other languages,
            please <a href="https://gitter.im/freesewing/freesewing">get in touch</a>.</p>
            <p><Link to="/">Home</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LanguagePage;
