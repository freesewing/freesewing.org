import React from 'react'
import { Link } from 'gatsby'
import PrevIcon from '@material-ui/icons/KeyboardArrowLeft'
import NextIcon from '@material-ui/icons/KeyboardArrowRight'

const PreviousNext = ({ previous = false, next = false }) => (
  <div
    style={{
      margin: '3.33rem 0 6.66rem 0',
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      padding: '9px',
      borderTop: '1px solid #ccc',
      fontFamily: 'Roboto condensed'
    }}
  >
    {['prev', 'next'].map((side) => {
      if (side === 'prev' && !previous) return <PrevIcon key={`icon-${side}`} />
      if (side === 'next' && !next) return <NextIcon key={`icon-${side}`} />
      let { slug, title } = side === 'next' ? next : previous

      return (
        <Link key={side} to={slug} style={{ textAlign: side === 'prev' ? 'left' : 'right' }}>
          {side === 'prev' ? <PrevIcon style={{ marginBottom: '-6px' }} /> : null}
          {title}
          {side === 'next' ? <NextIcon style={{ marginBottom: '-6px' }} /> : null}
        </Link>
      )
    })}
  </div>
)

export default PreviousNext
