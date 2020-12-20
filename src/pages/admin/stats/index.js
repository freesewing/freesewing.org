import React, { useEffect, useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import AuthRequired from '../../../components/auth-required'

const Page = (props) => {
  const app = useApp()

  const [stats, setStats] = useState([])
  const token = app.token

  // Effects
  useEffect(() => {
    app.backend
      .adminStats(app.token)
      .then((res) => {
        if (res.status === 200) setStats(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <AppWrapper app={app} title="Administration" active="account">
      <AuthRequired app={app} admin>
        <h2>Stats</h2>
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      </AuthRequired>
    </AppWrapper>
  )
}

export default Page
