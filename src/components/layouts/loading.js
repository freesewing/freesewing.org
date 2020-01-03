import React from 'react'
import BaseLayout from './base'
import Loading from '../loading'

const LoadingLayout = props => {
  const style = {
    textAlign: 'center',
    maxWidth: '600px'
  }

  return (
    <BaseLayout {...props} style={style}>
      <Loading />
    </BaseLayout>
  )
}

export default LoadingLayout
