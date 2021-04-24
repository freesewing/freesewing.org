import React from 'react'
import Loading from '../loading'

const LoadingLayout = (props) => {
  const baseStyle = {
    margin: '0 auto',
    minHeight: 'calc(100vh - 6rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1.5rem',
    width: 'calc(100% - 3rem)',
  }
  const style = {
    textAlign: 'center',
    maxWidth: '600px',
  }

  return (
    <div style={baseStyle}>
      <div style={style}>
        <Loading loading={true} />
      </div>
    </div>
  )
}

export default LoadingLayout
