import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import formatMm from '@freesewing/utils/formatMm'
import { nivoStyles } from '../draft/sample-styles'
import oc from 'open-color-js'
import nivoTheme from './nivo-theme'

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  <g>
    <circle r={size} stroke={borderColor} strokeWidth={1.5} fill="none" fillOpacity={0.85} />
  </g>
)
const formatCm = (val) => formatMm(val, 'metric')
const formatInch = (val) => formatMm(val, 'imperial')
const formatDegrees = (val) => Math.floor(val / 5) / 10 + '°'
const inchMarkers = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
    axis: 'y',
    value: i * 127,
    lineStyle: {
      stroke: '#ccc',
      strokeWidth: 1,
      strokeDasharray: '2 2',
      transform: 'translateX(12px)'
    },
    textStyle: { fontFamily: 'sans-serif', fontSize: '11px', fill: '#232529' },
    legend: 5 * i + '"',
    legendOrientation: 'horizontal',
    legendPosition: 'right'
  }))
const cmMarkers = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => ({
    axis: 'y',
    value: i * 100,
    lineStyle: { stroke: '#ccc', strokeWidth: 1, transform: 'translateX(-12px)' },
    textStyle: { fontFamily: 'sans-serif', fontSize: '11px', fill: '#232529' },
    legend: 10 * i + 'cm',
    legendOrientation: 'horizontal',
    legendPosition: 'left'
  }))
const horizontalMarkers = () => cmMarkers().concat(inchMarkers())

const verticalMarkers = (data) => {
  let markers = []
  let i = 0
  for (const entry in data[0].data) {
    let m = data[0].data[entry]
    markers.push({
      axis: 'x',
      value: m.x,
      lineStyle: { stroke: '#ccc', strokeWidth: 1 },
      textStyle: { fontFamily: 'sans-serif', fontSize: '11px', fill: '#232529' },
      legend: m.x,
      legendOrientation: 'vertical',
      legendPosition: i < 12 ? 'bottom-left' : 'top-left',
      legendOffsetX: i < 12 ? -7 : 7
    })
    i++
  }

  return markers
}

const sizeStyles = {
  '3XS': { strokeWidth: '1px', stroke: oc.red6 },
  XXS: { strokeWidth: '1px', stroke: oc.blue6 },
  XS: { strokeWidth: '1px', stroke: oc.green6 },
  S: { strokeWidth: '1px', stroke: oc.orange6 },
  M: { strokeWidth: '1px', stroke: oc.pink6 },
  L: { strokeWidth: '1px', stroke: oc.teal6 },
  XL: { strokeWidth: '1px', stroke: oc.yellow6 },
  '2XL': { strokeWidth: '1px', stroke: oc.grape6 },
  '3XL': { strokeWidth: '1px', stroke: oc.indigo6 },
  '4XL': { strokeWidth: '1px', stroke: oc.cyan6 }
}

const personStyle = {
  stroke: 'currentColor',
  strokeWidth: '3px'
}

const StyledLine = ({ series, lineGenerator, xScale, yScale }) => {
  return series.map(({ id, data, color }) => (
    <path
      key={id}
      d={lineGenerator(
        data.map((d) => ({
          x: xScale(d.data.x),
          y: yScale(d.data.y)
        }))
      )}
      fill="none"
      style={sizeStyles[id] || personStyle}
    />
  ))
}

const Graph = ({ app, data }) => {
  const colors = nivoStyles(app.theme === 'dark').reverse()
  colors.unshift('#232529')

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 50, bottom: 40, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisBottom={null}
      axisLeft={null}
      axisRight={null}
      colors={colors}
      pointSize={3.5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'row',
          justify: false,
          translateX: -10,
          translateY: 30,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 50,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      pointSymbol={CustomSymbol}
      markers={verticalMarkers(data).concat(horizontalMarkers())}
      layers={['grid', 'markers', 'areas', StyledLine, 'slices', 'points', 'axes', 'legends']}
      theme={nivoTheme(app.theme === 'dark' ? true : false)}
    />
  )
}

export default Graph
