import React, { useEffect, useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import AuthRequired from '../../../components/auth-required'

import Button from '@material-ui/core/Button'

const Page = (props) => {
  const app = useApp()

  const [patrons, setPatrons] = useState([])
  const [list, setList] = useState([])

  // Effects
  useEffect(() => {
    app.backend
      .adminPatronList(app.token)
      .then((res) => {
        if (res.status === 200) {
          let l = []
          for (const patron of res.data)
            l.push({
              handle: patron.handle,
              username: patron.username,
              tier: patron.patron,
              settings: patron.settings,
              bio: patron.bio,
              social: patron.social,
              email: patron.email,
              initial: patron.initial,
            })
          setPatrons(res.data)
          setList(l)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <AppWrapper app={app} title="Administration" active="account">
      <AuthRequired app={app} admin>
        <h2>List</h2>
        <pre>{JSON.stringify(list, null, 2)}</pre>
        <h2>Raw data</h2>
        <pre>{JSON.stringify(patrons, null, 2)}</pre>
        <p style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" size="large">
            Search
          </Button>
        </p>
      </AuthRequired>
    </AppWrapper>
  )
}

export default Page
