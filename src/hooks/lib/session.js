const sessionMethods = ({
  backend,
  mergeData,
  token,
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
  setPeople
}) => {
  const login = (username, password) => {
    setLoading(true)
    return backend
      .login(username, password)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          persist(res.data)
          navigate('/account')
          setNotification({
            type: 'success',
            msg: app.translate('app.goodToSeeYouAgain', { user: '@' + res.data.account.username })
          })
        } else return res.status
      })
      .catch(error => {
        showError(error)
        if (error.response) return error.response.status
        else return error
      })
  }

  const confirmationLogin = id => {
    setLoading(true)
    return backend
      .confirmationLogin(id)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          persist(res.data)
          navigate('/account')
          setNotification({
            type: 'success',
            msg: app.translate('app.goodToSeeYouAgain', { user: '@' + res.data.account.username })
          })
        } else return res.status
      })
      .catch(error => {
        showError(error)
        if (error.response) return error.response.status
        else return error
      })
  }

  const logout = () => {
    setLoading(true)
    navigate('/')
    setNotification({
      type: 'success',
      msg: translate('app.seeYouLaterUser', { user: account.username })
    })
    persist({
      account: { username: false },
      models: {},
      patterns: {},
      token: ''
    })
  }

  return {
    login,
    confirmationLogin,
    logout
  }
}

export default sessionMethods
