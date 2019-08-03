import React from 'react'
import TopicsToc from '../topics-toc'
import capitalize from '@freesewing/utils/capitalize'

const MainMenu = props => {
  let toc = null
  let slug = props.pageContext.slug
  if (props.uri) slug = props.uri
  if (typeof props.pageContext.node !== 'undefined') toc = props.pageContext.node.tableOfContents
  let topics = props.pageContext.topics
  let topicsToc = props.pageContext.topicsToc

  if (props.app.account.username) {
    if (topics.indexOf('models') === -1) topics.push('models')
    topicsToc.models = {
      title: props.app.frontend.intl.formatMessage({ id: 'app.models' }),
      children: {}
    }
    for (let m in props.app.models) {
      topicsToc.models.children['/models/' + m] = {
        title: props.app.models[m].name
      }
    }
    if (topics.indexOf('recipes') === -1) topics.push('recipes')
    topicsToc.recipes = {
      title: props.app.frontend.intl.formatMessage({ id: 'app.recipes' }),
      children: {}
    }
    if (typeof props.app.recipes !== 'undefined') {
      for (let r in props.app.recipes) {
        if (typeof props.app.recipes[r].recipe !== 'undefined') {
          topicsToc.recipes.children['/recipes/' + r] = {
            title:
              capitalize(props.app.recipes[r].recipe.pattern) + ': ' + props.app.recipes[r].name
          }
        }
      }
    }
  }
  return (
    <TopicsToc
      page={props.uri}
      slug={slug}
      topicsToc={topicsToc}
      topics={props.pageContext.topics}
      order={props.pageContext.topicsOrder}
      topic={slug.split('/')[1]}
      toc={toc}
      app={props.app}
    />
  )
}

export default MainMenu
