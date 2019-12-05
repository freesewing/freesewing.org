import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import LoginRequired from '../login-required'
import RecipesList from './list'
import RecipePage from './show'
import EditRecipePage from './edit'

const RecipeIndex = props => {
  let ownRecipe = true
  const chunks = props.slug.split('/')
  const [loadedRecipe, setLoadedRecipe] = useState(false)

  useEffect(() => {
    if (props.slug === '/recipes') {
      props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({ id: 'app.my_patterns' }))
    } else {
      let recipesCrumb = { slug: '/recipes', title: <FormattedMessage id="app.my_patterns" /> }
      let recipe = chunks[2]
      if (ownRecipe) {
        props.app.frontend.setTitle(props.app.recipes[recipe].name)
        if (chunks.length === 3) {
          props.app.frontend.setCrumbs([recipesCrumb])
        } else if (chunks.length === 4) {
          props.app.frontend.setCrumbs([
            recipesCrumb,
            { slug: '/recipes/' + recipe, title: props.app.recipes[recipe].name }
          ])
        }
      } else {
        props.app.backend.loadRecipe(recipe, (result, data) => {
          if (result) setLoadedRecipe(data)
          props.app.frontend.setTitle(data.name)
          let recipesCrumb = { slug: '/recipes', title: <FormattedMessage id="app.my_patterns" /> }
          props.app.frontend.setCrumbs([recipesCrumb])
        })
      }
    }
  }, [props.slug])
  if (props.slug === '/recipes')
    return (
      <LoginRequired page={props.slug}>
        <RecipesList app={props.app} />
      </LoginRequired>
    )
  else {
    let recipe = chunks[2]
    if (chunks.length === 3) {
      if (typeof props.app.recipes[recipe] === 'undefined') ownRecipe = false
      return (
        <RecipePage
          recipe={ownRecipe ? props.app.recipes[recipe] : loadedRecipe}
          ownRecipe={ownRecipe}
          app={props.app}
        />
      )
    } else if (chunks.length === 4)
      return (
        <LoginRequired page={props.slug}>
          <EditRecipePage recipe={recipe} app={props.app} />
        </LoginRequired>
      )
  }
}

export default RecipeIndex
