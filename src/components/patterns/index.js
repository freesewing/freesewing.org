import React from 'react'
import PatternList from './pattern-list'
import PatternPage from './pattern-page'

const PatternIndex = props => {
  if (props.slug === '/patterns' || props.slug === '/patterns/') return <PatternList {...props} />
  return <PatternPage app={props.app} pattern={props.slug.split('/').pop()} />
}

export default PatternIndex
