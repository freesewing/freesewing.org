import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Robot from '@freesewing/components/Robot'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('errors.404')}
      description={'404: ' + app.translate('errors.404')}
    >
      <div style={{ textAlign: 'center' }}>
        <Robot size={300} pose="shrug" />
        <h2>404</h2>
      </div>
    </AppWrapper>
  )
}

export default Page
