import React from 'react'
import { FormattedMessage } from 'react-intl'
import EditIcon from '@material-ui/icons/Edit'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { measurements as allMeasurements } from '@freesewing/models'
import formatMm from '@freesewing/utils/formatMm'
import Avatar from '../avatar'
import Markdown from 'react-markdown'
import ModelGraph from '../model-graph.js'
import Blockquote from '@freesewing/components/Blockquote'
import neckstimate from '@freesewing/utils/neckstimate'
import measurementDiffers from '@freesewing/utils/measurementDiffers'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const ShowModel = ({ app, model }) => {
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
    buttonCell: {
      padding: 0,
      borderTop: '1px solid #9993',
      verticalAlign: 'middle'
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

  if (app.frontend.mobile) {
    styles.table.margin = '0 -1.5rem'
    styles.table.width = 'calc(100% + 3rem)'
  }

  const sortMeasurements = measurements => {
    let sorted = []
    let translated = {}
    for (let m of measurements) {
      let translation = app.frontend.intl.messages['measurements' + m] || m
      translated[translation] = m
    }
    let order = Object.keys(translated)
    order.sort()
    for (let m of order) sorted.push(translated[m])

    return Object.values(sorted)
  }

  const currentModel = app.models[model]

  const measurements = currentModel.breasts
    ? sortMeasurements(allMeasurements.womenswear)
    : sortMeasurements(allMeasurements.menswear)

  const remainingMeasurements = () => {
    if (typeof currentModel.measurements === 'undefined') return measurements
    let remaining = []
    for (let m of measurements) {
      if (
        typeof currentModel.measurements[m] === 'undefined' ||
        currentModel.measurements[m] === null
      )
        remaining.push(m)
    }

    return remaining
  }

  const blankSlate = !currentModel.measurements || !currentModel.measurements.neckCircumference

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
        </td>
        <td style={{ ...styles.cell, ...missing }}>
          {measurementEstimate && (
            <span
              dangerouslySetInnerHTML={{
                __html: formatMm(Math.round(measurementEstimate), currentModel.units)
              }}
            />
          )}
        </td>
        <td style={{ ...styles.cell, ...missing }}>
          {value && (
            <>
              <span dangerouslySetInnerHTML={{ __html: formatMm(value, currentModel.units) }} />{' '}
              {measurementInRange ? (
                <ValidIcon size="small" style={{ color: '#40c057' }} data-test="valid" />
              ) : (
                <InvalidIcon size="small" style={{ color: 'yellow' }} data-test="invalid" />
              )}
            </>
          )}
        </td>

        <td style={styles.buttonCell}>
          <IconButton
            color="primary"
            style={styles.iconButton}
            size="medium"
            href={'/models/' + model + '/measurements/' + name}
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

  return (
    <>
      <div style={styles.avatarWrapper}>
        <Avatar data={currentModel} />
      </div>
      {currentModel.notes ? (
        <>
          <h5 style={styles.heading} data-test="notes-title">
            <FormattedMessage id="app.notes" />
          </h5>
          <Markdown source={currentModel.notes} data-test="notes" />
          <p style={{ textAlign: 'right' }}>
            <IconButton
              data-test="edit-notes"
              color="primary"
              style={styles.iconButton}
              size="medium"
              href={'/models/' + model + '/notes'}
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
            href={'/models/' + model + '/notes'}
          >
            <AddIcon fontSize="inherit" style={styles.icon} />
          </IconButton>
        </h5>
      )}

      <ModelGraph model={currentModel} intl={app.frontend.intl} />

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
            <td style={styles.cell}>{currentModel.name}</td>
            <td style={styles.buttonCell}>
              <IconButton
                color="primary"
                style={styles.iconButton}
                size="medium"
                href={'/models/' + model + '/name'}
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
              <FormattedMessage id={'app.with' + (currentModel.breasts ? '' : 'out') + 'Breasts'} />
            </td>
            <td style={styles.buttonCell}>
              <IconButton
                color="primary"
                style={styles.iconButton}
                size="medium"
                onClick={() =>
                  app.backend.saveModel(
                    model,
                    { breasts: currentModel.breasts ? 'false' : 'true' },
                    app.frontend.intl.formatMessage({ id: 'app.chest' })
                  )
                }
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
              <FormattedMessage id={'app.' + currentModel.units + 'Units'} />
            </td>
            <td style={styles.buttonCell}>
              <IconButton
                color="primary"
                style={styles.iconButton}
                size="medium"
                onClick={() =>
                  app.backend.saveModel(
                    model,
                    { units: currentModel.units === 'metric' ? 'imperial' : 'metric' },
                    app.frontend.intl.formatMessage({ id: 'account.units' })
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
      <table style={styles.table} className="font-title">
        <tbody>
          <tr>
            <td></td>
            <td>Estimate</td>
            <td>Actual</td>
            <td></td>
          </tr>
          {currentModel.measurements &&
            Object.keys(currentModel.measurements).map(m => {
              let value = currentModel.measurements[m]

              if (value) {
                const measurementEstimate = neckstimate(
                  currentModel.measurements.neckCircumference || 360,
                  m,
                  currentModel.breasts
                )
                const measurementInRange =
                  measurementDiffers(
                    currentModel.measurements.neckCircumference || 360,
                    m,
                    value,
                    currentModel.breasts
                  ) <= 2

                return measurementRow(m, value, measurementEstimate, measurementInRange)
              } else return null
            })}
          {remainingMeasurements().map(m => measurementRow(m))}
        </tbody>
      </table>
      <p style={{ textAlign: 'right' }}>
        <Button
          data-test="remove"
          className="danger"
          color="primary"
          variant="contained"
          onClick={() => app.backend.removeModel(model)}
        >
          <FormattedMessage id="app.remove" />
        </Button>
      </p>
    </>
  )
}

export default ShowModel
