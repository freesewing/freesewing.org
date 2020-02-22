import React from 'react'

import Fab from '@material-ui/core/Fab'
import ConfigIcon from '@material-ui/icons/Tune'
import CloseIcon from '@material-ui/icons/Close'

const MobileAside = ({ app, content }) => {
  // Style
  const style = {
    fab: {
      right: '1rem',
      bottom: 'calc(1.5rem + 64px)'
    },
    shown: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      padding: '0',
      zIndex: '10',
      overflow: 'scroll',
      background: app.theme === 'light' ? '#f8f9fa' : '#212529'
    }
  }

  if (app.mobile)
    return (
      <>
        <Fab
          style={style.fab}
          title={app.translate('app.patternOptions')}
          color="accent"
          className="fab accent"
          aria-label="Menu"
          onClick={app.toggleMobileAside}
        >
          {app.mobileAside ? <CloseIcon fontSize="inherit" /> : <ConfigIcon fontSize="inherit" />}
        </Fab>
        {app.mobileAside && <div style={style.shown}>{content}</div>}
      </>
    )

  return <div id="mobile-aside"></div>
}

export default MobileAside
