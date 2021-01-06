import React from 'react'
import { Link } from 'gatsby'
import './readmore.scss'

const renderLink = (page, className, recurse) => (
  <li key={page.slug}>
    <Link to={page.slug}>{page.title}</Link>
    {recurse && page.offspring && (
      <ul className={className}>
        {Object.keys(page.offspring).map((slug) =>
          renderLink(page.offspring[slug], className, recurse)
        )}
      </ul>
    )}
  </li>
)
const renderPages = (pages, className = '', recurse = false) => (
  <ul className={className}>{pages.map((p) => renderLink(p, className, recurse))}</ul>
)

const ReadMore = ({ pages = [], title = 'Further reading', list = false, recurse = false }) =>
  pages ? (
    list ? (
      renderPages(pages, 'links', recurse)
    ) : (
      <div className="readmore">
        <h6>{title}</h6>
        {renderPages(pages, '', recurse)}
      </div>
    )
  ) : null

export default ReadMore
