import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const Page = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.thanksForYourSupport'))
    app.setCrumbs([
      {
        title: app.translate('app.patrons'),
        slug: '/patrons/'
      }
    ])
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="community">
        <Robot size={300} pose="yay" />
        <p>
          <Button variant="contained" color="primary" size="large" href="/share/">
            <FormattedMessage id="app.share" />
          </Button>
        </p>
        <Blockquote type="note">
          <FormattedMessage id="app.patronHelp" />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default Page
