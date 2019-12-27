import React from 'react'

function usePattern(app, handle) {
  if (app.patterns[handle]) return app.patterns[handle]

  console.log('FIXME: Load pattern from backend')
  return false
}

export default usePattern
