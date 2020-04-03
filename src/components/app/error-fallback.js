import React from 'react'
import Robot from '@freesewing/components/Robot'

const ErrorFallback = (props) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Something went wrong</h1>
      <Robot pose="ohno" size={200} />
    </div>
  )
}

export default ErrorFallback
