import React from 'react'
import { Link } from 'gatsby'

const DocsContext = ({ slug, siblings = {}, offspring = {}, up }) => {
  return (
    <ul>
      {Object.keys(siblings).map((sib) => (
        <li key={sib}>
          <h6>
            <Link to={sib} className={`${sib === slug ? 'active' : ''}`}>
              {siblings[sib]}
            </Link>
          </h6>
          {sib === slug && (
            <ul>
              {Object.keys(offspring).map((child) => (
                <li key={child}>
                  <Link to={child} className="level-2">
                    {offspring[child]}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default DocsContext
