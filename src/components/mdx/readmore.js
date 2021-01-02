import React from 'react'
import { Link } from 'gatsby'
import './readmore.scss'

const renderLink = (to, title) => (
  <li key={to}>
    <Link to={to}>{title}</Link>
  </li>
)
const renderPages = (pages, className = '') => (
  <ul className={className}>{pages.map((p) => renderLink(p.slug, p.title))}</ul>
)

const ReadMore = ({ pages = [], title = 'Further reading', list = false }) =>
  pages ? (
    list ? (
      renderPages(pages, 'links')
    ) : (
      <div className="readmore">
        <h6>{title}</h6>
        {renderPages(pages)}
      </div>
    )
  ) : null

export default ReadMore
