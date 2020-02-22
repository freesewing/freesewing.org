const accountMethods = ({
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
  const createAccount = (confirmId, consent) => {
    setLoading(true)
    return backend
      .createAccount(confirmId, consent)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          persist(res.data)
          navigate('/account')
          setNotification({
            type: 'success',
            msg: translate('app.accountCreated') + ' 🙌  ' + tranlate('app.welcomeAboard') + ' 🎉'
          })
        } else return res.status
      })
      .catch(error => {
        showError(error)
        if (error.response) return error.response.status
        else return error
      })
  }

  const updateAccount = (data, to = false) => {
    setLoading(true)
    saveAccount(data)
      .then(res => {
        if (res.status === 200) setAccount(mergeData(account, data))
        else console.log('Could not save account', res)
        setLoading(false)
        if (to) navigate(to)
        let field = translate(`account.${data[1]}`)
        if (data[1] === 'settings') field = translate(`account.${data[2]}`)
        setNotification({
          type: 'success',
          msg: translate('app.fieldSaved', { field })
        })
      })
      .catch(error => showError(error))
  }

  const exportAccount = () => {
    setLoading(true)
    backend
      .export(token)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          if (typeof window !== 'undefined') window.location.href = res.data.export
        }
      })
      .catch(error => showError(error))
  }

  const removeAccount = () => {
    setLoading(true)
    backend
      .remove(token)
      .then(res => {
        if (res.status === 200) {
          persist({
            account: { username: false },
            people: {},
            patterns: {},
            token: ''
          })
          setNotification({
            type: 'success',
            msg: translate('account.accountRemoved')
          })
          navigate('/')
        }
      })
      .catch(error => showError(error))
  }

  const restrictAccount = () => {
    setLoading(true)
    backend
      .restrict(token)
      .then(res => {
        if (res.status === 200) {
          persist({
            account: { username: false },
            people: {},
            patterns: {},
            token: ''
          })
          setNotification({
            type: 'success',
            msg: translate('app.accountRestricted')
          })
          navigate('/')
        }
      })
      .catch(error => showError(error))
  }

  const recoverAccount = username => {
    setLoading(true)
    backend
      .recoverAccount(username)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          setNotification({
            type: 'success',
            msg: translate('app.checkInboxClickLinkInConfirmationEmail')
          })
        }
      })
      .catch(error => showError(error))
  }

  const loadProfile = handle => backend.profile(handle, token)
  const signup = (email, password, language) => backend.signup(email, password, language)
  const saveAccount = data => backend.saveAccount(mergeData({}, data), token)

  return {
    createAccount,
    updateAccount,
    exportAccount,
    removeAccount,
    restrictAccount,
    recoverAccount,
    signup,
    loadProfile,
    saveAccount
  }
}

export default accountMethods
