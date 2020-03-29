import React from 'react'
import useUiMdx from '../hooks/useUiMdx'

import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from './mdx'

const AuthRequired = (props) => {
  const uiMdx = useUiMdx()

  if (!props.app.account.username)
    return (
      <div>
        <Robot pose="shrug" size={250} />
        <Blockquote type="note">
          <h6>{uiMdx['errors/auth/user-required'].title}</h6>
          <Mdx node={uiMdx['errors/auth/user-required']} />
        </Blockquote>
      </div>
    )
  else if (props.admin && props.app.account.role !== 'admin')
    return (
      <div>
        <Robot pose="ohno" size={250} />
        <Blockquote type="warning">
          <h6>{uiMdx['errors/auth/admin-required'].title}</h6>
          <Mdx node={uiMdx['errors/auth/admin-required']} />
        </Blockquote>
      </div>
    )

  return props.children
}

export default AuthRequired
