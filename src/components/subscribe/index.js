import React from 'react'
import Tier from './tier'

const Subscribe = props => {
  const styles = {
    wrapper: {
      maxWidth: '1600px',
      margin: 'auto'
    },
    white: {
      margin: '1rem 0'
    },
    colors: {
      margin: '1rem 0',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
  }
  if (props.mobile) {
    styles.color = {
      width: '100%'
    }
  } else {
    styles.color = {
      width: '32%'
    }
  }

  return (
    <div style={styles.wrapper}>
      {props.noFree ? null : (
        <div style={styles.white}>
          <Tier tier={0} />
        </div>
      )}
      <div>
        <div style={styles.colors}>
          <div style={styles.color}>
            <Tier tier={2} mobile={props.mobile} />
          </div>
          <div style={styles.color}>
            <Tier tier={4} mobile={props.mobile} />
          </div>
          <div style={styles.color}>
            <Tier tier={8} mobile={props.mobile} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
