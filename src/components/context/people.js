import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'

const PeopleContext = ({ app }) => [
  <h5>
    <FormattedMessage id="app.people" />
  </h5>,
  <ul>
    {Object.keys(app.people).map((handle) => (
      <li key={handle}>
        <Link to={`/people/${handle}/`}>{app.people[handle].name}</Link>
      </li>
    ))}
  </ul>
]

export default PeopleContext
