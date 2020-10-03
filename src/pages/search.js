import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Search from '../components/search'

const Page = (props) => {
  const app = useApp(false)

  return (
    <AppWrapper app={app} title={app.translate('app.search')}>
      <Search search={app.translate('app.search')} />
    </AppWrapper>
  )
}

export default Page
