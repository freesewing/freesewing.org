import React from 'react'
import Navigation from './navigation'
import capitalize from '@freesewing/utils/capitalize'

const MainMenu = props => {
  let navigation = props.pageContext.navigation
  let toc = null
  let slug = props.pageContext.slug
  if (typeof props.pageContext.node !== 'undefined') toc = props.pageContext.node.tableOfContents
  let topics = ['docs', 'showcase', 'blog']
  if (props.uri) slug = props.uri

  if (props.app.account.username) {
    if (topics.indexOf('models') === -1) topics.push('models')
    navigation.models = {
      title: props.app.frontend.intl.formatMessage({ id: 'app.models' }),
      children: {}
    }
    for (let m in props.app.models) {
      navigation.models.children['/models/' + m] = {
        title: props.app.models[m].name
      }
    }
    if (topics.indexOf('recipes') === -1) topics.push('recipes')
    navigation.recipes = {
      title: props.app.frontend.intl.formatMessage({ id: 'app.recipes' }),
      children: {}
    }
    if (typeof props.app.recipes !== 'undefined') {
      for (let r in props.app.recipes) {
        if (typeof props.app.recipes[r].recipe !== 'undefined') {
          let pattern = props.app.recipes[r].recipe.pattern || 'FIXME';
          navigation.recipes.children['/recipes/' + r] = {
            title:
              capitalize(pattern) + ': ' + props.app.recipes[r].name
          }
        }
      }
    }
  }
  return (
    <Navigation
      page={props.uri}
      topics={topics}
      slug={slug}
      navigation={navigation}
      toc={toc}
      app={props.app}
    />
  )
}

export default MainMenu
