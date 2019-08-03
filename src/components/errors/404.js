import React from 'react'
import { FormattedMessage } from 'react-intl'
import Robot from '@freesewing/components/Robot'
import Button from '@material-ui/core/Button'

const NotFound = props => {
  const styles = {
    wrapper: {
      textAlign: 'center'
    },
    nr: {
      fontSize: '7rem',
      fontWeight: 900,
      margin: '3rem auto 0'
    },
    error: {
      margin: 0
    },
    bq: {
      maxWidth: '350px',
      margin: '40px auto'
    }
  }
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.nr}>404</h1>
      <Robot size={250} pose="shrug" />
      <h3 style={styles.error}>
        <FormattedMessage id="errors.404" />
      </h3>
      <div style={styles.bq}>
        <p>If you arrived here via a link, we would like to hear about it.</p>
        <p>
          <Button
            color="primary"
            variant="contained"
            size="large"
            href={
              'https://github.com/freesewing/freesewing.org/issues/new?title=Broken%20link: ' +
              props.slug +
              '&labels=404&body=*Please%20include%20the%20referrer*'
            }
          >
            Report on Github
          </Button>
        </p>
      </div>
    </div>
  )
}

export default NotFound
