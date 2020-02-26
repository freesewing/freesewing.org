import React from 'react'
import BaseLayout from './base'

const CenteredLayout = props => {
  const style = {
    textAlign: props.left ? 'left' : 'center',
    maxWidth: '900px'
  }

  return <BaseLayout {...props} style={style} />
}

export default CenteredLayout
