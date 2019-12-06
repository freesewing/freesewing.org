import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import capitalize from '@freesewing/utils/capitalize'
import Markdown from 'react-markdown'
import RecipeCode from './recipe'
import ExportPattern from '../draft/export-pattern'
import patterns from '../draft/patterns'

const ShowRecipe = props => {
  const { recipe, ownRecipe, app } = props

  const styles = {
    button: {
      marginLeft: '1rem'
    },
    deleteButton: {
      marginLeft: '1rem',
      background: '#f03e3e',
      borderColor: '#c92a2a',
      color: '#fff'
    }
  }
  if (ownRecipe)
    styles.draftButton = {
      marginLeft: '1rem',
      background: '#228be6',
      borderColor: '#1971c2',
      color: '#fff'
    }

  if (app.frontend.mobile) {
    styles.table.margin = '0 -1.5rem'
    styles.table.width = 'calc(100% + 3rem)'
  }

  const model = app.models[recipe.recipe.model]

  return (
    <>
      <h4>
        <FormattedMessage id="app.model" />: {model.name}
      </h4>
      {recipe.notes && <Markdown source={recipe.notes} />}

      <p style={{ textAlign: 'right' }}>
        {ownRecipe && (
          <Button
            color="inherit"
            style={styles.deleteButton}
            variant="outlined"
            onClick={() => app.backend.removeRecipe(recipe.handle)}
          >
            <FormattedMessage id="app.remove" />
          </Button>
        )}
        <Button
          color="primary"
          style={styles.draftButton}
          href={'/recreate/' + recipe.handle}
          variant="contained"
        >
          <FormattedMessage id="app.duplicate" />
        </Button>
        {/* {ownRecipe && (
          <Button
            color="primary"
            style={styles.button}
            href={'/recipes/' + recipe.handle + '/edit'}
            variant="contained"
          >
            <FormattedMessage id="app.edit_pattern" />
          </Button>
        )} */}
        {ownRecipe && (
          <Button
            color="primary"
            style={styles.button}
            href={'/recipes/' + recipe.handle + '/edit'}
            variant="contained"
          >
            <FormattedMessage id="app.editNotes" />
          </Button>
        )}
      </p>

      <ExportPattern
        app={app}
        gist={recipe.recipe}
        pattern={patterns[capitalize(recipe.recipe.pattern)]}
      />

      <RecipeCode recipe={recipe} />
    </>
  )
}

export default ShowRecipe
