import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Robot from '@freesewing/components/Robot'

const Logout = props => {
  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    half: {
      width: 'calc(50% - 1rem)'
    }
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage id="app.clickBelowToLogOut" />
      </p>
      <div style={styles.wrapper}>
        <div style={styles.half}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={() => props.app.backend.logout(props.app.account.username)}
          >
            <FormattedMessage id="app.logOut" />
          </Button>
        </div>
        <div style={styles.half}>
          <Robot embed pose="shrug" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Logout
