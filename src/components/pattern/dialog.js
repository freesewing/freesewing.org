import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import ExportPattern from '../pattern/export'
import SavePatternNotes from '../pattern/save-notes'
import SavePatternAs from '../pattern/save-as'
import { Link, navigate } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import SaveIcon from '@material-ui/icons/Save'
import SaveAsIcon from '@material-ui/icons/CloudUpload'
import ExportIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'
import RecreateIcon from '@material-ui/icons/Replay'
import ZoomIcon from '@material-ui/icons/Edit'
import NotesIcon from '@material-ui/icons/RateReview'
import CompareIcon from '@material-ui/icons/SupervisorAccount'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import fabsOrder from './fabsorder'

// Style
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

const Dialog = React.memo((props) => {
  if (!props.mode) throw new Error('Mode is not set in pattern dialog')

  const handleSave = () => {
    props.app
      .updatePattern(props.pattern.handle, {
        person: props.pattern.person,
        data: props.data
      })
      .then((err) => {
        props.setDialog(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = () => {
    props.app.removePattern(props.pattern.handle).catch((err) => {
      console.log(err)
    })
    props.setDialog(false)
  }

  const close = () => props.setDialog(false)

  const sharedProps = {
    app: props.app,
    data: props.data,
    person: props.person,
    setAction: props.setAction,
    setDialog: props.setDialog,
    setPattern: props.setPattern
  }

  const titles = {
    compare: props.app.translate('app.comparePattern'),
    delete: props.app.translate('app.removeThing', { thing: props.app.translate('app.pattern') }),
    edit: props.app.translate('app.editThing', { thing: props.app.translate('app.pattern') }),
    notes: props.app.translate('app.editThing', { thing: props.app.translate('app.notes') }),
    recreate: props.app.translate('app.recreatePattern'),
    export:
      props.app.translate('app.printPattern') + ' / ' + props.app.translate('app.exportPattern'),
    save: props.app.translate('app.saveThing', { thing: props.app.translate('app.pattern') }),
    saveAs: props.app.translate('app.saveAsNewPattern'),
    units: props.app.translate('account.units'),
    zoom: props.app.translate('app.zoom')
  }

  const colors = {
    compare: props.display === 'draft' ? 'primary' : 'secondary',
    delete: 'primary',
    edit: 'primary',
    notes: 'primary',
    recreate: 'primary',
    export: 'primary',
    save: 'primary',
    saveAs: 'primary',
    units: props.units === 'metric' ? 'primary' : 'secondary',
    zoom: props.fit ? 'primary' : 'secondary'
  }

  const info = {
    compare: 'app.comparePattern-txt',
    delete: 'app.proceedWithCaution',
    edit: 'app.editPattern-txt',
    notes: 'app.updateNotes-txt',
    recreate: 'app.recreatePattern-txt',
    export: 'app.exportPattern-txt',
    save: 'app.savePattern-txt',
    saveAs: 'app.saveAsNewPattern-txt',
    units: 'account.unitsInfo',
    zoom: 'app.zoom-txt'
  }

  const icons = {
    compare: <CompareIcon style={styles.buttonIcon} />,
    delete: <DeleteIcon style={styles.buttonIcon} />,
    edit: <EditIcon style={styles.buttonIcon} />,
    notes: <NotesIcon style={styles.buttonIcon} />,
    recreate: <RecreateIcon style={styles.buttonIcon} />,
    export: <ExportIcon style={styles.buttonIcon} />,
    save: <SaveIcon style={styles.buttonIcon} />,
    saveAs: <SaveAsIcon style={styles.buttonIcon} />,
    units: <span style={styles.buttonIcon}>{props.units === 'metric' ? '10 cm' : '4"'}</span>,
    zoom: props.fit ? (
      <ZoomInIcon style={styles.buttonIcon} />
    ) : (
      <ZoomOutIcon style={styles.buttonIcon} />
    )
  }

  const actions = {
    compare: () => {
      props.setDisplay(props.display === 'draft' ? 'compare' : 'draft')
      props.setDialog(false)
    },
    delete: handleDelete,
    details: () => props.openDialog('pick'),
    edit: () => navigate(`/patterns/${props.pattern}/edit/`),
    notes: () => props.setAction('notes'),
    recreate: () => navigate(`/recreate/${props.design}/from/${props.pattern}/`),
    export: () => props.openDialog('export'),
    save: handleSave,
    saveAs: () => props.setAction('saveAs'),
    units: () => {
      props.toggleUnits(), props.setDialog(false)
    },
    zoom: () => {
      props.setFit(!props.fit)
      props.setDialog(false)
    }
  }

  const getInfo = (type) => {
    if (!titles[type]) return null
    return (
      <>
        <h3>{titles[type]}</h3>
        <p>
          <FormattedMessage id={info[type]} />
        </p>
        <p>
          <Button
            variant="contained"
            color={colors[type]}
            size="large"
            onClick={actions[type]}
            className={type === 'delete' ? 'danger' : ''}
          >
            {icons[type]}
            {titles[type]}
          </Button>
        </p>
      </>
    )
  }

  return (
    <>
      {props.action === 'pick' &&
        fabsOrder.map((fab) => (props.fabs.indexOf(fab) !== -1 ? getInfo(fab) : null))}
      {props.action === 'notes' && (
        <SavePatternNotes
          {...sharedProps}
          name={props.pattern.name}
          notes={props.pattern.notes}
          pattern={props.pattern.handle}
        />
      )}
      {props.action === 'saveAs' && <SavePatternAs {...sharedProps} />}
      {props.action === 'export' && (
        <>
          <h3>{titles.export}</h3>
          <ExportPattern {...sharedProps} />
        </>
      )}
      <Button
        onClick={close}
        variant="outlined"
        color="primary"
        size="large"
        style={{ margin: '2rem 0' }}
        key="close"
      >
        <MenuOpenIcon
          style={{
            marginRight: '0.5rem',
            transform: 'rotate(180deg)'
          }}
        />
        Close
      </Button>
    </>
  )
})

export default Dialog
