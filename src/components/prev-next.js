import React from 'react'
import { Link } from 'gatsby'
import PrevIcon from '@material-ui/icons/KeyboardArrowLeft'
import NextIcon from '@material-ui/icons/KeyboardArrowRight'

const PrevNext = ({ prev = false, next = false }) =>
  prev || next ? (
    <div className="prev-next">
      {['prev', 'next'].map((side) => {
        if (side === 'prev' && !prev)
          return <PrevIcon key={`icon-${side}`} style={{ maxWidth: '32px' }} />
        if (side === 'next' && !next)
          return <NextIcon key={`icon-${side}`} style={{ maxWidth: '32px' }} />
        let { slug, title } = side === 'next' ? next : prev

        return (
          <Link key={side} to={slug} style={{ textAlign: side === 'prev' ? 'left' : 'right' }}>
            {side === 'prev' ? (
              <PrevIcon style={{ marginBottom: '-6px', maxWidth: '32px' }} />
            ) : null}
            <b>{title}</b>
            {side === 'next' ? (
              <NextIcon style={{ marginBottom: '-6px', maxWidth: '32px' }} />
            ) : null}
          </Link>
        )
      })}
    </div>
  ) : null

export default PrevNext
