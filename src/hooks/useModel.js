import React from 'react'

function useModel(app, handle) {
  if (app.models[handle]) return app.models[handle]

  console.log('FIXME: Load model data from backand if user = admin')
  return false
}

export default useModel
