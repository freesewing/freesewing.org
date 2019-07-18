import React, { useEffect, useState } from "react";
import Breadcrumbs from "../breadcrumbs";
import { FormattedMessage } from "react-intl";
import capitalize from "@freesewing/utils/capitalize";
import DraftConfigurator from "@freesewing/components/DraftConfigurator";
import withGist from "@freesewing/components/withGist";
import patterns from "./patterns";
import { measurements as requiredMeasurements, withBreasts as withBreastsPatterns } from "@freesewing/pattern-info";
import Draft from "@freesewing/components/Draft";
import i18nPlugin from "@freesewing/plugin-i18n";
import { plugin as patternTranslations } from "@freesewing/i18n";
import Button from "@material-ui/core/Button";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Tune";
import ExportIcon from "@material-ui/icons/GetApp";
import SaveIcon from "@material-ui/icons/CloudUpload";
import ExportPattern from "./export-pattern";
import SaveRecipe from "./save-recipe";
import { withoutBreasts, withBreasts } from "@freesewing/models";
import Blockquote from "@freesewing/components/Blockquote";
import Icon from "@freesewing/components/Icon";
import { useStaticQuery, graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Robot from "@freesewing/components/Robot";

const DraftPage = props => {
  const [tab, setTab] = useState(0);
  const [display, setDisplay] = useState('draft');
  const [fit, setFit] = useState("false");
  const [eventType, setEventType] = useState("");
  const [eventValue, setEventValue] = useState("");
  useEffect(() => {
    props.updateGist(props.pattern, 'pattern');
    props.updateGist(props.model, 'model');
    props.updateGist(true, 'settings', 'embed');
    props.updateGist(10, 'settings', 'sa');
    props.updateGist(true, 'settings', 'complete');
    props.updateGist(false, 'settings', 'paperless');
    props.updateGist({}, 'settings', 'options');
    props.updateGist(props.app.account.settings.units, 'settings', 'units');
    let measurements = {}
    for (let m of requiredMeasurements[props.pattern]) {
      measurements[m] = props.app.models[props.model].measurements[m];
    }
    props.updateGist(measurements, 'settings', 'measurements');
  }, [props.pattern, props.model]);
	const markdownDocs = useStaticQuery(graphql`
		{
      options: allMdx(
        filter:{ fileAbsolutePath: {regex: "/\/docs\/patterns\/aaron\/options\/[^\/]*\/en.md/"}}
        sort:{
          fields: [frontmatter___title]
          order: DESC
        }
      ) {
        edges {
          node {
            code { body }
            parent {
              ... on File {
                relativeDirectory
              }
            }
            frontmatter {
              title
            }
          }
        }
		  }
      settings: allMdx(
        filter:{ fileAbsolutePath: {regex: "/\/docs\/draft\/settings\/[^\/]*\/en.md/"}}
        sort:{
          fields: [frontmatter___title]
          order: DESC
        }
      ) {
        edges {
          node {
            code { body }
            parent {
              ... on File {
                relativeDirectory
              }
            }
            frontmatter {
              title
            }
          }
        }
		  }
		}`
  );
  const docs = {
    options: {},
    settings: {}
  };
  for (let node of markdownDocs.options.edges) {
    let name = node.node.parent.relativeDirectory.split("/").pop();
    docs.options[name] = {
      title: node.node.frontmatter.title,
      body: node.node.code.body
    }
  }
  for (let node of markdownDocs.settings.edges) {
    let name = node.node.parent.relativeDirectory.split("/").pop();
    docs.settings[name] = {
      title: node.node.frontmatter.title,
      body: node.node.code.body
    }
  }

  const toggleTab = () => {
    if(tab === 1) setTab(0);
    else setTab(1);
  }
  const raiseEvent = (type, data) => {
    if (type === "showHelp") {
      // Clicking same help icon again will cancel it out
      if (display === "help"
        && eventType === data.type
        && eventValue === data.value
      ) setDisplay("draft");
      else {
        setEventType(data.type);
        setEventValue(data.value);
        setDisplay("help");
      }
    }
  }

  let pattern, error, patternProps;
  try {
    console.log('pattern', props.pattern, patterns);
    pattern = new patterns[capitalize(props.pattern)](props.gist.settings)
      .use(i18nPlugin, { strings: patternTranslations });
    if (display === "compare") {
      let compareWith = {};
      if (withBreastsPatterns.indexOf(props.pattern) === -1) compareWith = {...withoutBreasts};
      else compareWith = {...withBreasts};
      compareWith.model = props.app.models[props.model].measurements;
      pattern.sampleModels(compareWith, 'model');
    } else pattern.draft();
    patternProps = pattern.getRenderProps();
  } catch (err) {
    console.log({ err, pattern });
    error = err;
  }

  const crumbs = [
    {
      slug: "/create",
      title: <FormattedMessage
        id="app.newPattern"
        values={{pattern: props.app.frontend.intl.formatMessage({id: "app.pattern"})}}
      />
    },
    {
      slug: "/create/"+props.pattern,
      title: <FormattedMessage
        id="app.newPattern"
        values={{pattern: capitalize(props.pattern)}}
      />
    }
  ];
  const pageTitle = <FormattedMessage id="app.newPatternForModel"
    values={{pattern: capitalize(props.pattern), model: props.app.models[props.model].name}} />
  const styles = {
    narrow: {
      maxWidth: '42em',
      margin: 'auto',
    },
    wide: {
      maxWidth: '100%',
    },
    buttons: {
      textAlign: props.app.frontend.mobile ? "center" : "right",
      margin: "1rem auto",
    },
    button: {
      margin: "0.5rem",
    },
    buttonIcon: {
      marginRight: "0.5rem",
    },
    tab: {
      active: {
      },
      inactive: {
        background: props.app.frontend.theme === "light" ? "#868e96" : "#868e96",
        color: props.app.frontend.theme === "light" ? "#fff" : "#000",
      }
    },
    errorWrapper: {
      maxWidth: "800px",
      margin: "auto",
    },
    error: {
      overflowX: "auto",
      fontSize: "80%",
      fontFamily: `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
    }
  }
  const preButtons = (
    <div style={styles.buttons}>
      {props.app.frontend.mobile ? null : (
      <Button
        variant="outlined"
        color="primary"
        style={styles.button}
        onClick={() => setFit(!fit)}
      >
        { fit ? <ZoomInIcon /> : <ZoomOutIcon /> }
      </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        className="accent"
        style={styles.button}
        onClick={() => setDisplay(display === "compare" ? "draft" : "compare")}
      >
        <FormattedMessage id={display === "compare" ? "app.preview" : "app.compare"} />
      </Button>
    </div>
  );
  const postButtons = (
    <div style={styles.buttons}>
      <Button
        variant="contained"
        color="primary"
        className="info"
        style={styles.button}
        onClick={() => setDisplay("save")}
      >
        <SaveIcon style={styles.buttonIcon}/>
        <FormattedMessage id="app.saveRecipe" />
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={styles.button}
        onClick={() => setDisplay("export")}
      >
        <ExportIcon style={styles.buttonIcon}/>
        <FormattedMessage id="app.exportPattern" />
      </Button>
    </div>
  );
  const side = [
    <Tabs
      value={tab}
      onChange={toggleTab}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      style={styles.tabs}
    >
      <Tab icon={<SettingsIcon />} style={styles.tab[(tab === 0 ? 'active' : 'inactive')]}/>
      <Tab icon={<MenuIcon />} style={styles.tab[(tab === 1 ? 'active' : 'inactive')]}/>
    </Tabs>];
  if (tab === 0) side.push(
       <DraftConfigurator
          gist={props.gist}
          units={props.app.account.settings.units}
          config={pattern.config}
          updateGist={props.updateGist}
          raiseEvent={raiseEvent}
        />);
  else side.push(<div style={{paddingTop: "1rem"}} onClick={props.app.frontend.closeNav}>{[props.mainMenu, props.userMenu]}</div>);

  if (fit && patternProps) patternProps.style = {
    maxHeight: "85vh"
  }

  let main, helpTitle;
  if (display === "export") {
    main = <ExportPattern
      setDisplay={setDisplay}
      app={props.app}
      gist={props.gist}
      pattern={pattern}
    />
  }
  else if (display === "save") {
    main = <SaveRecipe
      setDisplay={setDisplay}
      app={props.app}
      gist={props.gist}
    />
  }
  else if (display === "help") {
    let close = (
      <div style={styles.buttons}>
      <Button variant="contained" color="primary" onClick={() => setDisplay("draft")}>
        <FormattedMessage id="app.back" />
      </Button>
      </div>
    );
    main = [];
    main.push(close);
    let topicDocs = docs.options;
    if (eventType === "draftSetting") topicDocs = docs.settings;
    helpTitle = topicDocs[eventValue.toLowerCase()].title;
    main = (
      <React.Fragment>
        <div>
          <MDXProvider components={props.components}>
            <MDXRenderer>
              {topicDocs[eventValue.toLowerCase()].body}
            </MDXRenderer>
          </MDXProvider>
        </div>
        {close}
      </React.Fragment>
    );
  }
  else {
    main = error
      ? (
        <div style={styles.errorWrapper}>
        <Blockquote type="warning">
          {error.message === "cannot scale this curve. Try reducing it first."
            ? (
              <React.Fragment>
                <div style={{float: "right"}}><Robot pose="fail" size={250}/></div>
                <h3><FormattedMessage id="app.ohNo" /></h3>
                <p>You just hit a known issue in an upstream library we use for Bezier curve offsets.
                We are aware of this problem, but it is all but trivial to fix. </p>
                <p>As this problem happens when we calculate a path offset, it is most commonly
                triggered when calculating the seam allowance. As such, disabling the seam allowance is
                often the best way to (try to) sidestep the problem.</p>
                <p>You can click below to disable the seam allowance (or do so in the pattern configuration,
                  or read more about this in the issue on GitHub.</p>
                <p style={{textAlign: "right", clear: "both", marginTop: "3rem"}}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.updateGist(0, "settings", "sa")}
                    style={{marginLeft: "1rem"}}
                  >
                    Disable seam allowance
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href="https://github.com/freesewing/freesewing.org/issues/19"
                    target="_BLANK"
                    style={{marginLeft: "1rem"}}
                  >
                    <Icon icon="github" style={{marginRight: "0.5rem"}}/>
                    Read more on GitHub
                  </Button>
                </p>

              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{float: "right"}}><Robot pose="fail" size={250}/></div>
                <h3><FormattedMessage id="app.ohNo" /></h3>
                <p><FormattedMessage id="errors.requestFailedWithStatusCode500" /></p>
                <p><b>{error.name}</b>: {error.message}</p>
                <p style={{textAlign: "right", clear: "both", marginTop: "3rem"}}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="https://github.com/freesewing/freesewing.org/issues/new"
                    target="_BLANK"
                  >
                    <Icon icon="github" style={{marginRight: "0.5rem"}}/>
                    <FormattedMessage id="app.reportThisOnGithub" />
                  </Button>
                </p>
                <h5>Stack trace</h5>
                <pre dangerouslySetInnerHTML={{__html: JSON.stringify(
                  error.stack.replace(/\n/g, "<br />"), null, 2
                  ).slice(1, -1)}} style={styles.error}/>
              </React.Fragment>
            )
          }
        </Blockquote>
        </div>
      )
      : [
        preButtons,
        <figure style={{textAlign: "center"}}><Draft {...patternProps} /></figure>,
        postButtons
      ]
  }

  const crumbJsx = <Breadcrumbs
    crumbs={crumbs}
    pageTitle={display === "help" ? helpTitle : pageTitle}
  />

  return (
    <React.Fragment>
      <div className="fs-sa">
        <section>
          <article style={display === "help" ? styles.narrow : styles.wide}>
            <div style={styles.narrow}>
              {crumbJsx}
              <h1>{display === "help" ? helpTitle : pageTitle}</h1>
            </div>
            {main}
            <div style={styles.narrow}>{crumbJsx}</div>
          </article>
        </section>
        { props.app.frontend.mobile ? null : (
        <aside style={{paddingTop: 0}}>
          <div className="sticky" style={{top: 0}}>
            {side}
          </div>
        </aside> )}
      </div>
      { props.app.frontend.mobile ? (
          <div className="menu">
            {side}
            {props.mobileIcons}
          </div>
        ) : null
      }
    </React.Fragment>
  );
}

export default withGist(DraftPage);
