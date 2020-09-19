import React from 'react'
import { FormattedMessage } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import PaypalButton from './PaypalButton'

const Subscribe = (props) => {
  const { showFree } = props

  const sharedStyles = {
    textAlign: 'center',
    color: '#fff',
    height: 'calc(100% - 2rem)',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: '2rem'
  }

  const useStyles = makeStyles({
    tier0: {
      ...sharedStyles,
      color: props.app.theme === 'light' ? '#212529' : '#fff',
      backgroundColor: props.app.theme === 'light' ? '#fff' : '#495057'
    },
    tier2: {
      ...sharedStyles,
      backgroundColor: '#22b8cf'
    },
    tier4: {
      ...sharedStyles,
      backgroundColor: '#f06595'
    },
    tier8: {
      ...sharedStyles,
      backgroundColor: '#845ef7'
    },
    content: {
      padding: '1rem 2rem'
    },
    price: {
      fontSize: '4rem',
      display: 'block',
      lineHeight: 1,
      fontWeight: 900,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      letterSpacing: '0.2rem'
    },
    perMonth: {
      fontSize: '1.2rem',
      display: 'block',
      lineHeight: 1,
      fontWeight: 300
    }
  })

  return (
    <React.Fragment>
      {showFree && (
        <Grid item sm={12} md>
          <Card className={useStyles().tier0} data-test="tier-0">
            <CardContent className={useStyles().content}>
              <h3>
                <span className={useStyles().price}>0€</span>
                <span className={useStyles().perMonth}>
                  <FormattedMessage id="app.perMonth" />
                </span>
              </h3>
              <p>
                <FormattedMessage id={'app.txt-tier0'} />
              </p>
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid id="tiers" container spacing={2} alignItems="stretch">
        <Grid item sm={12} md>
          <Card className={useStyles().tier2} data-test="tier-2">
            <CardContent className={useStyles().content}>
              <h3>
                <span className={useStyles().price}>2€</span>
                <span className={useStyles().perMonth}>
                  <FormattedMessage id="app.perMonth" />
                </span>
              </h3>
              <p>
                <FormattedMessage id={'app.txt-tier2'} />
              </p>
            </CardContent>
            <PaypalButton tier={2} />
          </Card>
        </Grid>
        <Grid item sm={12} md>
          <Card className={useStyles().tier4} data-test="tier-4">
            <CardContent className={useStyles().content}>
              <h3>
                <span className={useStyles().price}>4€</span>
                <span className={useStyles().perMonth}>
                  <FormattedMessage id="app.perMonth" />
                </span>
              </h3>
              <p>
                <FormattedMessage id={'app.txt-tier4'} />
              </p>
            </CardContent>
            <PaypalButton tier={4} />
          </Card>
        </Grid>
        <Grid item sm={12} md>
          <Card className={useStyles().tier8} data-test="tier-8">
            <CardContent className={useStyles().content}>
              <h3>
                <span className={useStyles().price}>8€</span>
                <span className={useStyles().perMonth}>
                  <FormattedMessage id="app.perMonth" />
                </span>
              </h3>
              <p>
                <FormattedMessage id={'app.txt-tier8'} />
              </p>
            </CardContent>
            <PaypalButton tier={8} />
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Subscribe
