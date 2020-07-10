import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import WideLayout from '../components/layouts/wide'

import SizingTable from '../components/size-table'

const SizesPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.sizes'))
  }, [])

  return (
    <AppWrapper app={app}>
      <WideLayout app={app}>
        <SizingTable breasts={true} />
        <SizingTable breasts={false} />
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(SizesPage)
