import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Avatar from '../avatar'
import { Link } from 'gatsby'
import NoModel from '../no-model'

const ModelList = props => {
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'start'
    },
    model: {
      margin: '0.5rem 0.5rem 0',
      width: 'calc(25% - 1rem)',
      textAlign: 'center'
    },
    name: {
      margin: 0,
      wordWrap: 'anywhere'
    }
  }
  if (props.app.frontend.tablet) styles.model.width = 'calc(33% - 1rem)'
  if (props.app.frontend.mobile) styles.model.width = 'calc(50% - 1rem)'

  return (
    <React.Fragment>
      <div style={styles.wrapper}>
        {Object.keys(props.app.models).length > 0 ? (
          Object.keys(props.app.models).map((handle, model) => {
            return (
              <div style={styles.model}>
                <Link to={'/models/' + handle} title={props.app.models[handle].name}>
                  <Avatar variant="model" data={props.app.models[handle]} />
                  <h5 style={styles.name}>{props.app.models[handle].name}</h5>
                </Link>
              </div>
            )
          })
        ) : (
          <NoModel />
        )}
      </div>
      <p style={{ textAlign: 'right' }}>
        <Button size="large" variant="contained" color="primary" href="/model">
          <FormattedMessage id="app.newModel" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default ModelList
