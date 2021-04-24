import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import ExportPattern from '../pattern/export'
import SavePatternNotes from '../pattern/save-notes'
import SavePatternAs from '../pattern/save-as'
import { navigate } from 'gatsby'
import order from './actions-order'

const Dialog = React.memo((props) => {
  if (!props.mode) throw new Error('Mode is not set in pattern dialog')

  const handleSave = () => {
    props.app
      .updatePattern(props.pattern.handle, {
        person: props.pattern.person,
        data: props.data,
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
    setPattern: props.setPattern,
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
    zoom: props.app.translate('app.zoom'),
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
    zoom: props.fit ? 'primary' : 'secondary',
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
    zoom: 'app.zoom-txt',
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
    },
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
            {titles[type]}
          </Button>
        </p>
      </>
    )
  }

  return (
    <>
      {props.action === 'pick' &&
        order.map((fab) => (props.fabs.indexOf(fab) !== -1 ? getInfo(fab) : null))}
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
      <p style={{ marginTop: '3rem' }}>
        <Button variant="outlined" color="primary" size="large" onClick={close}>
          <FormattedMessage id="app.close" />
        </Button>
      </p>
    </>
  )
})

export default Dialog
