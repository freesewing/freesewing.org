import React, { useEffect, useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import AuthRequired from '../../../components/auth-required'

import Button from '@material-ui/core/Button'

const Page = (props) => {
  const app = useApp()

  const [list, setList] = useState([])
  const token = app.token

  // Effects
  useEffect(() => {
    app.backend
      .adminSubscriberList(app.token)
      .then((res) => {
        if (res.status === 200) {
          let l = []
          for (const sub of res.data) l.push(sub.email)
          setList(l)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <AppWrapper
      app={app}
      title="Newsletter subscribers"
      active="account"
      crumbs={[{ title: 'Admin', slug: '/admin/' }]}
    >
      <AuthRequired app={app} admin>
        <h2>Subscribers</h2>
        <pre>{JSON.stringify(list, null, 2)}</pre>
      </AuthRequired>
    </AppWrapper>
  )
}

export default Page
