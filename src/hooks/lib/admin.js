const adminMethods = ({
  backend,
  mergeData,
  token,
  setToken,
  setLoading,
  persist,
  navigate,
  setNotification,
  translate,
  showError,
  account,
  people,
  patterns,
  setAccount,
  setPatterns,
  setPeople,
  setAdmin,
  admin
}) => {
  const adminSearch = query => backend.adminSearch(query, token)

  const adminSetPatronStatus = (handle, patron) => {
    setLoading(true)
    backend
      .adminSetPatronStatus({ handle, patron }, token)
      .then(res => {
        if (res.status === 200) {
          setLoading(false)
          setNotification({
            type: 'success',
            msg: 'Patron status set to ' + patron
          })
        } else {
          setNotification({
            type: 'error',
            msg: 'Return status code was not 200'
          })
        }
      })
      .catch(err => {
        setLoading(false)
        setNotification({
          type: 'error',
          msg: err
        })
      })
  }

  const adminSetRole = (handle, role) => {
    setLoading(true)
    backend
      .adminSetRole({ handle, role }, token)
      .then(res => {
        if (res.status === 200) {
          setLoading(false)
          setNotification({
            type: 'success',
            msg: 'Role set to ' + role
          })
        } else {
          setNotification({
            type: 'error',
            msg: 'Return status code was not 200'
          })
        }
      })
      .catch(err => {
        setLoading(false)
        setNotification({
          type: 'error',
          msg: err
        })
      })
  }

  const adminUnfreeze = handle => {
    setLoading(true)
    backend
      .adminUnfreeze({ handle }, token)
      .then(res => {
        if (res.status === 200) {
          setLoading(false)
          setNotification({
            type: 'success',
            msg: 'Account unfrozen'
          })
        } else {
          setNotification({
            type: 'error',
            msg: 'Return status code was not 200'
          })
        }
      })
      .catch(err => {
        setLoading(false)
        setNotification({
          type: 'error',
          msg: err
        })
      })
  }

  const adminImpersonate = handle => {
    setLoading(true)
    backend
      .adminImpersonate({ handle }, token)
      .then(res => {
        if (res.status === 200) {
          // Save current user data to admin.user
          setAdmin({ account, patterns, people, token })
          setAccount(res.data.account)
          setPatterns(res.data.patterns)
          setPeople(res.data.people)
          setToken(res.data.token)
          setLoading(false)
          setNotification({
            type: 'success',
            msg: translate('app.goodToSeeYouAgain', { user: '@' + res.data.account.username })
          })
        } else {
          setNotification({
            type: 'error',
            msg: 'Return status code was not 200'
          })
        }
      })
      .catch(err => {
        setLoading(false)
        setNotification({
          type: 'error',
          msg: err
        })
      })
  }

  return {
    adminSearch,
    adminSetPatronStatus,
    adminSetRole,
    adminUnfreeze,
    adminImpersonate
  }
}

export default adminMethods
