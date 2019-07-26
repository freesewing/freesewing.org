import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Markdown from "react-markdown";
import RecipeCode from "../recipe";

const ShowRecipe = ({ app, recipe }) => {
  const styles = {
    button: {
      marginLeft: "1rem",
    },
    deleteButton: {
      marginLeft: "1rem",
      background: "#f03e3e",
      borderColor: "#c92a2a",
      color: "#fff",
    },
    draftButton: {
      marginLeft: "1rem",
      background: "#228be6",
      borderColor: "#1971c2",
      color: "#fff",
    },
  }

  if (app.frontend.mobile) {
    styles.table.margin = "0 -1.5rem";
    styles.table.width = "calc(100% + 3rem)";
  }

  return (
    <React.Fragment>
      { (typeof app.recipes[recipe].notes === "undefined" || app.recipes[recipe].notes === '')
        ? null
        : <Markdown source={app.recipes[recipe].notes || ''} />
      }
      <RecipeCode recipe={app.recipes[recipe].recipe} />
      <p style={{textAlign: "right"}}>
        <Button
          color="inherit"
          style={styles.deleteButton}
          variant="outlined"
          onClick={() => app.backend.removeRecipe(recipe)}
        >
          <FormattedMessage id="app.remove" />
        </Button>
        <Button
          color="primary"
          style={styles.draftButton}
          href={"/recreate/"+recipe}
          variant="contained"
        >
          <FormattedMessage id="app.recreate" />
        </Button>
        <Button
          color="primary"
          style={styles.button}
          href={"/recipes/"+recipe+"/edit"}
          variant="contained"
        >
          <FormattedMessage id="app.update" />
        </Button>
      </p>
    </React.Fragment>
  );
}

export default ShowRecipe;
