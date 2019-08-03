import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import LoginRequired from '../login-required'
import RecipesList from './list'
import RecipePage from './show'
import EditRecipePage from './edit'

const RecipeIndex = props => {
  useEffect(() => {
    if (props.slug === '/recipes') {
      props.app.frontend.setTitle(<FormattedMessage id="app.recipes" />)
    } else {
      let recipesCrumb = { slug: '/recipes', title: <FormattedMessage id="app.recipes" /> }
      let chunks = props.slug.split('/')
      let recipe = chunks[2]
      props.app.frontend.setTitle(props.app.recipes[recipe].name)
      if (chunks.length === 3) {
        props.app.frontend.setCrumbs([recipesCrumb])
      } else if (chunks.length === 4) {
        props.app.frontend.setCrumbs([
          recipesCrumb,
          { slug: '/recipes/' + recipe, title: props.app.recipes[recipe].name }
        ])
      }
    }
  }, [props.slug])

  let main
  if (props.slug === '/recipes') main = <RecipesList app={props.app} />
  else {
    let chunks = props.slug.split('/')
    if (chunks.length === 3) main = <RecipePage recipe={chunks[2]} app={props.app} />
    else if (chunks.length === 4) main = <EditRecipePage recipe={chunks[2]} app={props.app} />
  }

  return <LoginRequired page={props.slug}>{main}</LoginRequired>
}

export default RecipeIndex
