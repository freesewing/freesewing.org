import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Icon from '@freesewing/components/Icon'

const OauthProvider = (props) => {
  let styles = {
    button: {
      width: props.app.mobile ? '100%' : '48%',
      marginBottom: '1rem'
    },
    icon: {
      marginRight: '1rem'
    }
  }

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
        <span dangerouslySetInnerHTML={{__html: props.app.translate(props.login
          ? 'app.loginWithProvider'
          : 'app.signupWithProvider'
          , { provider: props.provider }) }} />
    </Button>
  )
}

export default OauthProvider
