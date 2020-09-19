import React from 'react'
import { FormattedMessage } from 'react-intl'
import { navigate } from 'gatsby'
import order from '../pattern/actions-order'

const PatternFabs = (props) => {
  const handleSave = () => {
    props.app
      .updatePattern(props.pattern.handle, {
        person: props.pattern.person,
        data: props.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = () => {
    props.app.removePattern(props.pattern).catch((err) => {
      console.log(err)
    })
  }

  const titles = {
    compare: props.app.translate('app.compare'),
    delete: props.app.translate('app.removeThing', { thing: props.app.translate('app.pattern') }),
    edit: props.app.translate('app.editThing', { thing: props.app.translate('app.pattern') }),
    notes: props.app.translate('app.editThing', { thing: props.app.translate('app.notes') }),
    recreate: props.app.translate('app.recreatePattern'),
    export:
      props.app.translate('app.printPattern') + ' / ' + props.app.translate('app.exportPattern'),
    save: props.app.translate('app.saveThing', { thing: props.app.translate('app.pattern') }),
    saveAs: props.app.translate('app.saveAsNewPattern'),
    units: props.app.translate('account.units'),
    zoom: props.app.translate(props.fit ? 'app.zoomIn' : 'app.zoomOut')
  }
  const actions = {
    compare: () => props.setDisplay(props.display === 'draft' ? 'compare' : 'draft'),
    delete: handleDelete,
    edit: () => navigate(`/patterns/${props.pattern}/edit/`),
    notes: () => props.openDialog('notes'),
    recreate: () => navigate(`/recreate/${props.design}/from/${props.pattern}/`),
    export: () => props.openDialog('export'),
    save: handleSave,
    saveAs: () => props.openDialog('saveAs'),
    units: () => props.toggleUnits(),
    zoom: () => props.setFit(!props.fit)
  }
  const getFab = (type) => (
    <li>
      <a href="#" role="button" onClick={actions[type]} title={titles[type]}>
        {titles[type]}
      </a>
    </li>
  )

  return <ul>{order.map((fab) => (props.fabs.indexOf(fab) !== -1 ? getFab(fab) : null))}</ul>
}

export default PatternFabs
