import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Subscribe from '../../components/subscribe'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.becomeAPatron')}
      image={'https://freesewing.org/support.jpg'}
      description={app.translate('app.txt-tiers') + ' ' + app.translate('app.patronPitch')}
      {...app.treeProps('/community/join/')}
      wide
    >
      <div style={{ maxWidth: '80ch' }}>
        <p>
          <FormattedMessage id="app.txt-tiers" />
        </p>
        <p>
          <FormattedMessage id="app.patronPitch" />
        </p>
      </div>
      <Subscribe app={app} />
    </AppWrapper>
  )
}

export default Page
