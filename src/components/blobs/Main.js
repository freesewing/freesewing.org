import React from 'react'
import * as blobs2 from 'blobs/v2'

const Blob = (props) => {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 500 500'
  }
  const large = !props.app.mobile && !props.app.tablet
  if (large) svgProps.viewBox = '-100 0 800 500'
  const style = {
    thin: {
      fontSize: '20px',
      fill: props.color,
      fontFamily: 'Roboto condensed',
      fontWeight: 200
    }
  }
  style.thic = {
    ...style.thin,
    fontSize: '38px',
    fontWeight: 900
  }
  style.whin = {
    ...style.thin,
    fill: 'white'
  }
  style.whic = {
    ...style.thic,
    fill: 'white'
  }

  const d = blobs2.svgPath(
    {
      seed: Math.random(),
      extraPoints: 8,
      randomness: 8,
      size: 450
    },
    {
      fill: 'red',
      stroke: 'none'
    }
  )
  const text = [
    {
      x: large ? -50 : 50,
      y: 80,
      t: '#WeAreFreeSewing',
      style: {
        a: style.thic,
        b: style.whic
      }
    },
    {
      x: large ? -50 : 50,
      y: 105,
      t: 'We are a community of makers',
      style: {
        a: style.thin,
        b: style.whin
      }
    },
    {
      x: large ? -50 : 50,
      y: 130,
      t: 'We provide made-to-measure sewing patterns',
      style: {
        a: style.thin,
        b: style.whin
      }
    }
  ]

  return (
    <svg {...svgProps}>
      <defs>
        <clipPath id="blob-clip-1">
          <path
            fill={props.color ? props.color : 'currentColor'}
            stroke="none"
            transform={`translate(${large ? '-200' : '-100'}, -150)`}
            d={d}
          />
        </clipPath>
      </defs>
      {text.map((text) => (
        <text x={text.x} y={text.y} style={text.style.a}>
          {text.t}
        </text>
      ))}
      <path
        id="blob1"
        fill={props.color}
        stroke="none"
        d={d}
        transform={`translate(${large ? '-200' : '-100'}, -150)`}
      />
      {text.map((text) => (
        <text x={text.x} y={text.y} clipPath="url(#blob-clip-1)" style={text.style.b}>
          {text.t}
        </text>
      ))}
    </svg>
  )
}

export default Blob
