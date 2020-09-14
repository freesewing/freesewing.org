import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'

const UsersIndexPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.users'))
    app.setDescription(app.translate('app.noUserBrowsingTitle'))
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} top>
        <Robot pose="shrug2" size={250} />
        <h4>
          <FormattedMessage id="app.noUserBrowsingTitle" />
        </h4>
        <p>
          <FormattedMessage id="app.noUserBrowsingText" />
        </p>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(UsersIndexPage)
