import React from 'react'
import Button from '@material-ui/core/Button'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import ExportIcon from '@material-ui/icons/GetApp'
import SaveIcon from '@material-ui/icons/CloudUpload'
import { FormattedMessage } from 'react-intl'

const DraftPreButtons = ({ app, setFit, fit, setDisplay, display }) => {
  const styles = {
    buttons: {
      textAlign: app.mobile ? 'center' : 'right',
      margin: '1rem auto',
    },
    button: {
      margin: '0.5rem',
    },
    buttonIcon: {
      marginRight: '0.5rem',
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
      <Button
        data-test="share"
        variant="contained"
        color="primary"
        className="info"
        style={styles.button}
        onClick={() => setDisplay('share')}
      >
        <SaveIcon style={styles.buttonIcon} />
        <FormattedMessage id="app.save" />
        <span>&nbsp;/&nbsp;</span>
        <FormattedMessage id="app.shareThing" values={{ thing: app.translate('app.pattern') }} />
      </Button>
      <Button
        data-test="export"
        variant="contained"
        color="primary"
        style={styles.button}
        onClick={() => setDisplay('export')}
      >
        <ExportIcon style={styles.buttonIcon} />
        <FormattedMessage id="app.exportPattern" />
      </Button>
    </div>
  )
}

export default DraftPreButtons
