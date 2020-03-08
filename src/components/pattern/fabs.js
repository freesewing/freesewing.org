import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'
import SaveIcon from '@material-ui/icons/Save'
import SaveAsIcon from '@material-ui/icons/NoteAdd'
import ExportIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'
import ZoomIcon from '@material-ui/icons/Edit'
import NotesIcon from '@material-ui/icons/RateReview'
import CompareIcon from '@material-ui/icons/SupervisorAccount'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import RecreateIcon from '@material-ui/icons/Replay'
import Fab from '@material-ui/core/Fab'
import fabsOrder from './fabsorder'

// Style
const styles = {
  wrapper: {
    margin: 'auto',
    textAlign: 'center'
  },
  button: {
    marginLeft: '0.5rem'
  }
}
const PatternFabs = props => {

  const handleSave = () => {
    props.app
      .updatePattern(props.pattern.handle, {
        person: props.pattern.person,
        data: props.data
      })
      .catch(err => {
        console.log(err)
      })
  }

  const titles = {
    compare: props.app.translate('app.compare'),
    details: props.app.translate('app.showDetails'),
    edit: props.app.translate('app.editThing', {thing: props.app.translate('app.pattern')}),
    notes: props.app.translate('app.editThing', {thing: props.app.translate('app.notes')}),
    recreate: props.app.translate('app.recreatePattern'),
    export: props.app.translate('app.printPattern') + ' / ' + props.app.translate('app.exportPattern'),
    save: props.app.translate('app.saveThing', {thing: props.app.translate('app.pattern')}),
    saveAs: props.app.translate('app.saveAsNewPattern'),
    units: props.app.translate('account.units'),
    zoom: props.app.translate('app.zoom'),
  }
  const icons= {
    compare: <CompareIcon />,
    details: [
      <MenuOpenIcon />,
      <span style={{padding: '0 0.5rem', fontFamily: 'Roboto Condensed', fontWeight: 'bold', fontSize: '0.9375rem' }}>
        <FormattedMessage id='app.showDetails' />
      </span>
    ],
    edit: <EditIcon />,
    notes: <NotesIcon />,
    recreate: <RecreateIcon />,
    export: <ExportIcon />,
    save: <SaveIcon />,
    saveAs: <SaveAsIcon />,
    units: props.units === 'metric' ? '10 cm' : '4"',
    zoom: props.fit ? <ZoomInIcon /> : <ZoomOutIcon />,
  }
  const actions= {
    compare: () => props.setDisplay(props.display === 'draft' ? 'compare' : 'draft'),
    details: () => props.openDialog('pick'),
    edit: () => navigate(`/patterns/${props.pattern}/edit/`),
    notes: () => props.openDialog('notes'),
    recreate: () => navigate(`/recreate/${props.design}/from/${props.pattern}/`),
    export: () => props.openDialog('export'),
    save: handleSave,
    saveAs: () => props.openDialog('saveAs'),
    units: () => props.toggleUnits(),
    zoom: () => props.setFit(!props.fit),
  }
  const colors = {
    compare: props.display === 'compare' ? 'secondary' : 'primary',
    details: 'primary',
    edit:  'primary',
    notes:  'primary',
    recreate:  'primary',
    export: 'primary',
    save:  'primary',
    saveAs: 'primary',
    units:  props.units === 'metric' ? 'primary' : 'secondary',
    zoom:  props.fit ? 'primary' : 'secondary',
  }
  const getFab = type => (
    <Fab
      color={colors[type]}
      style={{marginLeft: '0.5rem'}}
      title={titles[type]}
      aria-label={titles[type]}
      onClick={actions[type]}
      variant={type === 'details' ? 'extended' : 'round'}
      size={type === 'details' ? 'large' : 'medium'}
    >
      {icons[type]}
    </Fab>
  )

  return (
    <div style={styles.wrapper}>
      {fabsOrder.map(fab => (props.fabs.indexOf(fab) !== -1) ? getFab(fab) : null)}
    </div>
  )
}

export default PatternFabs
