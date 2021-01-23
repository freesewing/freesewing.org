import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

import MissingAccount from '../missing/account'
import MissingPeople from '../missing/people'
import Person from '../person'
import '../person.scss'
import Size from '../size'
import '../size.scss'

const SelectSize = ({ app, design, people, recreate = false }) => {
  // Style
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    person: {
      maxWidth: '300px',
      margin: '0.5rem',
      textAlign: 'center'
    },
    name: {
      margin: 0,
      wordWrap: 'anywhere'
    },
    sizes: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    li: {
      display: 'inline'
    },
    size: {
      margin: '0 0.5rem 0.5rem 0',
      display: 'inline-block',
      textAlign: 'center'
    },
    bq: {
      maxWidth: '500px',
      margin: '0'
    }
  }
  if (app.tablet) styles.person.width = '150px'
  if (app.mobile) styles.person.width = '200px'

  return (
    <>
      {app.account.username && (
        <>
          {people.ok.user.length > 0 ? (
            <div style={styles.wrapper}>
              {people.ok.user.map((person) => (
                <Person
                  key={person.handle}
                  data={person}
                  translate={app.translate}
                  link={
                    recreate
                      ? `/recreate/${design}/from/${recreate}/for/${person.handle}/`
                      : `/create/${design}/for/${person.handle}/`
                  }
                />
              ))}
            </div>
          ) : (
            people.no.user.length < 1 && <MissingPeople />
          )}
        </>
      )}
      <div style={styles.wrapper}>
        {Object.keys(people.ok.withBreasts).map((size) => (
          <Size
            key={size}
            breasts={true}
            size={size}
            translate={app.translate}
            link={
              recreate
                ? `/recreate/${design}/from/${recreate}/for/size-${size}-b/`
                : `/create/${design}/for/size-${size}-b/`
            }
          />
        ))}
        {Object.keys(people.ok.withoutBreasts).map((size) => (
          <Size
            key={size}
            breasts={false}
            size={size}
            translate={app.translate}
            link={
              recreate
                ? `/recreate/${design}/from/${recreate}/for/size-${size}-a/`
                : `/create/${design}/for/size-${size}-a/`
            }
          />
        ))}
      </div>
      {people.no.user.length > 0 && (
        <div style={styles.wrapper}>
          <Blockquote type="note" style={{ maxWidth: '800px' }}>
            <h6>
              <FormattedMessage
                id="app.countModelsLackingForPattern"
                values={{
                  count: people.no.user.length,
                  pattern: design
                }}
              />
              :
            </h6>
            <ul className="links">
              {people.no.user.map((person) => {
                return (
                  <li key={person.handle}>
                    <Link to={'/account/people/' + person.handle} title={person.name}>
                      {person.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Blockquote>
        </div>
      )}
      {!app.account.username && <MissingAccount app={app} />}
    </>
  )
}

export default SelectSize
