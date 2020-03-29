import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Subscribe from '../subscribe'
import List from './list'
import Thanks from './thanks'

const PatronsIndex = (props) => {
  useEffect(() => {
    if (props.slug === '/patrons') {
      props.app.setTitle(props.app.translate('app.ourPatrons'))
    } else if (props.slug === '/patrons/thanks') {
      props.app.setTitle(props.app.translate('app.thanksForYourSupport'))
      props.app.setCrumbs([{ slug: '/patrons', title: <FormattedMessage id="app.ourPatrons" /> }])
    } else {
      props.app.setTitle(props.app.translate('app.becomeAPatron'))
      props.app.setCrumbs([{ slug: '/patrons', title: <FormattedMessage id="app.ourPatrons" /> }])
    }
  }, [props.slug])

  if (props.slug === '/patrons') return <List app={props.app} />
  else if (props.slug === '/patrons/thanks') return <Thanks app={props.app} />

  const styles = {
    header: {
      minHeight: '300px',
      padding: '3rem 2rem',
      fontFamily: "'Roboto Condensed', sans-serif",
      position: 'relative',
      backgroundImage: "url('/flag.svg')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '90% -30%'
    },
    innerHeader: {
      maxWidth: '650px',
      padding: '1rem 2rem'
    },
    h1: {
      margin: '0 0 2rem 0',
      padding: 0,
      fontWeight: 900,
      color: '#fff'
    },
    h2: {
      borderColor: 'rgba(255,255,255,0.25)',
      margin: '0 0 1rem 0',
      color: '#fff'
    },
    stripe: {
      backgroundImage: "url('/support.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      minHeight: '300px',
      padding: '3rem 2rem',
      fontFamily: "'Roboto Condensed', sans-serif",
      marginBottom: '1rem'
    },
    pitch: {
      color: 'white',
      fontSize: '125%'
    }
  }
  return (
    <React.Fragment>
      <div style={styles.stripe}>
        <div style={styles.innerHeader}>
          <h1 style={styles.h1}>
            <FormattedMessage id="app.supportFreesewing" />
          </h1>
          <h2 style={styles.h2}>
            <FormattedMessage id="app.txt-tiers" />
          </h2>
          <p style={styles.pitch}>
            <FormattedMessage id="app.patronPitch" />
          </p>
          <Button style={styles.primaryButton} variant="contained" href="#tiers">
            <FormattedMessage id="app.pricing" />
          </Button>
        </div>
      </div>
      <Subscribe app={app} />
    </React.Fragment>
  )
}

export default PatronsIndex
