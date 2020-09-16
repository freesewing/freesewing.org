import React from 'react'
import * as blobs2 from 'blobs/v2'
import contributors from '../../../contributors.yaml'

const Blob = (props) => {
  const pickOne = (array) => array[Math.floor(Math.random() * array.length)]
  const contributor = pickOne(Object.keys(contributors))
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
      fontWeight: 400,
      textAnchor: 'end'
    }
  }
  style.whin = {
    ...style.thin,
    fill: props.contrast
  }
  style.thic = {
    ...style.thin,
    fontSize: '16px',
    fontWeight: 900,
    textAnchor: 'end'
  }
  style.whic = {
    ...style.thic,
    fill: props.contrast
  }

  const d = blobs2.svgPath(
    {
      seed: Math.random(),
      extraPoints: 8,
      randomness: 8,
      size: 350
    },
    {
      fill: 'red',
      stroke: 'none'
    }
  )

  return (
    <svg {...svgProps}>
      <defs>
        <clipPath id="blob-clip-2">
          <path
            fill={props.color ? props.color : 'currentColor'}
            stroke="none"
            transform={`translate(${large ? '350' : '220'}, ${large ? '70' : '100'})`}
            d={d}
          />
        </clipPath>
        <clipPath id="clip-avatar">
          <circle cx={large ? '530' : '400'} cy={large ? '230' : '260'} r="50" />
        </clipPath>
      </defs>
      <text x={large ? '580' : '450'} y={large ? '300' : '330'}>
        <tspan style={style.thin}>We are: </tspan>
        {contributors[contributor].does.map((d) => (
          <tspan style={style.thic} x={large ? '570' : '440'} dy="20">
            {d}
          </tspan>
        ))}
      </text>
      <path
        id="blob2"
        fill={props.color}
        stroke="none"
        d={d}
        transform={`translate(${large ? '350' : '220'}, ${large ? '70' : '100'})`}
      />
      <image
        x={large ? '480' : '350'}
        y={large ? '180' : '210'}
        href={`/contributors/${contributors[contributor].img}`}
        style={{ width: '100px', height: '100px' }}
        clipPath="url(#clip-avatar)"
      />
      <text x={large ? '580' : '450'} y={large ? '300' : '330'} clipPath="url(#blob-clip-2)">
        <tspan style={style.whin}>We are: </tspan>
        <tspan style={{ ...style.whin, fontWeight: 'bold' }}>{contributor}</tspan>
        {contributors[contributor].does.map((d) => (
          <tspan style={style.whic} x={large ? '570' : '440'} dy="20">
            {d}
          </tspan>
        ))}
      </text>
    </svg>
  )
}

export default Blob
