import React from 'react'

const MeasurementImage = (props) => (
  <img
    data-test="measurement-image"
    className="shadow"
    src={props.img}
    alt={props.intl.formatMessage({
      id: 'measurements.' + props.measurement
    })}
    style={{
      backgroundImage: 'url(' + props.bg + ')',
      backgroundSize: 'cover'
    }}
  />
)

export default MeasurementImage
