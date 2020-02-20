import React from 'react'
import useApp from '../hooks/useApp'
import useNavigation from '../hooks/useNavigation'
import { Link } from 'gatsby'

// FIXME: This only handles second-level and third-level docs pages for now

const ReadMore = props => {
  const app = useApp()
  const { tree, titles } = useNavigation(app)

  const getChildren = root => {
    let chunks = root.split('/')
    if (chunks[0] === '') chunks.splice(0,1)
    if (chunks[-1] === '') chunks.splice(-1,1)
    if (chunks.length === 2) return tree[`/`+chunks.join('/')+'/'].children
    if (chunks.length === 3) return tree[`/`+chunks.slice(0,2).join('/')+'/'].children['/'+chunks.join('/')+'/'].children

    return {}
  }

  let children = getChildren(props.root)


  return (
    <ul className='links'>
      {Object.keys(children).map( slug => (
        <li key={slug}>
          <Link to={slug}>{children[slug].title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ReadMore
