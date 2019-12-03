import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import capitalize from '@freesewing/utils/capitalize'
import Markdown from 'react-markdown'
import RecipeCode from './recipe'
import ExportPattern from '../draft/export-pattern'
import patterns from '../draft/patterns'

const ShowRecipe = props => {
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
  if (props.ownRecipe)
    styles.draftButton = {
      marginLeft: '1rem',
      background: '#228be6',
      borderColor: '#1971c2',
      color: '#fff'
    }

  if (props.app.frontend.mobile) {
    styles.table.margin = '0 -1.5rem'
    styles.table.width = 'calc(100% + 3rem)'
  }

  return (
    <>
      {typeof props.recipe.notes === 'undefined' || props.recipe.notes === '' ? null : (
        <Markdown source={props.recipe.notes || ''} />
      )}

      <p style={{ textAlign: 'right' }}>
        {props.ownRecipe ? (
          <Button
            color="inherit"
            style={styles.deleteButton}
            variant="outlined"
            onClick={() => props.app.backend.removeRecipe(props.recipe.handle)}
          >
            <FormattedMessage id="app.remove" />
          </Button>
        ) : null}
        <Button
          color="primary"
          style={styles.draftButton}
          href={'/recreate/' + props.recipe.handle}
          variant="contained"
        >
          <FormattedMessage id="app.recreate" />
        </Button>
        {props.ownRecipe ? (
          <Button
            color="primary"
            style={styles.button}
            href={'/recipes/' + props.recipe.handle + '/edit'}
            variant="contained"
          >
            <FormattedMessage id="app.update" />
          </Button>
        ) : null}
      </p>

      <ExportPattern
        app={props.app}
        gist={props.recipe.recipe}
        pattern={patterns[capitalize(props.recipe.recipe.pattern)]}
      />

      <RecipeCode recipe={props.recipe} />
    </>
  )
}

export default ShowRecipe
