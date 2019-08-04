import React, { useEffect } from 'react'
import Avatar from '../avatar'
import { FormattedMessage } from 'react-intl'
import { Link, navigate } from 'gatsby'
import { measurements as requiredMeasurements } from '@freesewing/pattern-info'
import Blockquote from '@freesewing/components/Blockquote'
import capitalize from '@freesewing/utils/capitalize'

const SelectPatternPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="app.chooseAModel" />)
    props.app.frontend.setCrumbs([
      {
        slug: '/create',
        title: (
          <FormattedMessage
            id="app.newPattern"
            values={{ pattern: props.app.frontend.intl.formatMessage({ id: 'app.pattern' }) }}
          />
        )
      },
      {
        slug: '/create',
        title: (
          <FormattedMessage id="app.newPattern" values={{ pattern: capitalize(props.pattern) }} />
        )
      }
    ])
  }, [])
  // There's no point without models
  if (typeof props.app.models === 'undefined' || Object.keys(props.app.models).length < 1)
    navigate('/models')

  const hasRequiredMeasurements = (measurements, required) => {
    for (let m of required) {
      if (Object.keys(measurements).indexOf(m) === -1 || measurements[m] === null) return false
    }

    return true
  }

  const checkModels = userModels => {
    let models = {
      ok: [],
      no: []
    }
    for (let i in userModels) {
      let model = userModels[i]
      if (typeof model.measurements === 'undefined' || Object.keys(model.measurements).length < 1)
        models.no.push(model)
      else {
        if (hasRequiredMeasurements(model.measurements, requiredMeasurements[props.pattern]))
          models.ok.push(model)
        else models.no.push(model)
      }
    }

    return models
  }

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'start'
    },
    pattern: {
      margin: '0.5rem 0.5rem 0',
      width: 'calc(25% - 1rem)',
      textAlign: 'center'
    },
    name: {
      margin: 0,
      wordWrap: 'anywhere'
    }
  }
  if (props.app.frontend.tablet) styles.pattern.width = 'calc(33% - 1rem)'
  if (props.app.frontend.mobile) styles.pattern.width = 'calc(50% - 1rem)'
  const models = checkModels(props.app.models)

  return (
    <React.Fragment>
      <div style={styles.wrapper}>
        {models.ok.map(model => {
          return (
            <div style={styles.pattern} key={model.handle}>
              <Link to={'/create/' + props.pattern + '/for/' + model.handle} title={model.name}>
                <Avatar data={model} />
                <h5 style={styles.name}>{model.name}</h5>
              </Link>
            </div>
          )
        })}
      </div>
      <div style={styles.wrapper}>
        {models.no.length > 0 ? (
          <Blockquote type="note" style={{ width: '100%' }}>
            <h6>
              <FormattedMessage
                id="app.countModelsLackingForPattern"
                values={{
                  count: models.no.length,
                  pattern: props.pattern
                }}
              />
              :
            </h6>
            <ul className="links">
              {models.no.map(model => {
                return (
                  <li key={model.handle}>
                    <Link to={'/models/' + model.handle} title={model.name}>
                      {model.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Blockquote>
        ) : null}
      </div>
    </React.Fragment>
  )
}

export default SelectPatternPage
