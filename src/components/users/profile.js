import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import UserSocial from '../user-social'

const UserProfile = props => {
  const [user, setUser] = useState(false)
  useEffect(() => {
    props.app.backend.loadProfile(props.user, handleResult)
  }, [])

  const handleResult = (result, data) => {
    if (result) setUser(data)
  }

  const styles = {
    avatar: {
      background: '#000',
      borderRadius: '4px'
    }
  }
  if (!user) return <pre>{JSON.stringify(props, null, 2)}</pre>

  return (
    <React.Fragment>
      <img src={user.pictureUris.l} style={styles.avatar} className="shadow" alt={user.username} />
      <Markdown source={user.bio} />
      {user.social && (
        <p style={{ textAlign: 'center' }}>
          <UserSocial accounts={user.social} size={36} />
        </p>
      )}
    </React.Fragment>
  )
}

export default UserProfile
