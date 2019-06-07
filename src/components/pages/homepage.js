import React from "react"
import Button from "@material-ui/core/Button";
import Layout from "../layout"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TopicsToc from "../topics-toc";
import { FormattedMessage } from "react-intl";
import Subscribe from "../subscribe";

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
    supportH2: {
      textAlign: "center",
      border: 0,
    },
    subscribe: {
      margin: "1rem"
    }
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
              <h2 style={styles.h2}>
                <FormattedMessage id="app.sewingPatternsForNonAveragePeople" /><sup>*</sup>
                <br />
                <small>
                  <small>
                    * <FormattedMessage id="app.averagePeopleDontExist" />
                  </small>
                </small>
              </h2>
              <Button
                size="large"
                color="secondary"
                href="/signup" variant="contained"
                style={styles.primaryButton}
              ><FormattedMessage id="app.signupForAFreeAccount" /></Button>
            </div>
          </div>
        </div>
        <div style={styles.boxes}>
          <div style={styles.box}>
            <h2><FormattedMessage id="app.100PercentOpenSource" /></h2>
            <p>
              <FormattedMessage id="intro.txt-opensource" />
            </p>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="app.100PercentCommunity" /></h2>
            <p>
              <FormattedMessage id="intro.txt-community" />
            </p>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="app.100PercentFree" /></h2>
            <p>
              <FormattedMessage id="intro.txt-patrons" />
            </p>
          </div>
        </div>

        <div style={styles.stripe}>
          <div style={styles.innerHeader}>
            <h1 style={styles.h1}>Support FreeSewing</h1>
            <h2 style={styles.h2}>
              FreeSewing is fuelled by a voluntary subscription model
            </h2>
            <p style={styles.pitch}>
              If you think what we do is worthwhile, and if you can spare a few coins each month without hardship, you too should become a patron of FreeSewing.
            </p>
            <Button
              style={styles.primaryButton}
              variant="contained"
              href="#tier-2"
            >Subscriptions</Button>
          </div>
        </div>

        <div style={styles.subscribe}>
          <Subscribe mobile={mobile}/>
        </div>

      </div>
    </Layout>
  );
}

export default IndexPage;
