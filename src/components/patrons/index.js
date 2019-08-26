import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Breadcrumbs from '../breadcrumbs'
import Subscribe from '../subscribe'
import List from './list'
import Thanks from './thanks'

const PatronsIndex = props => {
  if (props.slug === '/patrons') {
    let theCrumbs = <Breadcrumbs crumbs={[]} pageTitle={<FormattedMessage id="app.ourPatrons" />} />
    return (
      <React.Fragment>
        {theCrumbs}
        <h1>
          <FormattedMessage id="app.ourPatrons" />
        </h1>
        <List app={props.app} />
        {theCrumbs}
      </React.Fragment>
    )
  }
  else if (props.slug === '/patrons/thanks') {
    let theCrumbs = <Breadcrumbs crumbs={[]} pageTitle={<FormattedMessage id="app.ourPatrons" />} />
    return (
      <React.Fragment>
        <Thanks app={props.app} />
      </React.Fragment>
    )
  }

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
  let crumbs = [{ slug: '/patrons', title: <FormattedMessage id="app.ourPatrons" /> }]
  let theCrumbs = (
    <Breadcrumbs crumbs={crumbs} pageTitle={<FormattedMessage id="app.supportFreesewing" />} />
  )
  return (
    <React.Fragment>
      {theCrumbs}
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
      <Subscribe />
      {theCrumbs}
    </React.Fragment>
  )
}

export default PatronsIndex
