import React from 'react'
import { Link } from 'gatsby'
import NoRecipe from '../no-recipe'
import capitalize from "@freesewing/utils/capitalize";

const RecipeList = props => {
  const styles = {
    recipe: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    name: {
      wordWrap: 'anywhere',
      margin: 0,
      padding: 0
    },
    notes: {
      wordWrap: 'anywhere',
      margin: 0,
      padding: 0
    },
    img: {
      maxHeight: "64px",
      maxWidth: "64px",
      padding: "8px 16px",
    }
  }
  if (props.app.frontend.tablet) styles.recipe.width = 'calc(33% - 1rem)'
  if (props.app.frontend.mobile) styles.recipe.width = 'calc(50% - 1rem)'

  return (
    <React.Fragment>
      {Object.keys(props.app.recipes).length > 0
        ? Object.keys(props.app.recipes).map((handle, recipe) => {
            return (
              <div key={handle} className="box">
                <Link to={'/recipes/' + handle} title={props.app.recipes[handle].name}>
                  <div style={styles.recipe}>
                    <div>
                      {props.app.recipes[handle].pattern}
                      <img
                        src={'/patterns/' + props.app.recipes[handle].recipe.pattern + '.jpg'}
                        alt={props.app.recipes[handle].recipe.pattern}
                        style={styles.img}
                      />
                    </div>
                      {props.app.recipes[handle].recipe ? (
                        <div>
                        <h6 styles={styles.name}>
                          {capitalize(props.app.recipes[handle].recipe.pattern)}:&nbsp;
                          {props.app.recipes[handle].name}
                        </h6>
                        <p style={styles.notes}>{props.app.recipes[handle].notes}</p>
                        </div>
                      ) : null
                      }
                  </div>
                </Link>
              </div>
            )
          })
       : <NoRecipe />
      }
    </React.Fragment>
  )
}

export default RecipeList
