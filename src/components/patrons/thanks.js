import React, { useEffect } from 'react'
import Robot from '@freesewing/components/Robot'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const ThanksPatron = props => {
  useEffect(() => {
    props.app.setTitle(props.app.translate('app.thanksForYourSupport'))
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <Robot size={300} pose="yay" />
      <p style={{ textAlign: 'right' }}>
        <Button variant="contained" color="primary" size="large" href="/share">
          <FormattedMessage id="app.share" />
        </Button>
      </p>
    </div>
  )
}

export default ThanksPatron
