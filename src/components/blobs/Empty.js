import React from 'react'

const Blob = (props) => {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 500 500',
    className: 'empty'
  }
  if (!props.app.mobile && !props.app.tablet) svgProps.viewBox = '-100 0 800 500'
  return <svg {...svgProps}></svg>
}

export default Blob
