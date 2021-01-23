import React, { useState } from 'react'
import useApp from '../../../../../hooks/useApp'
import AppWrapper from '../../../../../components/app/wrapper'

import usePerson from '../../../../../hooks/usePerson'
import { FormattedMessage } from 'react-intl'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { measurements as allMeasurements } from '@freesewing/models'
import formatMm from '@freesewing/utils/formatMm'
import isDegMeasurement from '@freesewing/utils/isDegMeasurement'
import Blockquote from '@freesewing/components/Blockquote'
import neckstimate from '@freesewing/utils/neckstimate'
import measurementDiffers from '@freesewing/utils/measurementDiffers'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Help'
import { list, measurements as requiredMeasurements } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
import SizingGraph from '../../../../../components/person/size-graph'

const Page = (props) => {
  const app = useApp()

  const [filter, setFilter] = useState(app.vars.designFilter || false)
  const [person, setPerson] = useState({ ...usePerson(app, props.person) })

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const updateFilter = (evt) => {
    if (evt === false) {
      setFilter(false)
      let vars = { ...app.vars }
      delete vars.designFilter
      app.setVars(vars)
    } else {
      setFilter(evt.target.value)
      app.setVars({
        ...app.vars,
        designFilter: evt.target.value
      })
    }
  }
  const sortMeasurements = (measurements) => {
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
    measurementInRange = null,
    notSet = false
  ) => {
    const missing = {
      opacity: value ? 1 : 0.5,
      padding: value ? '1rem' : '0 1rem',
      verticalAlign: 'middle'
    }

    let link = `/account/people/${props.person}/measurements/${name.toLowerCase()}`
    return (
      <tr className="poh hover" onClick={() => app.navigate(link)}>
        <td style={{ ...styles.title, ...missing }}>
          <FormattedMessage id={'measurements.' + name} />
          {measurementInRange ? (
            <ValidIcon
              size="small"
              style={{ color: '#40c057', fontSize: '1.2rem', marginLeft: '0.5rem' }}
              data-test="valid"
            />
          ) : (
            !notSet && (
              <InvalidIcon
                size="small"
                style={{ color: '#ff922b', fontSize: '1.2rem', marginLeft: '0.5rem' }}
                data-test="invalid"
              />
            )
          )}
        </td>
        <td style={{ ...styles.valueCell, ...missing, textAlign: 'right' }}>
          {measurementEstimate && (
            <span
              dangerouslySetInnerHTML={{
                __html: isDegMeasurement(name)
                  ? Math.round(measurementEstimate * 10) / 10 + '°'
                  : formatMm(measurementEstimate, person.units, 'html')
              }}
            />
          )}
        </td>
        <td style={{ ...styles.valueCell, ...missing, textAlign: 'right' }}>
          {value && (
            <b>
              <span
                dangerouslySetInnerHTML={{
                  __html: isDegMeasurement(name)
                    ? Math.round(value * 10) / 10 + '°'
                    : formatMm(value, person.units, 'html')
                }}
              />
            </b>
          )}
        </td>
      </tr>
    )
  }

  const styles = {
    table: {
      padding: '0.5rem',
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      whiteSpace: 'nowrap',
      margin: '0',
      width: '100%',
      maxWidth: '666px'
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
    title: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'top',
      textAlign: 'right',
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
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

  const blankSlate = !person.measurements || !person.measurements.neck

  // Methods
  return (
    <AppWrapper
      app={app}
      title={app.translate('app.measurements')}
      crumbs={[{ slug: '/account/people/', title: <FormattedMessage id="app.people" /> }]}
      {...app.treeProps(`/account/people/${props.params.person}/measurements/`)}
    >
      {blankSlate ? (
        <Blockquote type="tip" data-test="blank-slate">
          <h6>
            <FormattedMessage id="app.startWithNeckTitle" />
          </h6>
          <p>
            <FormattedMessage id="app.startWithNeckDescription" />
          </p>
          <p>
            <Button
              variant="contained"
              color="primary"
              href={`/account/people/${props.person}/measurements/neck`}
              data-test="add-neck"
            >
              <AddIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} />
              <FormattedMessage id="measurements.neck" />
            </Button>
          </p>
        </Blockquote>
      ) : (
        <SizingGraph
          breasts={person.breasts}
          person={{ measurements: person.measurements, label: person.name }}
          app={app}
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem auto'
        }}
      >
        <Button
          color="primary"
          variant="link"
          style={{
            marginLeft: '1rem',
            padding: '0 1rem'
          }}
          disabled={filter ? false : true}
          onClick={() => updateFilter(false)}
        >
          <FormattedMessage id="filter.resetFilter" />
        </Button>
        <Select value={filter} onChange={updateFilter} variant="outlined" color="primary">
          <MenuItem value={false}>
            <FormattedMessage id="filter.byPattern" />
          </MenuItem>
          {list.map((pattern) => (
            <MenuItem key={pattern} value={pattern}>
              {capitalize(pattern)}
            </MenuItem>
          ))}
        </Select>
      </div>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td
              style={{
                ...styles.valueCell,
                textAlign: 'right',
                paddingRight: 'calc(1rem + 25px)'
              }}
              className="fw-700"
            >
              <b>
                <FormattedMessage id="app.name" />
              </b>
            </td>
            <td style={styles.valueCell} className="fw-700">
              <FormattedMessage id="app.estimate" />
            </td>
            <td style={styles.valueCell} className="fw-700">
              <b>
                <FormattedMessage id="app.actual" />
              </b>
            </td>
          </tr>
          {person.measurements &&
            measurements.map((m) => {
              if (filter && requiredMeasurements[filter].indexOf(m) === -1) return null
              let value = person.measurements[m]
              const measurementEstimate = neckstimate(
                person.measurements.neck || 360,
                m,
                person.breasts
              )
              if (value) {
                const measurementInRange =
                  measurementDiffers(person.measurements.neck || 360, m, value, person.breasts) <= 2

                return measurementRow(m, value, measurementEstimate, measurementInRange)
              } else return measurementRow(m, value, measurementEstimate, false, true)
            })}
        </tbody>
      </table>
    </AppWrapper>
  )
}

export default Page
