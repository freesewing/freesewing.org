import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Profile from './profile'
import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'
import LoginRequired from '../login-required'

const UsersIndex = props => {
  useEffect(() => {
    if (props.slug === '/users')
      props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({ id: 'app.users' }))
    else {
      props.app.frontend.setTitle(props.slug.split('/').pop())
      props.app.frontend.setCrumbs([
        {
          slug: '/users',
          title: <FormattedMessage id="app.users" />
        }
      ])
    }
  }, [props.slug])

  if (props.slug === '/users') {
    return (
      <LoginRequired page={props.slug}>
        <Blockquote type="note">
          <div style={{ float: 'left', paddingRight: '2rem' }}>
            <Robot pose="shrug2" size={250} />
          </div>
          <h3>
            <FormattedMessage id="app.noUserBrowsingTitle" />
          </h3>
          <p>
            <FormattedMessage id="app.noUserBrowsingText" />
          </p>
          <div style={{ clear: 'both' }} />
        </Blockquote>
      </LoginRequired>
    )
  }

  return (
    <LoginRequired page={props.slug}>
      <Profile app={props.app} user={props.slug.split('/').pop()} />
    </LoginRequired>
  )
}

export default UsersIndex
