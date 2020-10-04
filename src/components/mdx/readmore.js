import React from 'react'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import './readmore.scss'

const ReadMore = ({ offspring = false }) =>
  offspring ? (
    <div className="readmore">
      <h6>
        <FormattedMessage id="app.furtherReading" />
      </h6>
      <ul>
        {Object.keys(offspring).map((slug) => (
          <li key={slug}>
            <Link to={slug}>{offspring[slug]}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null

export default ReadMore
