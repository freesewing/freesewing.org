import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import convertSize from '@freesewing/utils/convertSize'

const SelectSize = ({ app, design, people, recreate = false }) => {
  const context = []
  context.push(
    <h5>
      <FormattedMessage id="app.chooseASize" />
    </h5>
  )
  if (app.account.username && people.ok.user.length > 0) {
    context.push(
      <h6>
        <FormattedMessage id="app.madeToMeasure" />
      </h6>
    )
    context.push(
      <ul>
        {people.ok.user.map((person) => (
          <li key={person.handle}>
            <Link
              to={
                recreate
                  ? `/recreate/${design}/from/${recreate}/for/${person.handle}/`
                  : `/create/${design}/for/${person.handle}/`
              }
            >
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
  if (Object.keys(people.ok.withBreasts).length > 0) {
    context.push(
      <h6>
        <FormattedMessage id="app.withBreasts" />
      </h6>
    )
    context.push(
      <ul>
        {Object.keys(people.ok.withBreasts).map((size) => (
          <li key={size}>
            <Link
              to={
                recreate
                  ? `/recreate/${design}/from/${recreate}/for/size-${size}-b/`
                  : `/create/${design}/for/size-${size}-b/`
              }
            >
              {convertSize(size, true)}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
  if (Object.keys(people.ok.withoutBreasts).length > 0) {
    context.push(
      <h6>
        <FormattedMessage id="app.withoutBreasts" />
      </h6>
    )
    context.push(
      <ul>
        {Object.keys(people.ok.withoutBreasts).map((size) => (
          <li key={size}>
            <Link
              to={
                recreate
                  ? `/recreate/${design}/from/${recreate}/for/size-${size}-a/`
                  : `/create/${design}/for/size-${size}-a/`
              }
            >
              {convertSize(size, false)}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return context
}

export default SelectSize
