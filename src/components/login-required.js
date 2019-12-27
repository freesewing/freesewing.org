import React from 'react'
import { navigate } from 'gatsby'

const LoginRequired = ({ app, children }) => {
  if (app.account.username && app.account.status === 'active') return children
  else {
    if (typeof window !== 'undefined') {
      // Only try this in the browser
      navigate('/login', {
        state: {
          intent: props.page
        }
      })
    }

    return null
  }
}

export default LoginRequired
