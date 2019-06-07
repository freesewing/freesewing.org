import React from "react"
import Button from "@material-ui/core/Button";
import Layout from "../layout"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TopicsToc from "../topics-toc";
import { injectIntl, FormattedMessage } from "react-intl";
import Subscribe from "../subscribe";
import { list as patternList } from "@freesewing/pattern-info";
import { Link } from "gatsby";
import patternsImage from "./patterns.jpg";
import showcasesImage from "./showcases.jpg";
import blogpostsImage from "./blogposts.jpg";
import withLanguage from "../withLanguage";

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
      justifyContent: "space-between",
      padding: "2rem 0",
      maxWidth: "1600px",
      margin: "auto",
    },
    box: {
      padding: "1.5rem",
      maxWidth: "25%",
      minWidth: "314px",
    },
    solobox: {
      padding: "1.5rem",
      maxWidth: "600px",
      margin: "auto",
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
    m1: {
      margin: "1rem"
    },
    card: {
      width: "32%",
      borderRadius: "6px",
    },
    cardImg: {
      borderTopLeftRadius: "6px",
      borderTopRightRadius: "6px",
    },
    cardText: {
      padding: "0.25rem 1rem 1rem",
      display: "flex",
      flexDirection: "column"
    },
    patternList: {
      margin: "0.5rem 0 0 0",
      padding: 0
    },
    patternEntry: {
      listStyleType: "none",
      display: "inline",
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
    styles.card.width = "100%";
    styles.card.marginBottom = "2rem";
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
              FreeSewing patterns come with options that allow you to customize different aspects of the pattern.
              Our live preview means no surprises: what you see is what you get.
            </p>
          </div>
          <div style={styles.box}>
            <h2>Recipes you can share and adapt</h2>
            <p>
              FreeSewing uses a <em>recipe</em> to capture how you configure your pattern.
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


        <div style={styles.m1}>
          <h3 style={{textAlign: "center", marginTop: "3rem"}}>Pricing</h3>
          <Subscribe mobile={mobile}/>
        </div>

        <div style={styles.m1}>
          <h3 style={{textAlign: "center", marginTop: "3rem"}}>~~~~</h3>
          <div style={styles.boxes}>
            <div style={styles.card} className="shadow">
              <Link to="/patterns" title={props.intl.formatMessage({id: "app.patterns"})}>
                <img
                  src={patternsImage}
                  style={styles.cardImg}
                  alt={props.intl.formatMessage({id: "app.patterns"})}
                />
              </Link>
                <div style={styles.cardText}>
                <Link to="/patterns" style={{color: "inherit"}} title={props.intl.formatMessage({id: "app.patterns"})}>
                  <h4 style={{margin: 0}}><FormattedMessage id="app.patterns" /></h4>
                </Link>
                <ul style={styles.patternList}>
                  {patternList.map((pattern, index) => (
                    <li style={styles.patternEntry}>
                      <Link to={"/patterns/" + pattern} title={pattern}>
                        {(pattern)}
                      </Link>
                      {index < patternList.length -1 ? ', ' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={styles.card} className="shadow">
              <Link to="/showcase" title={props.intl.formatMessage({id: "app.showcase"})}>
                <img
                  src={showcasesImage}
                  style={styles.cardImg}
                  alt={props.intl.formatMessage({id: "app.showcase"})}
                />
              </Link>
              <div style={styles.cardText}>
                <h4 style={{margin: 0}}>
                  <Link
                    to="/showcase"
                    style={{color: "inherit"}}
                    title={props.intl.formatMessage({id: "app.showcase"})}
                  >
                    <FormattedMessage id="app.showcase" />
                  </Link>
                </h4>
                <p style={{marginTop: "0.5rem"}}>
                  <Link
                    to="/showcase"
                    style={{color: "inherit"}}
                    title={props.intl.formatMessage({id: "app.showcase"})}
                  >
                    <FormattedMessage id="intro.txt-showcase" />
                  </Link>
                </p>
              </div>
            </div>

            <div style={styles.card} className="shadow">
              <Link to="/blog" title={props.intl.formatMessage({id: "app.blog"})}>
                <img
                  src={blogpostsImage}
                  style={styles.cardImg}
                  alt={props.intl.formatMessage({id: "app.patterns"})}
                />
              </Link>
              <div style={styles.cardText}>
                <h4 style={{margin: 0}}>
                  <Link
                    to="/blog"
                    style={{color: "inherit"}}
                    title={props.intl.formatMessage({id: "app.blog"})}
                  >
                    <FormattedMessage id="app.blog" />
                  </Link>
                </h4>
                <p style={{marginTop: "0.5rem"}}>
                  <Link
                    to="/blog"
                    style={{color: "inherit"}}
                    title={props.intl.formatMessage({id: "app.blog"})}
                  >
                    <FormattedMessage id="intro.txt-blog" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.boxes}>
          <div style={styles.box}>
            <h2>Looking for our code?</h2>
            <p>
              Our developer documentation is hosted on <a href="https://freesewing.dev/">freesewing.dev</a>.
              You'll find links to all our repositories there, as well as in-depth documentation, tutorials, and examples.
            </p>
          </div>
          <div style={styles.box}>
            <h2>Want to help out?</h2>
            <p>
              Awesome ❤️<br />Our <a href="https://freesewing.dev/contributor">contributor documentation</a> is
              a good starting point. We also have dedicated guides for&nbsp;
              <a href="https://freesewing.dev/translator">translators</a> and&nbsp;
              <a href="https://freesewing.dev/editor">editors</a>.
            </p>
          </div>
          <div style={styles.box}>
            <h2>More questions?</h2>
            <p>
              Our <Link to="/faq">frequently asked questions</Link> might have the answer you're looking for.
              If not, <a href="https://gitter.im/freesewing/freesewing">join our chat room</a> and we'll try to
              help you there.
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default withLanguage(injectIntl(IndexPage), process.env.GATSBY_LANG);
