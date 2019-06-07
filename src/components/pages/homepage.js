import React from "react"
import Button from "@material-ui/core/Button";
import Layout from "../layout"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TopicsToc from "../topics-toc";
import { FormattedMessage } from "react-intl";
import Subscribe from "../subscribe";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { list as patternList } from "@freesewing/pattern-info";
import { Link } from "gatsby";
import patternsImage from "./patterns.jpg";
import showcasesImage from "./showcases.jpg";
import blogpostsImage from "./blogposts.jpg";

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
              ><FormattedMessage id="app.signUp" /></Button>
            </div>
          </div>
        </div>

        <div style={styles.boxes}>
          <div style={styles.box}>
            <h2>Drafted to your measurements</h2>
            <p>
              All our patterns are made-to-measure.
              Not just <em>graded</em> up or down,
              but actually drafted to your exact specifications,
              just as you would on paper.
            </p>
          </div>
          <div style={styles.box}>
            <h2>Packed with options plus live preview</h2>
            <p>
              FreeSewing patterns come with a range of options that allow you to different aspects of the pattern.
              Our live preview means no surprises: what you see is what you get.
            </p>
          </div>
          <div style={styles.box}>
            <h2>Recipes you can share, adapt, and remix</h2>
            <p>
              FreeSewing uses a <em>recipe</em> to capture how you would like your pattern.
              You can share these recipes with others so they can get the same look,
              drafted to their measurements.
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
            >Pricing</Button>
          </div>
        </div>

        <div style={styles.subscribe}>
          <Subscribe mobile={mobile}/>
        </div>

        <div style={styles.boxes}>
          <Card classes={{ root: "nobg card center" }}>
            <Link
              to="/patterns"
            >
              <CardMedia
                style={{ height: "240px" }}
                image={patternsImage}
              />
            </Link>
            <CardContent>
              <h2 className="light">
                <FormattedMessage id="app.patterns" />
              </h2>
              <ul className="inline">
                {patternList.map((pattern, index) => (
                  <li>
                    <Link to={"/patterns/" + pattern}>
                      {(pattern)}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardActions classes={{ root: "row-reverse" }}>
              <Button
                size="small"
                color="primary"
                href="/patterns"
              >
                <FormattedMessage id="app.browsePatterns" />
              </Button>
            </CardActions>
          </Card>
        </div>

        <div style={styles.boxes}>
          <Card classes={{ root: "nobg card center" }}>
            <Link
              to="/patterns"
            >
              <CardMedia
                style={{ height: "240px" }}
                image={patternsImage}
              />
            </Link>
            <CardContent>
              <h2 className="light">
                <FormattedMessage id="app.patterns" />
              </h2>
              <ul className="inline">
                {patternList.map((pattern, index) => (
                  <li>
                    <Link to={"/patterns/" + pattern}>
                      {(pattern)}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardActions classes={{ root: "row-reverse" }}>
              <Button
                size="small"
                color="primary"
                href="/patterns"
              >
                <FormattedMessage id="app.browsePatterns" />
              </Button>
            </CardActions>
          </Card>
        </div>

        <div style={styles.boxes}>
          <Card classes={{ root: "nobg card center" }}>
            <Link
              to="/patterns"
            >
              <CardMedia
                style={{ height: "240px" }}
                image={patternsImage}
              />
            </Link>
            <CardContent>
              <h2 className="light">
                <FormattedMessage id="app.patterns" />
              </h2>
              <ul className="inline">
                {patternList.map((pattern, index) => (
                  <li>
                    <Link to={"/patterns/" + pattern}>
                      {(pattern)}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardActions classes={{ root: "row-reverse" }}>
              <Button
                size="small"
                color="primary"
                href="/patterns"
              >
                <FormattedMessage id="app.browsePatterns" />
              </Button>
            </CardActions>
          </Card>
        </div>

      </div>
    </Layout>
  );
}

export default IndexPage;
