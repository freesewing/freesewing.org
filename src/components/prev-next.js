import React from 'react'
import { Link } from 'gatsby'

const PreviousNext = ({ slug, app }) => {
  // Previous/Next navigation
  const renderLink = (side) => {
    let to = side === 'next' ? app.pages[slug].next : app.pages[slug].previous

    if (!to) return <span>&nbsp;</span>

    return (
      <Link to={to.slug} style={{ textAlign: side === 'prev' ? 'left' : 'right' }}>
        {side === 'prev' ? <span>&laquo;&nbsp;</span> : null}
        {to.title}
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
      padding: '9px'
    }
  }
  return (
    <div style={styles.wrapper} className="shadow">
      {renderLink('prev')}
      {renderLink('next')}
    </div>
  )
}

export default PreviousNext
