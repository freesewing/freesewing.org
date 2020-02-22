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

const bugsnagClient = bugsnag({
  apiKey: '12eebb132933c355271140dcdc32bc20',
  appVersion: version,
  collectUserIp: false,
  beforeSend: report => {
    report.user = { id: user }
  }
})
bugsnagClient.use(bugsnagReact, React)
const ErrorBoundary = bugsnagClient.getPlugin('react')

export default ErrorBoundary
