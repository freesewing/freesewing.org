import React from 'react'
import Button from '@material-ui/core/Button'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'

const DraftPreButtons = ({ app, setFit, fit, setDisplay, display }) => {
  const styles = {
    buttons: {
      textAlign: app.mobile ? 'center' : 'right',
      margin: '1rem auto',
    },
    button: {
      margin: '0.5rem',
    },
  }

  return (
    <div style={styles.buttons}>
      {app.mobile ? null : (
        <Button
          data-test="zoom"
          variant="outlined"
          color="primary"
          style={styles.button}
          onClick={() => setFit(!fit)}
        >
          {fit ? <ZoomInIcon data-test="zoomIn" /> : <ZoomOutIcon data-test="zoomOut" />}
        </Button>
      )}
      <Button
        data-test="compare"
        variant="contained"
        color="primary"
        className="accent"
        style={styles.button}
        onClick={() => setDisplay(display === 'compare' ? 'draft' : 'compare')}
      >
        {app.translate(display === 'compare' ? 'app.preview' : 'app.compare')}
      </Button>
    </div>
  )
}

export default DraftPreButtons
