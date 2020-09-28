import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Subscribe from '../../components/subscribe'

const JoinPatronsPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.becomeAPatron'))
    app.setDescription(app.translate('app.patronPitch'))
    app.setImage('https://freesewing.org/support.jpg')
    app.setCrumbs([
      {
        title: app.translate('app.community'),
        slug: '/community/'
      }
    ])
  }, [])

  // Styles
  const styles = {
    text: {
      maxWidth: '80ch'
    }
  }

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="community">
        <p style={styles.text}>
          <FormattedMessage id="app.txt-tiers" />
        </p>
        <p style={styles.text}>
          <FormattedMessage id="app.patronPitch" />
        </p>
        <Subscribe app={app} />
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(JoinPatronsPage)
