import React from 'react'
import Graph from './graph'
import { withBreasts, withoutBreasts } from '@freesewing/models'
import measurementsOrder from './measurements-order'
import convertSize from '@freesewing/utils/convertSize'

const formatData = (app, mdata, breasts, person = false) => {
  let d = []
  for (const size in mdata) {
    let id = convertSize(size.slice(4), breasts)
    let dd = []
    for (const m of measurementsOrder) {
      if (typeof mdata[size][m] !== 'undefined') {
        if (!person || typeof person.measurements[m] === 'number') {
          dd.push({
            x: app.translate('measurements.' + m),
            y: mdata[size][m],
          })
        }
      }
    }
    d.push({ id, data: dd })
  }
  d.reverse()
  if (person) {
    let dd = []
    for (const m of measurementsOrder) {
      if (typeof person.measurements[m] === 'number' && typeof mdata.size36[m] !== 'undefined') {
        dd.push({
          x: app.translate('measurements.' + m),
          y: person.measurements[m],
        })
      }
    }
    d.unshift({ id: person.label, data: dd })
  }

  return d
}

const SizeGraph = ({ app, breasts = false, size = 'l', person = false }) => {
  return (
    <div style={{ height: '450px' }}>
      <Graph
        data={formatData(app, breasts ? withBreasts : withoutBreasts, breasts, person)}
        app={app}
        person={person}
      />
    </div>
  )
}

export default SizeGraph
