import React, { useEffect, useState } from 'react'
import Robot from '@freesewing/components/Robot'
import Button from '@material-ui/core/Button'

const ErrorPage = props => {
  const [error, setError] = useState(false)
  useEffect(() => {
    props.app.frontend.setTitle('Trigger an error')
  }, [])
  const styles = {
    wrapper: {
      marginTop: '2rem',
      textAlign: 'center'
    },
    button: {
      height: '64px',
      lineHeight: 1,
      marginBottom: '1rem'
    }
  }

  if (error) return this_is_an_example_error
  else
    return (
      <React.Fragment>
        <div style={{ textAlign: 'center' }}>
          <Robot size={300} pose="shrug" />
        </div>
        <div style={styles.wrapper}>
          <p>
            This page is here to test error handling via bugsnag. Click the button below to throw an
            error.
          </p>
          <Button
            className="danger"
            style={styles.button}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={() => setError(true)}
          >
            Throw error
          </Button>
        </div>
      </React.Fragment>
    )
}

export default ErrorPage
