import React, { useEffect, useState } from 'react'
import useApp from '../../../../../hooks/useApp'
import AppWrapper from '../../../../../components/app/wrapper'

import usePerson from '../../../../../hooks/usePerson'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import measurementAsMm from '@freesewing/utils/measurementAsMm'
import isDegMeasurement from '@freesewing/utils/isDegMeasurement'
import formatMm from '@freesewing/utils/formatMm'
import { graphql } from 'gatsby'
import neckstimate from '@freesewing/utils/neckstimate'
import measurementDiffers from '@freesewing/utils/measurementDiffers'
import Mdx from '../../../../../components/mdx'
import MeasurementsImages from '../../../../../components/measurements/images'
import MeasurementGauge from '../../../../../components/measurements/gauge'

const Page = (props) => {
  const app = useApp()

  const measurement = props.pageContext.measurement

  const [person, setPerson] = useState({ ...usePerson(app, props.person) })
  const [updated, setUpdated] = useState(false)
  const [mm, setMm] = useState('')
  const [value, setValue] = useState(
    person.measurements
      ? person.measurements[measurement]
        ? isDegMeasurement(measurement)
          ? person.measurements[measurement]
          : formatMm(person.measurements[measurement], person.units, 'text')
        : ''
      : ''
  )
  const [valid, setValid] = useState(
    typeof measurementAsMm(value, person.units) === 'number' ? true : false
  )

  useEffect(() => {
    if (!person.measurements) setPerson({ ...person, measurements: {} })
  }, [])

  // We'll need this a bunch of times
  const label = app.translate(`measurements.${measurement}`)

  // If there's no measurements for this person, terminate the initial render,
  // that way, useEffect will populate the measurements triggering a re-render with
  // measurements present
  if (typeof person.measurements === 'undefined') return null

  const updateMeasurement = (evt) => {
    let mm = false
    let valid = false
    let value = evt.target.value
    setValue(evt.target.value)
    if (isDegMeasurement(measurement)) valid = value > 0 && value < 26
    else {
      mm = measurementAsMm(value, person.units)
      valid = typeof measurementAsMm(value, person.units) === 'number' ? true : false
    }
    if (valid) {
      if (mm) setMm(mm)
      setUpdated(true)
    }
    setValid(valid)
  }

  const saveMeasurement = () => {
    app.updatePerson(
      props.person,
      [isDegMeasurement(measurement) ? value : mm, 'measurements', measurement],
      `/account/people/${props.person}/measurements/`
    )
  }

  let docs = null
  for (let node of Object.values(props.data.allMdx.edges)) {
    let m = node.node.parent.relativeDirectory.split('/').pop()
    if (m === measurement.toLowerCase()) docs = node.node
  }

  let measurementEstimate = false
  let measurementDiff = null
  let helperText = () => null

  if (person.measurements.neck) {
    measurementEstimate = neckstimate(person.measurements.neck, measurement, person.breasts) // Note: This is in mm
    measurementDiff = (value === '')
      ? null
      : measurementDiffers(person.measurements.neck, measurement, value * 10, person.breasts, false)

    // Only show measurementEstimate for non measurements.neck
    helperText = () => {
      if (measurement != 'measurements.neck') {
        return (
          <>
            <FormattedMessage
              id="app.weEstimateYM2B"
              values={{ measurement: label.toLowerCase() }}
            />
            {measurement === 'shoulderSlope' ? (
              <span> {measurementEstimate}°</span>
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ' + formatMm(measurementEstimate, person.units),
                }}
              />
            )}
          </>
        )
      }
    }
  }

  // Range for degree measurements
  if (isDegMeasurement(measurement)) {
    measurementDiff = (value === '')
      ? null
      : (value - 13) / 2
  }
  // Symbol for text box
  const unitsText = isDegMeasurement(measurement) ? '°' : person.units === 'imperial' ? '"' : 'cm'

  return (
    <AppWrapper
      app={app}
      title={label}
      {...app.treeProps(`/account/people/${props.person}/measurements/${measurement}/`)}
    >
      <TextField
        data-test="measurement"
        fullWidth={true}
        label={label}
        margin="normal"
        variant="outlined"
        value={value}
        type="text"
        helperText={helperText()}
        onChange={updateMeasurement}
        onKeyPress={(event) => {
          if (event.key === 'Enter') saveMeasurement()
        }}
        autoFocus={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {unitsText}
              &nbsp;
              <MeasurementGauge val={measurementDiff} size={24} theme={app.theme} />
            </InputAdornment>
          ),
        }}
      />

      <p style={{ textAlign: 'right'}}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href={`/account/people/${props.person}/#measurements`}
          data-test="cancel"
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          data-test="save"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          disabled={!updated || !valid || value===''}
          onClick={saveMeasurement}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h5 data-test="howto">
        <FormattedMessage id="app.howToTakeMeasurements" />
      </h5>
      <MeasurementsImages measurement={measurement} breasts={person.breasts} />
      <Mdx node={docs} />
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MeasurementDocs($measurementsMdxRegex: String) {
    allMdx(
      filter: { fileAbsolutePath: { regex: $measurementsMdxRegex } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
          body
        }
      }
    }
  }
`
