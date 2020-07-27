import React from 'react'
import Graph from './graph'
import {
  measurements as allMeasurements,
  sizes as allSizes,
  withBreasts,
  withoutBreasts
} from '@freesewing/models'
import measurementsOrder from './measurements-order'
import convertSize from '@freesewing/utils/convertSize'

const formatData = (app, mdata, breasts, person = false) => {
  let d = []
  for (const size in mdata) {
    let id = convertSize(size.slice(4), breasts)
    let dd = []
    for (const m of measurementsOrder) {
      if (typeof mdata[size][m] !== 'undefined') {
        dd.push({
          x: app.translate('measurements.' + m),
          y: mdata[size][m] * (m === 'shoulderSlope' ? 50 : 1)
        })
      }
    }
    d.push({ id, data: dd })
  }

  return d
}

const SizeGraph = ({ app, breasts = false }) => {
  return (
    <div style={{ height: '600px' }}>
      <Graph data={formatData(app, breasts ? withBreasts : withoutBreasts, breasts)} app={app} />
    </div>
  )
}

export default SizeGraph
