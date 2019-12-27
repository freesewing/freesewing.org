import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'

import Profile from '../../components/users/profile'

const UsersIndexPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.users'))
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <Blockquote type="note">
          <h4>
            <FormattedMessage id="app.noUserBrowsingTitle" />
          </h4>
          <p>
            <FormattedMessage id="app.noUserBrowsingText" />
          </p>
        </Blockquote>
        <div style={{ margin: '0 auto' }}>
          <Robot pose="shrug2" size={250} />
        </div>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(UsersIndexPage)
