import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'

import useModels from '../../../hooks/useModels'
import Avatar from '../../../components/avatar'
import { FormattedMessage } from 'react-intl'
import { Link, navigate } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import capitalize from '@freesewing/utils/capitalize'
import Button from '@material-ui/core/Button'
import MissingAccount from '../../../components/missing/account'
import MissingModels from '../../../components/missing/models'

const CreatePatternPage = props => {
  // Hooks
  const app = useApp()
  const models = useModels(app, props.pageContext.design)

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

  console.log(models)

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
  if (app.tablet) styles.pattern.width = '150px'
  if (app.mobile) styles.pattern.width = '200px'

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
        {models.ok.user.length > 0 ? (
          <div style={styles.wrapper}>
            {models.ok.user.map(model => {
              return (
                <div style={styles.model} key={model.handle}>
                  <Link to={`/create/${design}/for/${model.handle}/`} title={model.name}>
                    <Avatar data={model} />
                    <h5 style={styles.name}>{model.name}</h5>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <MissingModels />
        )}
        {models.no.user.length > 0 && (
          <div style={styles.wrapper}>
            {models.no.user.length > 0 ? (
              <Blockquote type="note" style={{ maxWidth: '800px' }}>
                <h6>
                  <FormattedMessage
                    id="app.countModelsLackingForPattern"
                    values={{
                      count: models.no.user.length,
                      pattern: design
                    }}
                  />
                  :
                </h6>
                <ul className="links">
                  {models.no.user.map(model => {
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
        )}
        <h3>
          <FormattedMessage id="app.sizes" />
        </h3>
        <h5>
          <FormattedMessage id="app.withoutBreasts" />
        </h5>
        <ul style={styles.sizes}>
          {Object.keys(models.ok.withoutBreasts).map(size => {
            let m = models.ok.withoutBreasts[size]
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
          {Object.keys(models.ok.withBreasts).map(size => {
            let m = models.ok.withBreasts[size]
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
