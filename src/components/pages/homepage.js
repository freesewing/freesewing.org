import React from "react"
import Button from "@material-ui/core/Button";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Subscribe from "../subscribe";
import { list as patternList } from "@freesewing/pattern-info";
import { Link } from "gatsby";
import patternsImage from "./patterns.jpg";
import showcasesImage from "./showcases.jpg";
import blogpostsImage from "./blogposts.jpg";

const HomePage = ({ app }) => {
  app.frontend.setLayout = "home";
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
  if (app.frontend.tablet) {
    styles.header.backgroundSize = "30vh";
    styles.header.backgroundPosition = "90% calc(100% + 40px)";
  }
  if (app.frontend.mobile) {
    styles.header.backgroundSize = "20vh";
    styles.header.backgroundPosition = "90% calc(100% + 20px)";
    styles.innerHeader.padding = "1rem";
    styles.box.maxWidth = "100%";
    styles.box.minWidth = "200px";
    styles.card.width = "100%";
    styles.card.marginBottom = "2rem";
  }
  let mainButton;
  if (app.account.patron) {
    mainButton = (
      <Button
        size="large"
        color="secondary"
        href="/share" variant="contained"
        style={styles.primaryButton}
      ><FormattedMessage id="app.share" /></Button>
    )
  } else if (app.account.username) {
    mainButton = (
      <Button
        size="large"
        color="secondary"
        href="/patrons/join" variant="contained"
        style={styles.primaryButton}
      ><FormattedMessage id="app.subscribe" /></Button>
    )
  } else {
    mainButton = (
      <Button
        size="large"
        color="secondary"
        href="/signup" variant="contained"
        style={styles.primaryButton}
      ><FormattedMessage id="app.signUp" /></Button>
    )
  }

  return (
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
                    * <FormattedMessage id="app.averagePeopleDoNotExist" />
                  </small>
                </small>
              </h2>
              {mainButton}
            </div>
          </div>
        </div>

        <div style={styles.boxes}>
          <div style={styles.box}>
            <h2><FormattedMessage id="homepage.row1col1title" /></h2>
            <p><FormattedHTMLMessage id="homepage.row1col1text" /></p>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="homepage.row1col2title" /></h2>
            <p><FormattedMessage id="homepage.row1col2text" /></p>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="homepage.row1col3title" /></h2>
            <p><FormattedHTMLMessage id="homepage.row1col3text" /></p>
          </div>
        </div>

        <div style={styles.stripe}>
          <div style={styles.innerHeader}>
            <h1 style={styles.h1}><FormattedMessage id="supportFreesewing"/></h1>
            <h2 style={styles.h2}>
              <FormattedMessage id="app.txt-tiers" />
            </h2>
            <p style={styles.pitch}>
              <FormattedMessage id="app.patronPitch" />
            </p>
            <Button
              style={styles.primaryButton}
              variant="contained"
              href="#tier-2"
            ><FormattedMessage id="app.pricing" /></Button>
          </div>
        </div>


        <div style={styles.m1}>
          <h3 style={{textAlign: "center", marginTop: "3rem"}}><FormattedMessage id="app.pricing" /></h3>
          <Subscribe mobile={app.frontend.mobile}/>
        </div>

        <div style={styles.m1}>
          <h3 style={{textAlign: "center", marginTop: "3rem"}}>~~~~</h3>
          <div style={styles.boxes}>
            <div style={styles.card} className="shadow">
              <Link to="/patterns" title={app.frontend.intl.formatMessage({id: "app.patterns"})}>
                <img
                  src={patternsImage}
                  style={styles.cardImg}
                  alt={app.frontend.intl.formatMessage({id: "app.patterns"})}
                />
              </Link>
                <div style={styles.cardText}>
                <Link to="/patterns" style={{color: "inherit"}} title={app.frontend.intl.formatMessage({id: "app.patterns"})}>
                  <h4 style={{margin: 0}}><FormattedMessage id="app.patterns" /></h4>
                </Link>
                <ul style={styles.patternList}>
                  {patternList.map((pattern, index) => (
                    <li style={styles.patternEntry} key={pattern}>
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
              <Link to="/showcase" title={app.frontend.intl.formatMessage({id: "app.showcase"})}>
                <img
                  src={showcasesImage}
                  style={styles.cardImg}
                  alt={app.frontend.intl.formatMessage({id: "app.showcase"})}
                />
              </Link>
              <div style={styles.cardText}>
                <h4 style={{margin: 0}}>
                  <Link
                    to="/showcase"
                    style={{color: "inherit"}}
                    title={app.frontend.intl.formatMessage({id: "app.showcase"})}
                  >
                    <FormattedMessage id="app.showcase" />
                  </Link>
                </h4>
                <p style={{marginTop: "0.5rem"}}>
                  <Link
                    to="/showcase"
                    style={{color: "inherit"}}
                    title={app.frontend.intl.formatMessage({id: "app.showcase"})}
                  >
                    <FormattedMessage id="intro.txt-showcase" />
                  </Link>
                </p>
              </div>
            </div>

            <div style={styles.card} className="shadow">
              <Link to="/blog" title={app.frontend.intl.formatMessage({id: "app.blog"})}>
                <img
                  src={blogpostsImage}
                  style={styles.cardImg}
                  alt={app.frontend.intl.formatMessage({id: "app.patterns"})}
                />
              </Link>
              <div style={styles.cardText}>
                <h4 style={{margin: 0}}>
                  <Link
                    to="/blog"
                    style={{color: "inherit"}}
                    title={app.frontend.intl.formatMessage({id: "app.blog"})}
                  >
                    <FormattedMessage id="app.blog" />
                  </Link>
                </h4>
                <p style={{marginTop: "0.5rem"}}>
                  <Link
                    to="/blog"
                    style={{color: "inherit"}}
                    title={app.frontend.intl.formatMessage({id: "app.blog"})}
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
            <h2><FormattedMessage id="homepage.row2col1title" /></h2>
            <p><FormattedHTMLMessage id="homepage.row2col1text" /></p>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="homepage.row2col2title" /></h2>
            <p><FormattedHTMLMessage id="homepage.row2col2text" /></p>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="homepage.row2col3title" /></h2>
            <p><FormattedHTMLMessage id="homepage.row2col3text" /></p>
          </div>
        </div>

      </div>
  );
}

export default HomePage;
