import React, { useState } from 'react'
import neckstimate from '@freesewing/utils/neckstimate'
import formatMm from '@freesewing/utils/formatMm'
import isDegMeasurement from '@freesewing/utils/isDegMeasurement'

const ModelGraph = (props) => {
  const [text, setText] = useState('')
  const [highlight, setHighlight] = useState(false)
  const { model } = props

  if (!model || !model.measurements || !model.measurements.neck) return null

  const sizes = [32, 34, 36, 38, 40, 42, 44, 46]
  const ver = []
  ver.push('hpsToBust')
  ver.push('hpsToWaistBack')
  if (model.breasts) ver.push('hpsToWaistFront')
  ver.push('shoulderSlope')
  ver.push('shoulderToElbow')
  ver.push('shoulderToWrist')
  if (model.breasts) ver.push('hpsToBust')
  if (model.breasts) ver.push('waistToUnderbust')
  ver.push('waistToFloor')
  ver.push('waistToHips')
  ver.push('waistToSeat')
  ver.push('waistToUpperLeg')
  ver.push('waistToKnee')
  ver.push('crotchDepth')
  ver.push('inseam')
  ver.push('waistToFloor')

  const hor = []
  hor.push('neck')
  hor.push('head')
  hor.push('shoulderToShoulder')
  hor.push('biceps')
  if (model.breasts) {
    hor.push('highBust')
    hor.push('highBustFront')
  }
  hor.push('chest')
  if (model.breasts) {
    hor.push('bustFront')
    hor.push('bustSpan')
    hor.push('underbust')
  }
  hor.push('waist')
  hor.push('waistBack')
  hor.push('hips')
  hor.push('seat')
  hor.push('seatBack')
  hor.push('crossSeam')
  hor.push('crossSeamFront')
  hor.push('upperLeg')
  hor.push('wrist')
  hor.push('knee')
  hor.push('ankle')

  const own = (m) => {
    return model.measurements[m]
  }

  const modelData = () => {
    let data = {}
    for (let m of ver.concat(hor)) {
      if (own(m)) data[m] = model.measurements[m]
      else data[m] = neckstimate(neck, m, model.breasts)
    }

    return data
  }

  // Highlight method
  const hl = (measurement, data = false, isOwn = false) => {
    setHighlight(measurement)
    if (measurement) {
      setText(
        props.intl.formatMessage({
          id: 'measurements.' + measurement,
        }) +
          ': ' +
          (isDegMeasurement(measurement)
            ? data[measurement] + '°'
            : formatMm(data[measurement], model.units)) +
          ' ' +
          (isOwn ? '' : '(' + props.intl.formatMessage({ id: 'app.estimate' }) + ')')
      )
    } else setText('')
  }

  const absSize = (size) => size * 20 - 500
  const pieSize = (m) => (data[m] / neckstimate(neck, m, model.breasts)) * neck * 2 - 500
  //const pieSize = m => (data[m] / neckstimate(neck, m, model.breasts)) * neck
  const barSize = (m) => 4 * pieSize(m)
  const rotate = (x, y, angle) => {
    // Radians please
    angle = (angle * Math.PI) / 180
    return {
      x: y * Math.sin(angle) + x * Math.cos(angle),
      y: y * Math.cos(angle) - x * Math.sin(angle),
    }
  }

  const renderHorizontalMeasurements = (data) => {
    let angle = 180
    let points = []
    let output = []
    for (let size of sizes)
      output.push(
        <text key={size} x="0" y={-1 * absSize(size) + 15} className="size">
          {size}
        </text>
      )
    for (let i = 0; i < hor.length; i++) {
      let size = pieSize(hor[i])
      let slice = {
        c: rotate(0, size, angle),
        cw: rotate(size / -5, size, angle),
        ccw: rotate(size / 5, size, angle),
      }
      points.push(slice)
      let isOwn = own(hor[i])
      let className = isOwn ? 'own' : 'estimate'
      if (hor[i] === highlight) className += ' highlight'
      else if (i === 0) className += ' hide'
      let d = `M 0,0 L ${slice.c.x},${slice.c.y}`
      output.push(<path key={i + 'c'} className={className} d={d} />)
      output.push(
        <path
          key={i + 'hover'}
          className="hovertrap"
          d={d}
          onMouseEnter={() => hl(hor[i], data, isOwn)}
          onMouseLeave={() => hl(false)}
        />
      )
      angle -= 360 / hor.length
    }
    let d = `M ${points[0].c.x},${points[0].c.y} C ${points[0].cw.x}, ${points[0].cw.y}`
    let start = points.shift()
    for (let p of points) d += ` ${p.ccw.x},${p.ccw.y}  ${p.c.x},${p.c.y} C ${p.cw.x},${p.cw.y}`
    d += ` ${start.ccw.x},${start.ccw.y}  ${start.c.x},${start.c.y} z`
    output.unshift(<path d={d} key="shape" className="shape" />)

    return output
  }

  const renderVerticalMeasurements = (data) => {
    let output = []
    let x = 0
    let y = -320
    let space = 10
    let height = (y * -2) / ver.length - space
    for (let i = 0; i < ver.length; i++) {
      let size = barSize(ver[i])
      let isOwn = own(ver[i])
      let className = isOwn ? 'own' : 'estimate'
      if (ver[i] === highlight) className += ' highlight'
      output.push(
        <rect
          x={x}
          y={y}
          width={size}
          height={height}
          rx={height / 2}
          ry={height / 2}
          className={className}
          onMouseEnter={() => hl(ver[i], data, isOwn)}
          onMouseLeave={() => hl(false)}
        />
      )
      y += height + space
    }

    return output
  }

  // Get neck measurement, (estimated) model data, and default bar size
  const neck = model.measurements.neck
  const data = modelData()
  const vd = barSize('neck')

  return (
    <svg
      className="fs-model-graph"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-500 -500 3000 1000"
    >
      {renderVerticalMeasurements(data)}
      {sizes.map((size) => (
        <circle cx="0" cy="0" r={absSize(size)} className="sizebg" key={size} />
      ))}
      {renderHorizontalMeasurements(data)}
      <circle cx="0" cy="0" r="50" className="shape center" />
      {sizes.map((size) => (
        <circle cx="0" cy="0" r={absSize(size)} className="size" key={size} />
      ))}
      <path d={`M ${vd} -350 l 0 700`} className="vdefault" />
      <foreignObject x="400" y="300" width="2000" height="200">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className="text"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </foreignObject>
    </svg>
  )
}

export default ModelGraph
