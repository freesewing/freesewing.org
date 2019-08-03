import React from 'react'
import { Link } from 'gatsby'

const PreviousNext = props => {
  // Previous/Next navigation
  const renderLink = side => {
    const slug = props.pageContext.slug
    let to = false
    let title = false
    let pos = props.pageContext.content.slugs.indexOf(slug)
    if (side === 'next') pos++
    else pos--
    if (props.pageContext.content.slugs[pos] !== 'undefined') {
      to = props.pageContext.content.slugs[pos]
      title = props.pageContext.content.titles[to]
    }
    if (!to) return <span>&nbsp;</span>

    return (
      <Link to={to} style={{ textAlign: side === 'prev' ? 'left' : 'right' }}>
        {side === 'prev' ? <span>&laquo;&nbsp;</span> : null}
        {title}
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
      background: props.theme === 'light' ? '#e7f5ff' : '#1864ab',
      border: props.theme === 'light' ? '1px solid #d0ebff' : '1px solid #1c7ed6',
      borderRadius: '4px',
      padding: '9px'
    }
  }
  return (
    <div style={styles.wrapper}>
      {renderLink('prev')}
      {renderLink('next')}
    </div>
  )
}

export default PreviousNext
