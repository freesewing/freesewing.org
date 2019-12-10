import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchHit from './hit'
import { navigate } from 'gatsby'

const AdminIndex = props => {
  useEffect(() => {
    props.app.frontend.setTitle('Administration')
  }, [props.slug])
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])

  const search = e => props.app.backend.adminSearch(query, setUsers)
  const revert = () => {
    let data = props.app.frontend.storageData.admin
    if (data.account) props.app.frontend.updateStorageData(data.account, 'account')
    if (data.models) props.app.frontend.updateStorageData(data.models, 'models')
    if (data.recipes) props.app.frontend.updateStorageData(data.recipes, 'recipes')
    if (data.token) props.app.frontend.updateStorageData(data.token, 'token')
    if (data.token) props.app.frontend.updateStorageData(false, 'admin')
    navigate('/admin')
  }

  if (props.app.impersonates)
    return (
      <Button fullWidth onClick={revert} variant="contained" color="primary" size="large">
        Stop impersonating
      </Button>
    )

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default AdminIndex
