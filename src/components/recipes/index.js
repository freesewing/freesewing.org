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
  if (props.slug === '/recipes') return (
    <LoginRequired page={props.slug}>
      <RecipesList app={props.app} />
    </LoginRequired>
  )
  else {
    let chunks = props.slug.split('/')
    const recipe = chunks[2]
    if (chunks.length === 3) {
      if (typeof props.app.recipes[recipe] === 'undefined') {
        return <p>FIXME: Load recipe from backend</p>;
      } else return  <RecipePage recipe={recipe} app={props.app} />
    } else if (chunks.length === 4) return (
      <LoginRequired page={props.slug}>
        <EditRecipePage recipe={recipe} app={props.app} />
      </LoginRequired>
    )
  }
}

export default RecipeIndex
