import React from 'react'
import { Link } from 'gatsby'
import NoRecipe from '../no-recipe'
import capitalize from '@freesewing/utils/capitalize'
import LineDrawing from '@freesewing/components/LineDrawing'

const RecipeList = props => {
  const styles = {
    recipe: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
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
    linedrawing: {
      marginRight: '1rem'
    }
  }

  return (
    <React.Fragment>
      {Object.keys(props.app.recipes).length > 0 ? (
        Object.keys(props.app.recipes).map((handle, recipe) => {
          return (
            <div key={handle} className="box">
              <Link to={'/recipes/' + handle} title={props.app.recipes[handle].name}>
                <div style={styles.recipe}>
                  <div style={styles.linedrawing}>
                    <LineDrawing
                      pattern={props.app.recipes[handle].recipe.pattern}
                      color={props.app.frontend.theme === 'dark' ? '#f8f9fa' : '#212529'}
                      size={props.app.frontend.mobile ? 92 : 164}
                    />
                  </div>
                  {props.app.recipes[handle].recipe ? (
                    <div>
                      <h6 style={styles.name}>
                        {capitalize(props.app.recipes[handle].recipe.pattern)}:&nbsp;
                        {props.app.recipes[handle].name}
                      </h6>
                      <p style={styles.notes}>{props.app.recipes[handle].notes}</p>
                    </div>
                  ) : null}
                </div>
              </Link>
            </div>
          )
        })
      ) : (
        <NoRecipe />
      )}
    </React.Fragment>
  )
}

export default RecipeList
