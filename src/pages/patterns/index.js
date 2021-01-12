import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import Robot from '@freesewing/components/Robot'
import { FormattedMessage } from 'react-intl'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper app={app} title={app.translate('app.patterns')}>
      <div style={{ textAlign: 'center' }}>
        <Robot size={300} pose="shrug2" />
        <h2>
          <FormattedMessage id="app.searchLanguageTitle" />
        </h2>
      </div>
    </AppWrapper>
  )
}

export default Page
