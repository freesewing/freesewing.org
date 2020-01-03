import React, { useState, useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import Markdown from 'react-markdown'
import UserSocial from '../../components/user-social'

const Template = props => {
  // Hooks
  const app = useApp()

  // State
  const [user, setUser] = useState(false)

  // Effects
  useEffect(() => {
    app.setTitle(props.user)
    app.setCrumbs([
      {
        slug: '/users/',
        title: app.translate('app.users')
      }
    ])
    app.loadUserProfile(props.user, handleResult)
  }, [])

  // Methods
  const handleResult = (result, data) => {
    if (result) setUser(data)
  }

  // Styles
  const styles = {
    avatar: {
      background: '#000',
      borderRadius: '4px'
    }
  }

  if (!user) return null

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <img
          src={user.pictureUris.l}
          style={styles.avatar}
          className="shadow"
          alt={user.username}
        />
        {user.bio && <Markdown source={user.bio} />}
        {user.social && (
          <p style={{ textAlign: 'center' }}>
            <UserSocial accounts={user.social} size={36} />
          </p>
        )}
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(Template)
