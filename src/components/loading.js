import React from 'react'
import Spinner from '@freesewing/components/Spinner'

const Loading = props => {
  if (!props.loading) return null

  const style = {
    wrapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: '#0009',
      zIndex: 15,
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center'
    },
    inner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }

  return (
    <React.Fragment>
    <div id="loader" style={style.wrapper}>
      <div className="dark" style={style.inner}>
        <Spinner size={400} />
      </div>
    </div>
    {props.children}
    </React.Fragment>
  )
}

export default Loading
