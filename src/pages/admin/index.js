import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'
import AuthRequired from '../../components/auth-required'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchHit from '../../components/admin/hit'

const AdminPage = (props) => {
  // Hooks
  const app = useApp()

  // State
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [impersonating, setImpersonating] = useState(false)

  // Effects
  useEffect(() => {
    app.setTitle('Administration')
    // Don't lock an admin impersonating a user out of the interface by not allowing them to undo it
    if (app.admin && app.admin.account.username && app.account.username) setImpersonating(true)
  }, [])

  // Methods
  const search = (e) => {
    app
      .adminSearch(query)
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data)
        }
      })
      .catch((err) => console.log(err))
  }
  const revert = () => {
    app.setLoading(true)
    app.setAccount(app.admin.account)
    app.setPatterns(app.admin.patterns)
    app.setPeople(app.admin.people)
    app.setToken(app.admin.token)
    app.setAdmin(null)
    app.setLoading(false)
    setImpersonating(false)
  }

  if (impersonating)
    return (
      <AppWrapper app={app}>
        <CenteredLayout app={app} top>
          <Button fullWidth onClick={revert} variant="contained" color="primary" size="large">
            Stop impersonating @{app.account.username}
          </Button>
        </CenteredLayout>
      </AppWrapper>
    )
  else
    return (
      <AppWrapper app={app}>
        <CenteredLayout app={app} top wide>
          <AuthRequired app={app} admin>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              placeholder="Search by username, handle or (complete) email address"
              aria-label="Search by username, handle or (complete) email address"
              onChange={(e) => setQuery(e.target.value)}
            />
            <p style={{ textAlign: 'center' }}>
              <Button onClick={search} variant="contained" color="primary" size="large">
                Search
              </Button>
            </p>
            {users.map((user) => (
              <SearchHit key={user.handle} user={user} search={search} app={app} />
            ))}
          </AuthRequired>
        </CenteredLayout>
      </AppWrapper>
    )
}

export default withLanguage(AdminPage)
