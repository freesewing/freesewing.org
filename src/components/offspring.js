import React from 'react'
import { Link } from 'gatsby'

const Offspring = ({ app, slug = '/docs', inline = false }) => (
  <ul className={inline ? 'inline' : 'links'}>
    {app.getOffspring(slug).map((page) => (
      <li key={page.slug}>
        <Link to={page.slug}>{page.title}</Link>
      </li>
    ))}
  </ul>
)

export default Offspring
