import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Snackbar from '@material-ui/core/Snackbar'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import ErrorMsg from './error'

const Notification = props => {
  if (typeof props.notification.type === 'undefined') return null

  let { type, message } = props.notification
  const typeIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
  }
  const Icon = typeIcon[type]

  let msg = message
  if (message instanceof Error) msg = <ErrorMsg err={message} />
  else if (message instanceof String)
    msg = <span key="message" dangerouslySetInnerHTML={{ __html: msg }} />
  else if (message instanceof Object) {
    // We seem to hit this (only) when testing headless with cypress
    // It most likely has something to do with the notification in localstorage
    msg = <span key="message" dangerouslySetInnerHTML={{ __html: '<pre>FIXME: '+JSON.stringify(msg)+'</pre>' }} />
  }

  const styles = {
    icon: {
      paddingRight: '1rem'
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '400px',
      padding: '0.5rem 1.5rem',
      borderRadius: '6px',
      color: '#fff'
    },
    color: {
      success: {
        background: '#2f9e44'
      },
      warning: {
        background: '#f76707'
      },
      error: {
        background: '#e03131'
      },
      info: {
        background: '#1971c2'
      }
    }
  }
  const children = (
    <div style={{ ...styles.wrapper, ...styles.color[type] }} className="shadow">
      <Icon key="icon" style={styles.icon} />
      <div className="font-title">{msg}</div>
    </div>
  )
  return (
    <Snackbar
      anchorOrigin={{
        vertical: props.mobile ? 'top' : 'bottom',
        horizontal: 'right'
      }}
      open={true}
      autoHideDuration={3000}
      onClose={props.closeNotification}
      children={children}
      data-test='notification'
    />
  )
}

export default Notification
