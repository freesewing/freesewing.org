import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import useModel from '../../../hooks/useModel'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import EditIcon from '@material-ui/icons/Edit'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { measurements as allMeasurements } from '@freesewing/models'
import formatMm from '@freesewing/utils/formatMm'
import Markdown from 'react-markdown'
import Blockquote from '@freesewing/components/Blockquote'
import neckstimate from '@freesewing/utils/neckstimate'
import measurementDiffers from '@freesewing/utils/measurementDiffers'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Help'
import { Link } from 'gatsby'
import { list, measurements as requiredMeasurements } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'

import Avatar from '../../../components/avatar'
import ModelGraph from '../../../components/model-graph.js'

const ModelPage = props => {
  // Hooks
  const app = useApp()
  console.log('new app', app.models.modela.notes)
  // State
  const [filter, setFilter] = useState(false)
  const [model, setModel] = useState({ ...useModel(app, props.model) })

  // Effects
  useEffect(() => {
    app.setTitle(model.name)
    app.setCrumbs([
      {
        slug: '/models/',
        title: app.translate('app.models')
      }
    ])
  }, [])

  // Methods
  const updateFilter = evt => {
    setFilter(evt.target.value)
  }
  const updateModel = (field, value) => {
    let newModel = { ...model }
    if (field === 'breasts') {
      app.saveModel(props.model, { breasts: value }, app.translate('app.chest'))
      newModel.breasts = value
    } else if (field === 'units') {
      app.saveModel(props.model, { units: value }, app.translate('account.units'))
      newModel.units = value
    }
    setModel(newModel)
  }

  const sortMeasurements = measurements => {
    let sorted = []
    let translated = {}
    for (let m of measurements) {
      let translation = app.intl.messages['measurements' + m] || m
      translated[translation] = m
    }
    let order = Object.keys(translated)
    order.sort()
    for (let m of order) sorted.push(translated[m])

    return Object.values(sorted)
  }
  const measurementRow = (
    name,
    value = false,
    measurementEstimate = null,
    measurementInRange = null
  ) => {
    const missing = {
      opacity: value ? 1 : 0.5,
      padding: value ? '1rem' : '0 1rem',
      verticalAlign: 'middle'
    }
    const missingIcon = {
      fontSize: '1.5ren',
      padding: 0
    }

    return (
      <tr className="hover">
        <td style={{ ...styles.title, ...missing }}>
          <FormattedMessage id={'measurements.' + name} />
          {measurementInRange ? (
            <ValidIcon
              size="small"
              style={{ color: '#40c057', fontSize: '1.2rem', marginLeft: '0.5rem' }}
              data-test="valid"
            />
          ) : (
            <Link to="/docs/about/your-measurements/estimates/">
              <InvalidIcon
                size="small"
                style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}
                data-test="invalid"
              />
            </Link>
          )}
        </td>
        <td style={{ ...styles.valueCell, ...missing, textAlign: 'right' }}>
          {measurementEstimate && (
            <span
              dangerouslySetInnerHTML={{
                __html: formatMm(measurementEstimate, model.units, 'html')
              }}
            />
          )}
        </td>
        <td style={{ ...styles.valueCell, ...missing, textAlign: 'right' }}>
          {value && (
            <b>
              <span dangerouslySetInnerHTML={{ __html: formatMm(value, model.units, 'html') }} />
            </b>
          )}
        </td>

        <td style={styles.buttonCell}>
          <IconButton
            color="primary"
            style={styles.iconButton}
            size="medium"
            href={'/models/' + props.model + '/measurements/' + name}
            data-test={`add-${name}-measurement`}
          >
            {value ? (
              <EditIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <AddIcon fontSize="inherit" style={missingIcon} />
            )}
          </IconButton>
        </td>
      </tr>
    )
  }

  // Styles
  const styles = {
    avatarWrapper: {
      width: '250px',
      height: '250px',
      margin: 'auto'
    },
    table: {
      padding: 0,
      borderCollapse: 'collapse',
      width: '100%',
      tableLayout: 'fixed',
      whiteSpace: 'nowrap'
    },
    cell: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'top',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    valueCell: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'top',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right',
      width: '150px'
    },
    buttonCell: {
      padding: '0 0 0 1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'middle',
      width: '48px'
    },
    title: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'top',
      textAlign: 'right',
      fontWeight: 'bold',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    icon: {
      fontSize: '1.5rem'
    },
    addButton: {
      background: '#228be6',
      padding: '6px'
    },
    addIcon: {
      color: '#fff',
      fontSize: '2rem'
    },
    heading: {
      margin: 0,
      padding: '1rem'
    }
  }

  if (app.mobile) {
    styles.table.margin = '0 -1.5rem'
    styles.table.width = 'calc(100% + 3rem)'
  }

  // Logic
  const measurements = model.breasts
    ? sortMeasurements(allMeasurements.womenswear)
    : sortMeasurements(allMeasurements.menswear)

  const remainingMeasurements = () => {
    if (typeof model.measurements === 'undefined') return measurements
    let remaining = []
    for (let m of measurements) {
      if (typeof model.measurements[m] === 'undefined' || model.measurements[m] === null)
        remaining.push(m)
    }

    return remaining
  }

  const blankSlate = !model.measurements || !model.measurements.neckCircumference
  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        <div style={styles.avatarWrapper}>
          <Avatar data={model} />
        </div>
        {model.notes ? (
          <>
            <h5 style={styles.heading} data-test="notes-title">
              <FormattedMessage id="app.notes" />
            </h5>
            <Markdown source={model.notes} data-test="notes" />
            <p style={{ textAlign: 'right' }}>
              <IconButton
                data-test="edit-notes"
                color="primary"
                style={styles.iconButton}
                size="medium"
                href={'/models/' + props.model + '/notes/'}
              >
                <EditIcon fontSize="inherit" style={styles.icon} />
              </IconButton>
            </p>
          </>
        ) : (
          <h5 style={styles.heading} data-test="notes-title">
            <span style={{ opacity: '0.5' }}>
              <FormattedMessage id="app.notes" />
            </span>
            <IconButton
              data-test="add-notes"
              color="primary"
              style={styles.iconButton}
              size="medium"
              href={'/models/' + props.model + '/notes/'}
            >
              <AddIcon fontSize="inherit" style={styles.icon} />
            </IconButton>
          </h5>
        )}

        <ModelGraph model={model} intl={app.intl} />

        <Button
          variant="outlined"
          color="primary"
          href="/docs/about/model-graph"
          style={{ marginRight: '1rem' }}
        >
          <FormattedMessage id="app.docs" />
        </Button>

        <h5 style={styles.heading} data-test="settings-title">
          <FormattedMessage id="app.settings" />
        </h5>
        <table style={styles.table} className="font-title">
          <tbody>
            {/* name */}
            <tr className="hover">
              <td style={styles.title}>
                <FormattedMessage id="app.name" />
              </td>
              <td style={styles.cell}>{model.name}</td>
              <td style={styles.buttonCell}>
                <IconButton
                  color="primary"
                  style={styles.iconButton}
                  size="medium"
                  href={'/models/' + props.model + '/name/'}
                >
                  <EditIcon fontSize="inherit" style={styles.icon} />
                </IconButton>
              </td>
            </tr>
            {/* chest */}
            <tr className="hover">
              <td style={styles.title}>
                <FormattedMessage id="app.chest" />
              </td>
              <td style={styles.cell}>
                <FormattedMessage id={'app.with' + (model.breasts ? '' : 'out') + 'Breasts'} />
              </td>
              <td style={styles.buttonCell}>
                <IconButton
                  color="primary"
                  style={styles.iconButton}
                  size="medium"
                  onClick={() => updateModel('breasts', !model.breasts, app.translate('app.chest'))}
                >
                  <RefreshIcon fontSize="inherit" style={styles.icon} />
                </IconButton>
              </td>
            </tr>
            {/* units */}
            <tr className="hover">
              <td style={styles.title}>
                <FormattedMessage id="account.units" />
              </td>
              <td style={styles.cell}>
                <FormattedMessage id={'app.' + model.units + 'Units'} />
              </td>
              <td style={styles.buttonCell}>
                <IconButton
                  color="primary"
                  style={styles.iconButton}
                  size="medium"
                  onClick={() =>
                    updateModel(
                      'units',
                      model.units === 'imperial' ? 'metric' : 'imperial',
                      app.translate('account.units')
                    )
                  }
                >
                  <RefreshIcon fontSize="inherit" style={styles.icon} />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
        {/* measurements */}
        <h5 style={styles.heading} data-test="measurements-title">
          <FormattedMessage id="app.measurements" />
        </h5>
        {blankSlate && (
          <Blockquote className="note" data-test="blank-slate">
            <h6>
              <FormattedMessage id="app.startWithNeckTitle" />
            </h6>
            <p>
              <FormattedMessage id="app.startWithNeckDescription" />
            </p>
            <p style={{ textAlign: 'right' }}>
              <Button
                variant="outlined"
                color="primary"
                href="/docs/about/model-graph"
                style={{ marginRight: '1rem' }}
              >
                <FormattedMessage id="app.docs" />
              </Button>
              <Button
                variant="contained"
                color="primary"
                href={`/models/${model}/measurements/neckCircumference`}
                data-test="add-neck-circumference"
              >
                <AddIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} />
                <FormattedMessage id="measurements.neckCircumference" />
              </Button>
            </p>
          </Blockquote>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <Button
            color="primary"
            variant="outlined"
            style={{
              marginRight: '1rem',
              padding: '0 1rem'
            }}
            disabled={filter ? false : true}
            onClick={() => setFilter(false)}
          >
            <FormattedMessage id="filter.resetFilter" />
          </Button>
          <Select value={filter} onChange={updateFilter} variant="outlined" color="primary">
            <MenuItem value={false}>
              <FormattedMessage id="filter.byPattern" />
            </MenuItem>
            {list.map(pattern => (
              <MenuItem key={pattern} value={pattern}>
                {capitalize(pattern)}
              </MenuItem>
            ))}
          </Select>
        </div>
        <table style={styles.table} className="font-title">
          <tbody>
            <tr>
              <td
                style={{
                  ...styles.valueCell,
                  textAlign: 'right',
                  paddingRight: 'calc(1rem + 25px)'
                }}
              >
                <b>
                  <FormattedMessage id="app.name" />
                </b>
              </td>
              <td style={styles.valueCell}>
                <FormattedMessage id="app.estimate" />
              </td>
              <td style={styles.valueCell}>
                <b>
                  <FormattedMessage id="app.actual" />
                </b>
              </td>
              <td style={styles.buttonCell}></td>
            </tr>
            {model.measurements &&
              Object.keys(model.measurements).map(m => {
                if (filter && requiredMeasurements[filter].indexOf(m) === -1) return null

                let value = model.measurements[m]

                if (value) {
                  const measurementEstimate = neckstimate(
                    model.measurements.neckCircumference || 360,
                    m,
                    model.breasts
                  )
                  const measurementInRange =
                    measurementDiffers(
                      model.measurements.neckCircumference || 360,
                      m,
                      value,
                      model.breasts
                    ) <= 2

                  return measurementRow(m, value, measurementEstimate, measurementInRange)
                } else return null
              })}
            {remainingMeasurements().map(m => {
              if (filter && requiredMeasurements[filter].indexOf(m) === -1) return null
              else return measurementRow(m)
            })}
          </tbody>
        </table>
        <p style={{ textAlign: 'right' }}>
          <Button
            data-test="remove"
            className="danger"
            color="primary"
            variant="contained"
            onClick={() => app.removeModel(props.model)}
          >
            <FormattedMessage id="app.remove" />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(ModelPage)
