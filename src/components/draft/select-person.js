import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

import MissingAccount from '../missing/account'
import MissingPeople from '../missing/people'
import Avatar from '../avatar'

const SelectPerson = ({ app, design, people, recreate = false }) => {
  // Style
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
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
      display: 'inline-block'
    },
    bq: {
      maxWidth: '500px',
      margin: '0'
    }
  }
  if (app.tablet) styles.person.width = '150px'
  if (app.mobile) styles.person.width = '200px'

  let asIs = !recreate ? null : (
    <>
      <h2>
        <FormattedMessage id="app.cloneThing" values={{ thing: app.translate('app.pattern') }} />
      </h2>
      <Blockquote type="note" style={styles.bq}>
        <p>
          <FormattedMessage id="app.cloneDescription" />
        </p>
      </Blockquote>
      <p>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          href={`/recreate/${design}/from/${recreate}/for/original`}
        >
          <FormattedMessage id="app.cloneThing" values={{ thing: app.translate('app.pattern') }} />
        </Button>
      </p>
    </>
  )

  return (
    <>
      {asIs}
      <h2>
        <FormattedMessage id="app.madeToMeasure" />
      </h2>
      {!app.account.username && (
        <>
          <p>
            <Link to="/signup/">
              <FormattedMessage id="app.accountRequired" />
            </Link>
          </p>
        </>
      )}
      {people.ok.user.length > 0 ? (
        <div style={styles.wrapper}>
          {people.ok.user.map(person => {
            return (
              <div style={styles.person} key={person.handle}>
                <Link
                  data-test={person.handle}
                  to={
                    recreate
                      ? `/recreate/${design}/from/${recreate}/for/${person.handle}/`
                      : `/create/${design}/for/${person.handle}/`
                  }
                  title={person.name}
                >
                  <div style={styles.avatar}>
                    <Avatar data={person} />
                  </div>
                  <h5 style={styles.name}>{person.name}</h5>
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        app.account.username && people.no.user.length < 1 && <MissingPeople />
      )}
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
              {people.no.user.map(person => {
                return (
                  <li key={person.handle}>
                    <Link to={'/people/' + person.handle} title={person.name}>
                      {person.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Blockquote>
        </div>
      )}
      <h2>
        <FormattedMessage id="app.sizes" />
      </h2>
      {Object.keys(people.ok.withoutBreasts).length > 0 && (
        <h5>
          <FormattedMessage id="app.withoutBreasts" />
        </h5>
      )}
      <ul style={styles.sizes}>
        {Object.keys(people.ok.withoutBreasts).map(size => {
          return (
            <li key={'without-' + size} style={styles.li}>
              <Button
                style={styles.size}
                href={
                  recreate
                    ? `/recreate/${design}/from/${recreate}/for/size-${size}-without-breasts/`
                    : `/create/${design}/for/size-${size}-without-breasts/`
                }
                title={size}
                variant="outlined"
                color="primary"
                size="large"
              >
                {size}
              </Button>
            </li>
          )
        })}
      </ul>
      {Object.keys(people.ok.withBreasts).length > 0 && (
        <h5>
          <FormattedMessage id="app.withBreasts" />
        </h5>
      )}
      <ul style={styles.sizes}>
        {Object.keys(people.ok.withBreasts).map(size => {
          return (
            <li key={'with-' + size} style={styles.li}>
              <Button
                data-test={'size-' + size}
                style={styles.size}
                href={
                  recreate
                    ? `/recreate/${design}/from/${recreate}/for/size-${size}-with-breasts/`
                    : `/create/${design}/for/size-${size}-with-breasts/`
                }
                title={size}
                variant="outlined"
                color="primary"
                size="large"
              >
                {size}
              </Button>
            </li>
          )
        })}
      </ul>
      {!app.account.username && <MissingAccount />}
    </>
  )
}

export default SelectPerson
