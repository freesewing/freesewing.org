import React from 'react'
import Spinner from '@freesewing/components/Spinner'
import { FormattedMessage } from 'react-intl'

const Loading = props => {
  if (!props.loading) return null

  const style = {
    wrapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: props.init ? '#000b' : '#0009',
      zIndex: 15,
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center'
    },
    inner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    msg: {
      color: '#fff',
      textAlign: 'center',
      margin: '-40px 0 0',
      padding: 0
    }
  }

  return (
    <React.Fragment>
      <div id="loader" style={style.wrapper}>
        <div className="dark" style={style.inner}>
          <Spinner size={400} />
          {props.init ? (
            <h5 style={style.msg}>
              <FormattedMessage id="app.oneMomentPlease" />
              <br />
              <FormattedMessage id="app.loadingMagic" />
            </h5>
          ) : null}
        </div>
      </div>
      {props.children}
    </React.Fragment>
  )
}

export default Loading
