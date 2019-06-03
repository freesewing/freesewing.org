import React from "react"
import Button from "@material-ui/core/Button";
import Layout from "../layout"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TopicsToc from "../topics-toc";

const IndexPage = props => {
  const mobile = useMediaQuery("(max-width:599px)");
  const tablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");

  const menu = <TopicsToc
    slug={props.pageContext.slug}
    topicsToc={props.pageContext.topicsToc}
    topics={props.pageContext.topics}
    order={props.pageContext.topicsOrder}
  />

  const styles = {
    container: {
      flexGrow: 2,
    },
    headerWrapper: {
      backgroundImage: "url('/horizon.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
    },
    header: {
      minHeight: "300px",
      padding: "3rem 2rem",
      fontFamily: "'Roboto Condensed', sans-serif",
      position: "relative",
      backgroundImage: "url('/flag.svg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "90% -30%",
    },
    innerHeader: {
      maxWidth: "650px",
      padding: "1rem 2rem",

    },
    h1: {
      margin: "0 0 2rem 0",
      padding: 0,
      fontWeight: 900,
      color: "#fff",
    },
    h2: {
      borderColor: "rgba(255,255,255,0.25)",
      margin: "0 0 1rem 0",
      color: "#fff",
    },
    link: {
      fontSize: "3rem",
    },
    button: {
      margin: "0.5rem",
      width: "180px",
    },
    boxes: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      padding: "2rem 0",
    },
    box: {
      padding: "1.5rem",
      maxWidth: "25%",
      minWidth: "314px",
    },
    primaryButton: {
      background: "#fff",
      borderColor: "#fff",
      color: "#212529",
      margin: "0.5rem",
    },
    secondaryButton: {
      background: "rgba(255,255,255,0.5)",
      color: "#212529",
      borderColor: "#fff",
    },
    stripe: {
      backgroundImage: "url('/support.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      minHeight: "300px",
      padding: "3rem 2rem",
      fontFamily: "'Roboto Condensed', sans-serif",
    },
    pitch: {
      color: "white",
      fontSize: "125%"
    },
    help: {
      padding: "1rem",
      maxWidth: "50%",
      minWidth: "314px",
      marginBottom: "5rem",
    },
  }
  if (tablet) {
    styles.header.backgroundSize = "30vh";
    styles.header.backgroundPosition = "90% calc(100% + 40px)";
  }
  if (mobile) {
    styles.header.backgroundSize = "20vh";
    styles.header.backgroundPosition = "90% calc(100% + 20px)";
    styles.innerHeader.padding = "1rem";
    styles.box.maxWidth = "100%";
  }

  return (
    <Layout
      topics={props.pageContext.topics}
      topicsToc={props.pageContext.topicsToc}
      menu={menu}
      mobile={mobile}
    >
      <div style={styles.container}>
        <div style={styles.headerWrapper}>
          <div style={styles.header}>
            <div style={styles.innerHeader}>
              <h1 style={styles.h1}>FreeSewing</h1>
              <h2 style={styles.h2}>A JavaScript library for made-to-measure sewing patterns</h2>
              <Button
                size="large"
                color="secondary"
                href="/start" variant="contained"
                style={styles.primaryButton}
              >Get started</Button>
              <Button
                size="large"
                color="secondary"
                href="/tutorial"
                variant="outlined"
                style={styles.secondaryButton}
              >Tutorial</Button>
            </div>
          </div>
        </div>
        <div style={styles.boxes}>
          <div style={styles.box}>
            <h2>Get started in seconds</h2>
            <p>
              Setup your development environement with this one-liner:
            </p>
            <div className="gatsby-highlight">
              <pre className="language-bash">
              <code className="language-bash">
                npm init freesewing-pattern@beta
              </code>
              </pre>
            </div>
            <p>You can try it out right now, or learn more about what to expect.</p>
            <Button variant="outlined" href="/packages/create-freesewing-pattern">Learn more</Button>
          </div>
          <div style={styles.box}>
            <h2>FreeSewing tutorial</h2>
            <p>Follow our step-by-step tutorial to familiarize yourself with the <a href="/concepts">basic concepts</a> and inner workings of FreeSewing.</p>
            <p>You'll learn everything you need to start designing your own made-to-measure sewing patterns.</p>
            <Button variant="outlined" href="/tutorial">Take the tutorial</Button>
          </div>
          <div style={styles.box}>
            <h2>API Reference</h2>
            <p>Detailed documentation for FreeSewing's API, including examples.</p>
            <p>We also have <a href="/do">best practices</a> and <a href="/advanced">advanced guides</a> to take your work to the next level.</p>
            <Button variant="outlined" href="/api">API Documentation</Button>
          </div>
        </div>

        <div style={styles.stripe}>
          <div style={styles.innerHeader}>
            <h1 style={styles.h1}>Support FreeSewing</h1>
            <h2 style={styles.h2}>FreeSewing lives by the grace of our Patrons</h2>
            <p style={styles.pitch}>
              If you think what we do is worthwhile, and if you can spare a few coins each month
              without hardship, you too should <b>become a patron of FreeSewing</b>.
            </p>
            <Button
              style={styles.primaryButton}
              variant="contained"
              href="https://freesewing.org/patrons/join"
            >Join the FreeSewing Patrons</Button>
          </div>
        </div>

        <div style={styles.boxes}>
          <div style={styles.help}>
            <h2>Need a hand?</h2>
            <p>The FreeSewing community is ready to help out when you get stuck or have questions.</p>
            <p>Join us <a href="https://gitter.im/freesewing/freesewing">in our chat room</a> for help, advice, or just a friendly chat.</p>
            <Button variant="outlined" href="https://gitter.im/freesewing/freesewing">Join our chat room</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
