import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import PaypalButton from './PaypalButton'

const Subscribe = props => {
  const { showFree } = props

  const useStyles = makeStyles({
    tier2: {
      backgroundColor: '#37b24d',
      color: '#fff',
      height: '100%'
    },
    tier4: {
      backgroundColor: '#228be6',
      color: '#fff',
      height: '100%'
    },
    tier8: {
      backgroundColor: '#7950f2',
      color: '#fff',
      height: '100%'
    }
  })

  return (
    <Grid id="tiers" container spacing="2" alignItems="stretch">
      {showFree && (
        <Grid item sm="12" md>
          <Card>
            <CardContent>
              <h3>
                €0{' '}
                <small>
                  <FormattedMessage id="app.perMonth" />
                </small>
              </h3>
              <p>
                <FormattedHTMLMessage id={'app.txt-tier0'} />
              </p>
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid item sm="12" md>
        <Card className={useStyles().tier2}>
          <CardContent>
            <h3>
              €2{' '}
              <small>
                <FormattedMessage id="app.perMonth" />
              </small>
            </h3>
            <p>
              <FormattedHTMLMessage id={'app.txt-tier2'} />
            </p>
          </CardContent>
          <CardActions>
            <PaypalButton tier={2} />
          </CardActions>
        </Card>
      </Grid>
      <Grid item sm="12" md>
        <Card className={useStyles().tier4}>
          <CardContent>
            <h3>
              €4{' '}
              <small>
                <FormattedMessage id="app.perMonth" />
              </small>
            </h3>
            <p>
              <FormattedHTMLMessage id={'app.txt-tier4'} />
            </p>
          </CardContent>
          <CardActions>
            <PaypalButton tier={4} />
          </CardActions>
        </Card>
      </Grid>
      <Grid item sm="12" md>
        <Card className={useStyles().tier8}>
          <CardContent>
            <h3>
              €8{' '}
              <small>
                <FormattedMessage id="app.perMonth" />
              </small>
            </h3>
            <p>
              <FormattedHTMLMessage id={'app.txt-tier8'} />
            </p>
          </CardContent>
          <CardActions>
            <PaypalButton tier={8} />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Subscribe
