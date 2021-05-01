import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { version } from '../../../package.json'

let user = null
if (typeof window !== 'undefined') {
  try {
    let item = window.localStorage.getItem('fs_account')
    if (item) user = JSON.parse(item).username
  } catch (error) {
    console.log(error)
  }
}

// Only report when it matters
let releaseStage = 'develop'
if (process.env.GATSBY_NETLIFY) {
  if (process.env.GATSBY_NETLIFY_CONTEXT === 'production') {
    if (process.env.GATSBY_NETLIFY_BRANCH === 'master') releaseStage = 'production'
    else if (process.env.GATSBY_NETLIFY_BRANCH === 'develop') releaseStage = 'next'
  }
}

Bugsnag.start({
  apiKey: '12eebb132933c355271140dcdc32bc20',
  appVersion: version + '@' + process.env.GATSBY_NETLIFY_COMMIT_REF,
  releaseStage,
  collectUserIp: false,
  enabledReleaseStages: ['production', 'next'],
  onError: (event) => {
    event.user = { id: user }
  },
  plugins: [new BugsnagPluginReact(React)],
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

export default ErrorBoundary
