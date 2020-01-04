import React from 'react'
import BaseLayout from './base'

const CenteredLayout = props => {
  const style = {
    textAlign: props.left ? 'left' : 'center',
    maxWidth: '600px'
  }

  return <BaseLayout {...props} style={style} />
}

export default CenteredLayout
