import React from 'react'
import BaseLayout from './base'

const WideLayout = (props) => {
  const style = { maxWidth: '1600px' }

  return <BaseLayout {...props} style={style} name="wide" />
}

export default WideLayout
