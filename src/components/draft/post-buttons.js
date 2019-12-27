import React from 'react'
import Button from '@material-ui/core/Button'
import ExportIcon from '@material-ui/icons/GetApp'
import SaveIcon from '@material-ui/icons/CloudUpload'
import { FormattedMessage } from 'react-intl'

const DraftPostButtons = ({ app, setDisplay, display }) => {
  const styles = {
    buttons: {
      textAlign: app.mobile ? 'center' : 'right',
      margin: '1rem auto'
    },
    button: {
      margin: '0.5rem'
    },
    buttonIcon: {
      marginRight: '0.5rem'
    }
  }

  return (
    <div style={styles.buttons}>
      <Button
        data-test="save"
        variant="contained"
        color="primary"
        className="info"
        style={styles.button}
        onClick={() => setDisplay('save')}
      >
        <SaveIcon style={styles.buttonIcon} />
        <FormattedMessage id="app.savePattern" />
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

export default DraftPostButtons
