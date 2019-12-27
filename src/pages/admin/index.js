import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchHit from '../../components/admin/hit'
import { navigate } from 'gatsby'

const AdminPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle('Administration')
  }, [])

  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])

  const search = e => app.adminSearch(query, setUsers)
  const revert = () => {
    let data = app.frontend.storageData.admin
    if (data.account) app.frontend.updateStorageData(data.account, 'account')
    if (data.models) app.frontend.updateStorageData(data.models, 'models')
    if (data.recipes) app.frontend.updateStorageData(data.recipes, 'recipes')
    if (data.token) app.frontend.updateStorageData(data.token, 'token')
    if (data.token) app.frontend.updateStorageData(false, 'admin')
    navigate('/admin')
  }

  if (app.impersonates)
    return (
      <Button fullWidth onClick={revert} variant="contained" color="primary" size="large">
        Stop impersonating
      </Button>
    )

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          placeholder="Search by username, handle or (complete) email address"
          aria-label="Search by username, handle or (complete) email address"
          onChange={e => setQuery(e.target.value)}
        />
        <p style={{ textAlign: 'center' }}>
          <Button onClick={search} variant="contained" color="primary" size="large">
            Search
          </Button>
        </p>
        {users.map(user => (
          <SearchHit key={user.handle} user={user} search={search} app={props.app} />
        ))}
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(AdminPage)
