import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import usePerson from '../../../hooks/usePerson'
import useMergeData from '../../../hooks/useMergeData'
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

const PersonPage = props => {
  // Hooks
  const app = useApp()

  // State
  const [filter, setFilter] = useState(app.vars.designFilter || false)
  const [person, setPerson] = useState({ ...usePerson(app, props.person) })

  // Effects
  useEffect(() => {
    app.setTitle(person.name)
    app.setCrumbs([
      {
        slug: '/people/',
        title: app.translate('app.people')
      }
    ])
  }, [])

  // Methods
  const updateFilter = evt => {
    setFilter(evt.target.value)
    app.setVars({
      ...app.vars,
      designFilter: evt.target.value
    })
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
                __html: formatMm(measurementEstimate, person.units, 'html')
              }}
            />
          )}
        </td>
        <td style={{ ...styles.valueCell, ...missing, textAlign: 'right' }}>
          {value && (
            <b>
              <span dangerouslySetInnerHTML={{ __html: formatMm(value, person.units, 'html') }} />
            </b>
          )}
        </td>

        <td style={styles.buttonCell}>
          <IconButton
            color="primary"
            style={styles.iconButton}
            size="medium"
            href={'/people/' + props.person + '/measurements/' + name.toLowerCase()}
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
  const measurements = person.breasts
    ? sortMeasurements(allMeasurements.womenswear)
    : sortMeasurements(allMeasurements.menswear)

  const remainingMeasurements = () => {
    if (typeof person.measurements === 'undefined') return measurements
    let remaining = []
    for (let m of measurements) {
      if (typeof person.measurements[m] === 'undefined' || person.measurements[m] === null)
        remaining.push(m)
    }

    return remaining
  }

  const blankSlate = !person.measurements || !person.measurements.neckCircumference
  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        <div style={styles.avatarWrapper}>
          <Link to={`/people/${props.person}/avatar/`}>
            <Avatar data={person} />
          </Link>
        </div>
        {person.notes ? (
          <>
            <h5 style={styles.heading} data-test="notes-title">
              <FormattedMessage id="app.notes" />
            </h5>
            <Markdown source={person.notes} data-test="notes" />
            <p style={{ textAlign: 'right' }}>
              <IconButton
                data-test="edit-notes"
                color="primary"
                style={styles.iconButton}
                size="medium"
                href={'/people/' + props.person + '/notes/'}
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
              href={'/people/' + props.person + '/notes/'}
            >
              <AddIcon fontSize="inherit" style={styles.icon} />
            </IconButton>
          </h5>
        )}

        {!blankSlate && (
          <>
            <ModelGraph model={person} intl={app.intl} />
            <Link to="/docs/about/model-graph" style={{ marginBottom: '1rem' }}>
              <small>
                <FormattedMessage id="app.whatIsThis" />
              </small>
            </Link>
          </>
        )}

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
              <td style={styles.cell}>{person.name}</td>
              <td style={styles.buttonCell}>
                <IconButton
                  color="primary"
                  style={styles.iconButton}
                  size="medium"
                  href={'/people/' + props.person + '/name/'}
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
                <FormattedMessage id={'app.with' + (person.breasts ? '' : 'out') + 'Breasts'} />
              </td>
              <td style={styles.buttonCell}>
                <IconButton
                  color="primary"
                  style={styles.iconButton}
                  size="medium"
                  onClick={
                    () =>
                      app
                        .updatePerson(props.person, [!person.breasts, 'breasts'])
                        .then(res => setPerson(usePerson(app, props.person)))
                    // We force a re-render here by setting state after the promise resolves
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
                <FormattedMessage id={'app.' + person.units + 'Units'} />
              </td>
              <td style={styles.buttonCell}>
                <IconButton
                  color="primary"
                  style={styles.iconButton}
                  size="medium"
                  onClick={
                    () =>
                      app
                        .updatePerson(props.person, [
                          person.units === 'metric' ? 'imperial' : 'metric',
                          'units'
                        ])
                        .then(res => setPerson(usePerson(app, props.person)))
                    // We force a re-render here by setting state after the promise resolves
                  }
                >
                  <RefreshIcon fontSize="inherit" style={styles.icon} />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
        {/* measurements */}
        <h5
          id="measurements"
          style={styles.heading}
          data-test="measurements-title"
          id="measurements"
        >
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
                href={`/people/${props.person}/measurements/neckcircumference`}
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
            {person.measurements &&
              Object.keys(person.measurements).map(m => {
                if (filter && requiredMeasurements[filter].indexOf(m) === -1) return null

                let value = person.measurements[m]

                if (value) {
                  const measurementEstimate = neckstimate(
                    person.measurements.neckCircumference || 360,
                    m,
                    person.breasts
                  )
                  const measurementInRange =
                    measurementDiffers(
                      person.measurements.neckCircumference || 360,
                      m,
                      value,
                      person.breasts
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
        <p style={{ textAlign: 'center' }}>
          <Button
            data-test="remove"
            className="danger"
            color="primary"
            variant="contained"
            onClick={() => app.removePerson(props.person)}
            size="large"
          >
            <FormattedMessage
              id="app.removeThing"
              values={{ thing: app.translate('app.person') }}
            />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(PersonPage)
