import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import SaveIcon from '@material-ui/icons/CloudUpload'
import ExportIcon from '@material-ui/icons/GetApp'
import ExportPattern from '../pattern/export'
import SavePattern from '../pattern/save'
import { Link } from 'gatsby'

const Dialog = ({ setDialog, app, data, Pattern, person, setDisplay, setLoading, recreate=false, edit=false }) => {
  // State
  const [action, setAction] = useState('pick')
  const styles = {
    button: {
      margin: '0.5rem'
    },
    buttonIcon: {
      marginRight: '1rem'
    },
    buttonRightIcon: {
      marginLeft: '1rem'
    },
    expand: {
      fontWeight: 'normal',
      fontSize: '1.25rem',
      padding: '0 1rem'
    }
  }

  const close = () => {
    setDialog(false)
    // We're delaying this until after the dialog slides off-canvas
    // If not, the new render + slide action makes the UI feel jerky
    setTimeout(() => setAction('pick'), 500)
  }

  return (
    <>
      { (action === 'pick') && (
        <>
          <h3>Save pattern</h3>
          {app.account.username
            ? (
              <>
              <p>Store this pattern in your FreeSewing account where you can retrieve it later, or share with others.</p>
              <p>
                <Button variant='contained' color='primary' size='large' onClick={() => setAction('save')}>
                <SaveIcon style={styles.buttonIcon} />
                  <FormattedMessage id='app.save'/> pattern
                </Button>
              </p>
              </>
            ) : (
              <p>
                <Link to="/signup/">
                  <FormattedMessage id="app.accountRequired" />
                </Link>
              </p>
            )
          }
          {edit && (
            <>
              <h3>Save as</h3>
              <p>Stores your changes as a new a new pattern in your FreeSewing account.</p>
              <p>
                <Button variant='contained' color='primary' size='large' onClick={() => setAction('saveAs')}>
                <SaveIcon style={styles.buttonIcon} />
                  Save as new pattern
                </Button>
              </p>
            </>
          )}
          <h3><FormattedMessage id='app.export'/> Pattern</h3>
          <p>Save this pattern to your device in the format of your choice.</p>
          <p>
            <Button variant='contained' color='primary' size='large' onClick={() => setAction('export')}>
              <ExportIcon style={styles.buttonIcon} />
              Export pattern
            </Button>
          </p>
      </>
    )}
    { (action === 'export') && (
      <>
      <h3><FormattedMessage id='app.export'/> Pattern</h3>
      <ExportPattern
        setAction={setAction}
        setLoading={app.setLoading}
        app={app}
        data={data}
        pattern={Pattern}
      />
      </>
    )}
    { (action === 'save') && (
      <>
      <h3><FormattedMessage id='app.saveThing' values={{ thing: app.translate('app.pattern')}}/></h3>
      <SavePattern
        setAction={setAction}
        setLoading={app.setLoading}
        app={app}
        data={data}
        person={person}
      />
      </>
    )}
      <p>
        { (action !== 'pick') && (
          <Button
            onClick={() => setAction('pick')}
            variant='outlined'
            color='primary'
            size='large'
            style={{marginTop: '2rem', marginRight: '1rem'}}
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={close}
          variant='outlined'
          color='primary'
          size='large'
          style={{marginTop: '2rem'}}
        >
          Close
        </Button>
      </p>
    </>
  )
}

export default Dialog
