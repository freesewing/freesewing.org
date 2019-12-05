import React from 'react'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
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

  const modelForRecipe = modelHandle => {
    return props.app.models[modelHandle]
  }

  return (
    <>
      <p style={{ textAlign: 'right' }}>
        <Button color="primary" href="/create" variant="contained">
          <FormattedMessage id="app.new_pattern" />
        </Button>
      </p>
      {Object.keys(props.app.recipes).length > 0 ? (
        Object.keys(props.app.recipes).map((handle, _recipe) => {
          const recipe = props.app.recipes[handle]

          return (
            <div key={handle} className="box">
              <Link to={'/recipes/' + handle} title={recipe.name}>
                <div style={styles.recipe}>
                  <div style={styles.linedrawing}>
                    <LineDrawing
                      pattern={recipe.recipe.pattern}
                      color={props.app.frontend.theme === 'dark' ? '#f8f9fa' : '#212529'}
                      size={props.app.frontend.mobile ? 92 : 164}
                    />
                  </div>
                  {recipe.recipe && (
                    <div>
                      <h6 style={styles.name}>
                        {capitalize(recipe.recipe.pattern)}:&nbsp;
                        {recipe.name}
                        <small> - {modelForRecipe(recipe.recipe.model).name}</small>
                      </h6>
                      <p style={styles.notes}>{recipe.notes}</p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          )
        })
      ) : (
        <NoRecipe />
      )}
    </>
  )
}

export default RecipeList
