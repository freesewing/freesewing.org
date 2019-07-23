import React, { useState, useEffect } from "react";
import Avatar from "../avatar";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import Breadcrumbs from "../breadcrumbs";
import { measurements as requiredMeasurements } from "@freesewing/pattern-info";
import Blockquote from "@freesewing/components/Blockquote";
import capitalize from "@freesewing/utils/capitalize";
import Button from "@material-ui/core/Button";

const SelectRecipeModelPage = props => {
  // FIXME: Translation
  const [recipe, setRecipe] = useState(false);
  useEffect(() => {
    console.log('using effect');
    let chunks = props.slug.split('/');
    if (chunks.length === 3 && chunks[1] === "recreate") {
      console.log('loading recipe', chunks[2]);
      props.app.backend.loadRecipe(chunks[2], handleResult);
    } else {
      console.log('not loading recipe', chunks[2]);
    }

  }, []);
  const handleResult = (result, data) => {
    if (result) {
      setRecipe(data);
    } else {
      // FIXME: Handle error
    }
  }
  const hasRequiredMeasurements = (measurements, required) => {
    for (let m of required) {
      if (
        Object.keys(measurements).indexOf(m) === -1
        || measurements[m] === null
      ) return false;
    }

    return true;
  }
  const checkModels = userModels => {
    let models = {
      ok: [],
      no: []
    }
    for (let i in userModels) {
      let model = userModels[i];
      if (typeof model.measurements === "undefined"
        || Object.keys(model.measurements).length < 1) models.no.push(model);
      else {
        if (hasRequiredMeasurements(model.measurements, requiredMeasurements[recipe.recipe.pattern])) models.ok.push(model);
        else models.no.push(model);
      }
    }

    return models;
  }
  if (recipe === false) return null;

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "start",
    },
    pattern: {
      margin: "0.5rem 0.5rem 0",
      width: "calc(25% - 1rem)",
      textAlign: "center",
    },
    name: {
      margin: 0,
      wordWrap: "anywhere",
    }
  }
  const pageTitle = <FormattedMessage id="app.newPattern" values={{pattern: props.pattern}} />
  const crumbs = [{slug: "/recreate", title: <FormattedMessage
      id="app.newPattern"
      values={{pattern: props.app.frontend.intl.formatMessage({id: "app.pattern"})}}
    />}];
  const models = recipe ? checkModels(props.app.models) : null;


  return (
    <React.Fragment>
      <Breadcrumbs crumbs={crumbs} pageTitle={pageTitle} />
      <h1><FormattedMessage id="app.recreate" /> {recipe.name}</h1>
      <h2 id="models"><FormattedMessage id="app.chooseAModel" /></h2>
      <div style={styles.wrapper}>
        {
          models.ok.map( model => {
            return (
              <div style={styles.pattern}>
                <Link to={"/recreate/"+props.recipe+"/for/"+model.handle} title={model.name}>
                <Avatar data={model} />
                <h5 style={styles.name}>{model.name}</h5>
                </Link>
              </div>
            )
          })
        }
      </div>
      <div style={styles.wrapper}>
        { (models.no.length > 0)
          ? (
            <Blockquote type="note" style={{width: "100%"}}>
              <h6>
                <FormattedMessage
                  id="app.countModelsLackingForPattern"
                  values={{
                    count: models.no.length,
                    pattern: capitalize(recipe.recipe.pattern)
                  }}
                />:
              </h6>
              <ul className="links">
                {
                  models.no.map( model => {
                    return (
                      <li key={model.handle}>
                        <Link to={"/models/"+model.handle} title={model.name}>
                          {model.name}
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>


            </Blockquote>
          ) : null
        }
      </div>
      <h2 id="replica">Use the recipe's model</h2>
      <Button href={"/recreate/"+props.recipe+"/replica"} variant="contained" color="primary">Create a replica</Button>
      <Breadcrumbs crumbs={crumbs} pageTitle={pageTitle} />
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </React.Fragment>
  );
}

export default SelectRecipeModelPage;
