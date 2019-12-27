import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'

import Avatar from '../../../components/avatar'
import { FormattedMessage } from 'react-intl'
import { Link, navigate } from 'gatsby'
import { measurements as requiredMeasurements } from '@freesewing/pattern-info'
import Blockquote from '@freesewing/components/Blockquote'
import capitalize from '@freesewing/utils/capitalize'

const CreatePatternPage = props => {
  // Hooks
  const app = useApp()

  // Design is added to page context in gatsby-node
  const design = props.pageContext.design

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.chooseAModel'))
    app.setCrumbs([
      {
        slug: '/create',
        title: (
          <FormattedMessage
            id="app.newPattern"
            values={{ pattern: app.translate('app.pattern') }}
          />
        )
      },
      {
        slug: '/create',
        title: <FormattedMessage id="app.newPattern" values={{ pattern: capitalize(design) }} />
      }
    ])
  }, [])

  // There's no point without models
  if (typeof app.models === 'undefined' || Object.keys(app.models).length < 1) navigate('/models/')

  // Methods
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
        if (hasRequiredMeasurements(model.measurements, requiredMeasurements[design]))
          models.ok.push(model)
        else models.no.push(model)
      }
    }

    return models
  }

  // Style
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    model: {
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

  // Figure out what models have all required measurements
  const models = checkModels(app.models)

  // Keep track of whether we actuall have models that are ok
  let count = 0

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <div style={styles.wrapper}>
          {models.ok.map(model => {
            count++
            return (
              <div style={styles.model} key={model.handle}>
                <Link
                  to={`/create/${design}/for/${model.handle}/`}
                  title={model.name}
                  data-test={`model${count}`}
                >
                  <Avatar data={model} />
                  <h5 style={styles.name}>{model.name}</h5>
                </Link>
              </div>
            )
          })}
        </div>
        <div style={styles.wrapper}>
          {models.no.length > 0 ? (
            <Blockquote type="note" style={{ maxWidth: '800px' }}>
              <h6>
                <FormattedMessage
                  id="app.countModelsLackingForPattern"
                  values={{
                    count: models.no.length,
                    pattern: design
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
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternPage)
