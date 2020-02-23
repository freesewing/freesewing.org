import React from 'react'
import { Link } from 'gatsby'
import { getChildren, getSiblings, getParents } from '../utils'

const PreviousNext = ({slug, tree, titles}) => {
  const children = getChildren(slug, tree)
  const siblings = getSiblings(slug, tree)
  const parents = getParents(slug, tree)

  const findNextParent = childSlug => {
    let rents = Object.keys(getParents(childSlug, tree))
    if (rents.length < 2) return false
    let rent = childSlug.split('/').slice(0, -2).join('/')+'/'
    let pos = rents.indexOf(rent)
    if (pos+1 < rents.length) return rents[pos+1]
    else return findNextParent(rent)
  }

  const findNext = () => {
    if (Object.keys(children).length > 0) return Object.keys(children)[0]
    else {
      let sibs = Object.keys(siblings)
      let pos = sibs.indexOf(slug)
      if (pos+1 < sibs.length) return sibs[pos+1]
      else return findNextParent(slug)
    }
  }

  const findParent = childSlug => {
    let rents = Object.keys(getParents(childSlug, tree))
    if (rents.length < 1) return false
    return childSlug.split('/').slice(0, -2).join('/')+'/'
  }

  const findPrevious = () => {
    let sibs = Object.keys(siblings)
    let pos = sibs.indexOf(slug)
    if (pos > 0) return sibs[pos-1]
    else return findParent(slug)
  }

  // Previous/Next navigation
  const renderLink = side => {
    let to = (side === 'next')
      ? findNext()
      : findPrevious()

    if (!to) return <span>&nbsp;</span>

    return (
      <Link to={to} style={{ textAlign: side === 'prev' ? 'left' : 'right' }}>
        {side === 'prev' ? <span>&laquo;&nbsp;</span> : null}
        {titles[to]}
        {side === 'next' ? <span>&nbsp;&raquo;</span> : null}
      </Link>
    )
  }

  const styles = {
    wrapper: {
      margin: '3.33rem 0 6.66rem 0',
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      borderRadius: '4px',
      padding: '9px',
    }
  }
  return (
    <div style={styles.wrapper} className='shadow'>
      {renderLink('prev')}
      {renderLink('next')}
    </div>
  )
}

export default PreviousNext
