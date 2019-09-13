import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import measurementAsMm from '@freesewing/utils/measurementAsMm'
import formatMm from '@freesewing/utils/formatMm'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import MeasurementsImages from '../measurements/images'
import neckstimate from '@freesewing/utils/neckstimate'
import measurementDiffers from '@freesewing/utils/measurementDiffers'

const EditMeasurement = props => {
  console.log(props)
  const currentModel = props.app.models[props.model]
  const currentMeasurement = props.measurement
  console.log(currentModel)

  if (!currentModel.measurements) {
    currentModel.measurements = {}
  }

  const [updated, setUpdated] = useState(false)
  const [mm, setMm] = useState('')
  const [value, setValue] = useState(
    currentModel.measurements
      ? currentModel.measurements[currentMeasurement]
        ? formatMm(currentModel.measurements[currentMeasurement], currentModel.units, 'text')
        : ''
      : ''
  )
  const [valid, setValid] = useState(
    typeof measurementAsMm(value, currentModel.units) === 'number' ? true : false
  )
  const mdx = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "//docs/measurements/[^/]*/en.md/" } }
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
  `)

  const updateMeasurement = evt => {
    let value = evt.target.value
    setValue(evt.target.value)
    let mm = measurementAsMm(value, currentModel.units)
    let valid = typeof measurementAsMm(value, currentModel.units) === 'number' ? true : false
    if (valid) {
      setMm(mm)
      setUpdated(true)
    }
    setValid(valid)
  }

  const saveMeasurement = () => {
    const data = {
      measurements: {}
    }
    data.measurements[currentMeasurement] = mm
    props.app.backend.saveModel(
      props.model,
      data,
      props.app.frontend.intl.formatMessage({ id: 'measurements.' + currentMeasurement }),
      '/models/' + props.model
    )
  }

  let docs = null
  for (let node of Object.values(mdx.allMdx.edges)) {
    let m = node.node.parent.relativeDirectory.split('/').pop()
    if (m === currentMeasurement.toLowerCase()) docs = node.node.body
  }
  const label = props.app.frontend.intl.formatMessage({ id: 'measurements.' + currentMeasurement })

  let measurementEstimate = false
  let measurementInRange = value > 0
  let helperText = () => null

  if (currentModel.measurements.neckCircumference) {
    measurementEstimate =
      neckstimate(
        currentModel.measurements.neckCircumference || 360,
        currentMeasurement,
        currentModel.breasts
      ) / 10
    measurementInRange =
      measurementDiffers(
        currentModel.measurements.neckCircumference || 360,
        currentMeasurement,
        value,
        currentModel.breasts
      ) <= 2

    // Only show measurementEstimate for non measurements.neckCircumference
    helperText = () => {
      if (currentMeasurement != 'measurements.neckCircumference') {
        return (
          <FormattedMessage
            id="app.weEstimate"
            defaultMessage="We estimate your {measurement} to be around {measurementEstimate} {unit}"
            values={{
              measurementEstimate: measurementEstimate,
              unit: currentModel.units === 'imperial' ? '"' : 'cm',
              measurement: label.toLowerCase()
            }}
          />
        )
      }
    }
  }

  return (
    <>
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
        onKeyPress={event => {
          if (event.key === 'Enter') saveMeasurement()
        }}
        autoFocus={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {currentModel.units === 'imperial' ? '"' : 'cm'}
              &nbsp;
              {measurementInRange ? (
                <ValidIcon style={{ color: '#40c057' }} data-test="valid" />
              ) : (
                <InvalidIcon style={{ color: 'orange' }} data-test="invalid" />
              )}
            </InputAdornment>
          )
        }}
      />
      <p style={{ textAlign: 'right' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href={'/models/' + props.model}
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
          disabled={!updated || !valid}
          onClick={saveMeasurement}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h5 data-test="howto">
        <FormattedMessage id="app.howToTakeMeasurements" />
      </h5>
      <MeasurementsImages measurement={currentMeasurement} breasts={currentModel.breasts} />
      <MDXProvider components={props.components}>
        <MDXRenderer>{docs}</MDXRenderer>
      </MDXProvider>
    </>
  )
}

export default EditMeasurement
