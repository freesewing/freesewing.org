import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import AuthRequired from '../../components/auth-required'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchHitUser from '../../components/admin/user-hit'
import SearchHitPerson from '../../components/admin/person-hit'

const Page = (props) => {
  const app = useApp()

  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [people, setPeople] = useState([])
  const [impersonating, setImpersonating] = useState(false)

  // Effects
  useEffect(() => {
    // Don't lock an admin impersonating a user out of the interface by not allowing them to undo it
    if (app.admin && app.admin.account.username && app.account.username) setImpersonating(true)
  }, [])

  // Methods
  const search = (e) => {
    app
      .adminSearch(query)
      .then((res) => {
        if (res.status === 200) {
          // FIXME: No need to support both once backend is migrated
          if (res.data?.users) {
            setUsers(res.data.users)
            setPeople(res.data.people)
          } else if (res.data) setUsers(res.data)
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
      <AppWrapper app={app} title="Administration" active="account">
        <Button fullWidth onClick={revert} variant="contained" color="primary" size="large">
          Stop impersonating @{app.account.username}
        </Button>
      </AppWrapper>
    )
  else
    return (
      <AppWrapper app={app} title="Administration" active="account">
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
            <SearchHitUser key={user.handle} user={user} search={search} app={app} />
          ))}
          {people.map((person) => (
            <SearchHitPerson key={person.handle} person={person} search={search} app={app} />
          ))}
        </AuthRequired>
      </AppWrapper>
    )
}

export default Page
