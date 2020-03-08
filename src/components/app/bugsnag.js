import React from 'react'
import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'
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

const bugsnagClient = bugsnag({
  apiKey: '12eebb132933c355271140dcdc32bc20',
  appVersion: version + '@' + process.env.GATSBY_NETLIFY_COMMIT_REF,
  releaseStage,
  collectUserIp: false,
  notifyReleaseStages: ['production', 'next'],
  beforeSend: report => {
    report.user = { id: user }
  }
})
bugsnagClient.use(bugsnagReact, React)
const ErrorBoundary = bugsnagClient.getPlugin('react')

export default ErrorBoundary
