import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'

import usePeople from '../../../hooks/usePeople'
import Avatar from '../../../components/avatar'
import { FormattedMessage } from 'react-intl'
import { Link, navigate } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import capitalize from '@freesewing/utils/capitalize'
import Button from '@material-ui/core/Button'
import MissingAccount from '../../../components/missing/account'
import MissingPeople from '../../../components/missing/people'

const CreatePatternPage = props => {
  // Hooks
  const app = useApp()
  const people = usePeople(app, props.pageContext.design)

  // Design is added to page context in gatsby-node
  const design = props.pageContext.design

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.chooseAPerson'))
    app.setCrumbs([
      {
        slug: '/create/',
        title: (
          <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
        )
      },
      {
        slug: '/create/',
        title: <FormattedMessage id="app.newThing" values={{ thing: capitalize(design) }} />
      }
    ])
  }, [])

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
      listStyleType: 'none',
      margin: 0,
      padding: 0
    },
    size: {
      marginRight: '0.5rem'
    }
  }

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <h3>
          <FormattedMessage id="app.madeToMeasure" />
        </h3>
        {app.account.username ? null : (
          <>
            <p>
              <FormattedMessage id="app.accountRequired" />
            </p>
            <MissingAccount />
          </>
        )}
        {people.ok.user.length > 0 ? (
          <div style={styles.wrapper}>
            {people.ok.user.map(person => {
              return (
                <div style={styles.person} key={person.handle}>
                  <Link to={`/create/${design}/for/${person.handle}/`} title={person.name}>
                    <Avatar data={person} />
                    <h5 style={styles.name}>{person.name}</h5>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <MissingPeople />
        )}
        {people.no.user.length > 0 && (
          <div style={styles.wrapper}>
            {people.no.user.length > 0 ? (
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
            ) : null}
          </div>
        )}
        <h3>
          <FormattedMessage id="app.sizes" />
        </h3>
        <h5>
          <FormattedMessage id="app.withoutBreasts" />
        </h5>
        <ul style={styles.sizes}>
          {Object.keys(people.ok.withoutBreasts).map(size => {
            let m = people.ok.withoutBreasts[size]
            return (
              <Button
                style={styles.size}
                href={`/create/${design}/for/size-${size}-without-breasts/`}
                title={size}
                variant="outlined"
                color="primary"
                size="large"
              >
                {size}
              </Button>
            )
          })}
        </ul>
        <h5>
          <FormattedMessage id="app.withBreasts" />
        </h5>
        <ul style={styles.sizes}>
          {Object.keys(people.ok.withBreasts).map(size => {
            let m = people.ok.withBreasts[size]
            return (
              <Button
                style={styles.size}
                href={`/create/${design}/for/size-${size}-with-breasts/`}
                title={size}
                variant="outlined"
                color="primary"
                size="large"
              >
                {size}
              </Button>
            )
          })}
        </ul>
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternPage)
