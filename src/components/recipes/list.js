import React from "react";
import { Link } from "gatsby";
import NoRecipe from "../no-recipe";

const RecipeList = props => {
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "start",
    },
    recipe: {
      margin: "0.5rem 0.5rem 0",
      width: "calc(25% - 1rem)",
      textAlign: "center",
    },
    name: {
      margin: 0,
      wordWrap: "anywhere",
    }
  }
  if (props.app.frontend.tablet) styles.recipe.width = "calc(33% - 1rem)";
  if (props.app.frontend.mobile) styles.recipe.width = "calc(50% - 1rem)";

  return (
    <div style={styles.wrapper}>
      {(Object.keys(props.app.recipes).length > 0)
        ? (
          <ul className="links">
          {
            Object.keys(props.app.recipes).map((handle, recipe) => {
              return (
                <li>
                  <Link to={"/recipes/"+handle} title={props.app.recipes[handle].name}>
                    {props.app.recipes[handle].recipe
                      ? <span>{props.app.recipes[handle].recipe.pattern} / </span>
                      : ''
                    }
                    {props.app.recipes[handle].name}
                  </Link>
                </li>
              )
            })
          }
          </ul>
        )
        : <NoRecipe />
      }
    </div>
  );
}

export default RecipeList;
