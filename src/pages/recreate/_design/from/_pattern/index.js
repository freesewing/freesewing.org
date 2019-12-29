import React, { useEffect } from 'react'
import useApp from '../../../../../hooks/useApp'
import usePattern from '../../../../../hooks/usePattern'
import withLanguage from '../../../../../components/withLanguage'
import AppWrapper from '../../../../../components/app/wrapper'
import WideLayout from '../../../../../components/layouts/wide'

import Avatar from '../../../../../components/avatar'
import { FormattedMessage } from 'react-intl'
import { Link, navigate } from 'gatsby'
import { measurements as requiredMeasurements } from '@freesewing/pattern-info'
import Blockquote from '@freesewing/components/Blockquote'
import capitalize from '@freesewing/utils/capitalize'

const RecreatePatternPage = props => {
  // Hooks
  const app = useApp(props)
  const pattern = usePattern(app, props.pattern)

  if (!pattern) return null // FIXME: Show something better than nothing in SSR

  // What design ?
  const design = pattern.data.design

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.recreate') + ' ' + pattern.name)
    app.setCrumbs([
      {
        slug: '/create',
        title: (
          <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
        )
      },
      {
        slug: '/create',
        title: app.translate('app.recreate') + ' ' + capitalize(design)
      }
    ])
  }, [])

  // There's no point without people
  if (typeof app.people === 'undefined' || Object.keys(app.people).length < 1) navigate('/people/')

  // Methods
  const hasRequiredMeasurements = (measurements, required) => {
    for (let m of required) {
      if (Object.keys(measurements).indexOf(m) === -1 || measurements[m] === null) return false
    }

    return true
  }

  // FIXME: This is no longer required with the usePeople hook
  const checkPeople = userPeople => {
    let people = {
      ok: [],
      no: []
    }
    for (let i in userPeople) {
      let person = userPeople[i]
      if (typeof person.measurements === 'undefined' || Object.keys(person.measurements).length < 1)
        people.no.push(person)
      else {
        if (hasRequiredMeasurements(person.measurements, requiredMeasurements[design]))
          people.ok.push(person)
        else people.no.push(person)
      }
    }

    return people
  }

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
    }
  }
  if (app.tablet) styles.pattern.width = '150px'
  if (app.mobile) styles.pattern.width = '200px'

  // Figure out what people have all required measurements
  const people = checkPeople(app.people)

  // Keep track of whether we actually have models that are ok
  let count = 0

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <div style={styles.wrapper}>
          {people.ok.map(person => {
            count++
            return (
              <div style={styles.person} key={person.handle}>
                <Link
                  to={`/recreate/${design}/from/${props.pattern}/for/${person.handle}/`}
                  title={person.name}
                  data-test={`person${count}`}
                >
                  <Avatar data={person} />
                  <h5 style={styles.name}>{person.name}</h5>
                </Link>
              </div>
            )
          })}
        </div>
        <div style={styles.wrapper}>
          {people.no.length > 0 ? (
            <Blockquote type="note" style={{ maxWidth: '800px' }}>
              <h6>
                <FormattedMessage
                  id="app.countModelsLackingForPattern"
                  values={{
                    count: people.no.length,
                    pattern: capitalize(design)
                  }}
                />
                :
              </h6>
              <ul className="links">
                {people.no.map(person => {
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
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(RecreatePatternPage)
