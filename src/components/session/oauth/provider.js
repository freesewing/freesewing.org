import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@freesewing/components/Icon'
import { FormattedMessage } from 'react-intl'

const OauthProvider = (props) => {
  let styles = {
    button: {
      width: props.app.mobile ? '100%' : '48%',
      marginBottom: '1rem'
    },
    icon: {
      marginRight: '1rem'
    },
    label: {
      maxWidth: '16ch',
      textAlign: 'left'
    }
  }

  if (props.list)
    return (
      <li>
        <a href="#" role="button" onClick={props.signup}>
          <FormattedMessage
            id={props.login ? 'app.loginWithProvider' : 'app.signupWithProvider'}
            values={{ provider: props.provider }}
          />
        </a>
      </li>
    )

  return (
    <Button
      style={styles.button}
      onClick={props.signup}
      color="primary"
      size="large"
      variant="outlined"
      fullWidth={true}
      data-provider={props.provider}
    >
      <Icon icon={props.provider} style={styles.icon} />
      <span style={styles.label}>
        <FormattedMessage
          id={props.login ? 'app.loginWithProvider' : 'app.signupWithProvider'}
          values={{ provider: props.provider }}
        />
      </span>
    </Button>
  )
}

export default OauthProvider
