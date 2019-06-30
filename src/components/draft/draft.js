import React, { useEffect, useState } from "react";
import Breadcrumbs from "../breadcrumbs";
import { FormattedMessage } from "react-intl";
import { capitalize } from "@freesewing/utils";
import DraftConfigurator from "@freesewing/components/DraftConfigurator";
import withGist from "@freesewing/components/withGist";
import * as patterns from "@freesewing/patterns";
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

const DraftPage = props => {
  const [tab, setTab] = useState(0);
  const [display, setDisplay] = useState('draft');
  const [fit, setFit] = useState("false");
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

  const toggleTab = () => {
    if(tab === 1) setTab(0);
    else setTab(1);
  }

  let pattern, error, patternProps;
  try {
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
      slug: "/draft",
      title: <FormattedMessage
        id="app.draftPattern"
        values={{pattern: props.app.frontend.intl.formatMessage({id: "app.pattern"})}}
      />
    },
    {
      slug: "/draft/"+props.pattern,
      title: <FormattedMessage
        id="app.draftPattern"
        values={{pattern: capitalize(props.pattern)}}
      />
    }
  ];
  const pageTitle = <FormattedMessage id="app.draftPatternForModel"
    values={{pattern: capitalize(props.pattern), model: props.app.models[props.model].name}} />
  const styles = {
    narrow: {
      maxWidth: '62em',
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
        />);
  else side.push(<div style={{paddingTop: "1rem"}} onClick={props.app.frontend.closeNav}>{[props.mainMenu, props.userMenu]}</div>);

  if (fit && patternProps) patternProps.style = {
    maxHeight: "85vh"
  }

  let main;
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
  else {
    main = error
      ? <p>Shit</p>
      : [
        preButtons,
        <figure style={{textAlign: "center"}}><Draft {...patternProps} /></figure>,
        postButtons
      ]
  }

  return (
    <React.Fragment>
      <div className="fs-sa">
        <section>
          <article style={styles.wide}>
            <div style={styles.narrow}>
              <Breadcrumbs crumbs={crumbs} pageTitle={pageTitle} />
              <h1>{pageTitle}</h1>
            </div>
            {main}
            <div style={styles.narrow}>
              <Breadcrumbs crumbs={crumbs} pageTitle={pageTitle} />
            </div>
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
