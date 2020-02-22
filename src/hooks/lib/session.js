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
            msg: translate('app.goodToSeeYouAgain', { user: '@' + res.data.account.username })
          })
        } else console.log('res in hook', res)
        return res.status
      })
      .catch(error => {
        setLoading(false)
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
            msg: translate('app.goodToSeeYouAgain', { user: '@' + res.data.account.username })
          })
        } else return res.status
      })
      .catch(error => {
        showError(error)
        if (error.response) return error.response.status
        else return error
      })
  }

  const providerLogin = data => {
    setLoading(true)
    return backend
      .providerLogin(data)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          persist(res.data)
          if (res.data.signup) navigate('/welcome/')
          else {
            navigate('/account/')
            setNotification({
              type: 'success',
              msg: translate('app.goodToSeeYouAgain', { user: '@' + res.data.account.username })
            })
          }
        } else return res.status
      })
      .catch(error => {
        showError(error)
        if (error.response) return error.response.status
        else return error
      })
  }
  const logout = () => {
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
    providerLogin,
    logout
  }
}

export default sessionMethods
