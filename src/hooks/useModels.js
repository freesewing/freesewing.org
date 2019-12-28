import { withoutBreasts, withBreasts } from '@freesewing/models'
import { measurements as requiredMeasurements } from '@freesewing/pattern-info'

export default function useModels(app, design) {
  const hasRequiredMeasurements = (measurements, required) => {
    for (let m of required) {
      if (Object.keys(measurements).indexOf(m) === -1 || measurements[m] === null) return false
    }

    return true
  }
  const asSizes = models => {
    const sizes = {}
    for (let s in models) sizes[s.slice(4)] = models[s]

    return sizes
  }

  const required = requiredMeasurements[design]
  const models = {
    ok: {
      withBreasts: {},
      withoutBreasts: {},
      user: []
    },
    no: {
      withBreasts: {},
      withoutBreasts: {},
      user: []
    }
  }

  // User models
  for (let model in app.models) {
    if (hasRequiredMeasurements(app.models[model].measurements, required)) {
      models.ok.user.push(app.models[model])
    } else {
      models.no.user.push(app.models[model])
    }
  }

  // Standard models
  const sizes = { withBreasts, withoutBreasts }
  for (let build of ['withBreasts', 'withoutBreasts']) {
    if (hasRequiredMeasurements(sizes[build].size38, required))
      models.ok[build] = asSizes(sizes[build])
    else models.no[build] = asSizes(sizes[build])
  }

  return models
}
