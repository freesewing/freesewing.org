import Backend from '@freesewing/utils/backend'
import { navigate } from 'gatsby'

function useBackend(props) {
  const backend = new Backend(process.env.GATSBY_BACKEND)

  const token = props.storageData.token

  const saveAccountToStorage = (data, callback) => {
    if (data.account) props.updateStorageData(data.account, 'account')
    if (data.models) props.updateStorageData(data.models, 'models')
    if (data.recipes) props.updateStorageData(data.recipes, 'recipes')
    if (data.token) props.updateStorageData(data.token, 'token')
    if (callback) callback()
  }

  const impersonateAccountInStorage = data => {
    props.updateStorageData(JSON.parse(JSON.stringify(props.storageData)), 'admin')
    saveAccountToStorage(data)
  }

  const refreshAccount = (callback = false) => {
    backend
      .account(token)
      .then(res => {
        if (res.status === 200) saveAccountToStorage(res.data, callback)
      })
      .catch(err => {
        return false
      })
  }

  const login = (username, password, language, setInactive) => {
    props.startLoading()
    backend
      .login(username, password)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          props.stopLoading()
          props.showNotification(
            'success',
            props.intl.formatMessage(
              { id: 'app.goodToSeeYouAgain' },
              { user: '@' + res.data.account.username }
            )
          )
          saveAccountToStorage(res.data)
          navigate('/account', { replace: true })
        }
      })
      .catch(err => {
        props.stopLoading()
        if(err.message.slice(-3) === '403') {
          resendActivationEmail(username, language, setInactive)
          //setInactive(true)
        }
        props.showNotification('error', err)
      })
  }

  const confirmationLogin = id => {
    props.startLoading()
    backend
      .confirmationLogin(id)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading()
          props.showNotification(
            'success',
            props.intl.formatMessage(
              { id: 'app.goodToSeeYouAgain' },
              { user: '@' + res.data.account.username }
            )
          )
          saveAccountToStorage(res.data)
          navigate('/account', { replace: true })
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const saveAccount = (data, field, to = false) => {
    props.startLoading()
    backend
      .saveAccount(data, token)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading()
          props.showNotification(
            'success',
            props.intl.formatMessage({ id: 'app.fieldSaved' }, { field: field })
          )
          saveAccountToStorage(res.data)
          navigate(to ? to : '/account/settings', { replace: true })
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const saveModel = (handle, data, field, to = false) => {
    props.startLoading()
    backend
      .saveModel(handle, data, token)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading()
          refreshAccount()
          props.showNotification(
            'success',
            props.intl.formatMessage({ id: 'app.fieldSaved' }, { field: field })
          )
          if (to) navigate(to)
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const saveRecipe = (handle, data, field, to = false) => {
    props.startLoading()
    backend
      .saveRecipe(handle, data, token)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading()
          refreshAccount()
          props.showNotification(
            'success',
            props.intl.formatMessage({ id: 'app.fieldSaved' }, { field: field })
          )
          if (to) navigate(to)
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const isUsernameAvailable = (username, setResult) => {
    backend
      .availableUsername({ username }, token)
      .then(res => {
        if (res.status === 200) setResult(true)
        else setResult(false)
      })
      .catch(err => setResult(false))
  }

  const signup = (email, password, language, setResult) => {
    backend
      .signup(email, password, language)
      .then(res => {
        if (res.status === 200) setResult(true)
        else setResult(false, res)
      })
      .catch((err, foo) => setResult(false, { error: err, data: err.response.data }))
  }

  const resendActivationEmail = (email, language, setResult) => {
    backend
      .resendActivationEmail(email, language)
      .then(res => {
        if (res.status === 200) setResult(true)
        else setResult(false, res)
      })
      .catch((err, foo) => setResult(false, { error: err, data: err.response.data }))
  }

  const createAccount = (confirmId, consent, setResult) => {
    props.startLoading()
    backend
      .createAccount(confirmId, consent)
      .then(res => {
        if (res.status === 200) {
          props.showNotification(
            'success',
            props.intl.formatMessage({ id: 'app.accountCreated' }) +
              ' 🙌  ' +
              props.intl.formatMessage({ id: 'app.welcomeAboard' }) +
              ' 🎉'
          )
          saveAccountToStorage(res.data)
          navigate('/welcome', { replace: true })
        } else setResult(res)
      })
      .catch((err, foo) => setResult(false, { error: err, data: err.response.data }))
  }

  const createModel = model => {
    props.startLoading()
    backend
      .createModel(model, token)
      .then(res => {
        if (res.status === 200) {
          props.showNotification('success', props.intl.formatMessage({ id: 'app.created' }))
          saveAccountToStorage(res.data)
          navigate('/models/' + res.data.model.handle, { replace: true })
          refreshAccount()
        } else
          props.showNotification('error')
      })
      .catch((err, foo) => {
        props.showNotification('error', err)
        props.stopLoading()
      })
  }

  const createRecipe = (data, setResult) => {
    props.startLoading()
    backend
      .createRecipe(data, token)
      .then(res => {
        if (res.status === 200) {
          props.showNotification('success', props.intl.formatMessage({ id: 'app.created' }))
          refreshAccount(navigate('/recipes/' + res.data.handle, { replace: true }))
        } else setResult(false, res)
      })
      .catch((err, foo) => {
        setResult(false, { error: err, data: err.response.data })
        props.stopLoading()
      })
  }

  const removeRecipe = handle => {
    props.startLoading()
    backend
      .removeRecipe(handle, token)
      .then(res => {
        if (res.status === 204) {
          props.stopLoading()
          props.showNotification('success', props.intl.formatMessage({ id: 'account.success' }))
          navigate('/recipes', { replace: true })
          refreshAccount()
        }
      })
      .catch(err => console.log(err))
  }

  const removeModel = handle => {
    props.startLoading()
    backend
      .removeModel(handle, token)
      .then(res => {
        if (res.status === 204) {
          props.stopLoading()
          props.showNotification(
            'success',
            props.intl.formatMessage(
              { id: 'app.fieldRemoved' },
              { field: props.intl.formatMessage({ id: 'app.model' }) }
            )
          )
          navigate('/models', { replace: true })
          refreshAccount()
        }
      })
      .catch(err => console.log(err))
  }

  const exportAccount = () => {
    props.startLoading()
    backend
      .export(token)
      .then(res => {
        props.stopLoading()
        if (res.status === 200) {
          if (typeof window !== 'undefined') window.location.href = res.data.export
        }
      })
      .catch(err => console.log(err))
  }

  const removeAccount = () => {
    props.startLoading()
    backend
      .remove(token)
      .then(res => {
        if (res.status === 200) {
          props.updateStorageData(null, 'account')
          props.updateStorageData(null, 'models')
          props.updateStorageData(null, 'recipes')
          props.updateStorageData(null, 'token')
          props.stopLoading()
          props.showNotification(
            'success',
            props.intl.formatMessage({ id: 'account.accountRemoved' })
          )
          navigate('/', { replace: true })
        }
      })
      .catch(err => console.log(err))
  }

  const logout = username => {
    props.startLoading()
    props.updateStorageData(null, 'account')
    props.updateStorageData(null, 'models')
    props.updateStorageData(null, 'recipes')
    props.updateStorageData(null, 'token')
    props.stopLoading()
    props.showNotification(
      'success',
      props.intl.formatMessage({ id: 'app.seeYouLaterUser' }, { user: username })
    )
    navigate('/', { replace: true })
  }

  const loadPatrons = setResult => {
    backend
      .loadPatrons()
      .then(res => {
        if (res.status === 200) setResult(true, res.data)
        else setResult(false, res)
      })
      .catch((err, foo) => setResult(false, { error: err, data: err.response.data }))
  }

  const loadProfile = (username, setResult) => {
    backend
      .profile(username, token)
      .then(res => {
        if (res.status === 200) setResult(true, res.data)
        else setResult(false, res)
      })
      .catch((err, foo) => setResult(false, { error: err, data: err.response.data }))
  }

  const loadRecipe = (handle, setResult) => {
    backend
      .loadRecipe(handle, token)
      .then(res => {
        if (res.status === 200) setResult(true, res.data)
        else setResult(false, res)
      })
      .catch((err, foo) => setResult(false, { error: err, data: err.response.data }))
  }

  const initOauth = (data, setResult) => {
    backend
      .initOauth(data)
      .then(res => {
        if (res.status === 200) setResult(true, data.provider, res.data)
        else setResult(false, res)
      })
      .catch((err, foo) => setResult(false, data.provider, { error: err, data: err.response.data }))
  }

  const loginOauth = (data, setResult) => {
    backend
      .providerLogin(data)
      .then(res => {
        if (res.status === 200) {
          saveAccountToStorage(res.data)
          props.showNotification(
            'success',
            props.intl.formatMessage(
              { id: 'app.goodToSeeYouAgain' },
              { user: '@' + res.data.account.username }
            )
          )
          setResult(true, res.data.signup)
        } else setResult(false, res)
      })
      .catch((err, foo) => setResult(false, { error: err, data: err.response.data }))
  }

  const restrictAccount = () => {
    props.startLoading()
    backend
      .restrict(token)
      .then(res => {
        if (res.status === 200) {
          props.updateStorageData(null, 'account')
          props.updateStorageData(null, 'models')
          props.updateStorageData(null, 'recipes')
          props.updateStorageData(null, 'token')
          props.stopLoading()
          props.showNotification(
            'success',
            props.intl.formatMessage({ id: 'app.accountRestricted' })
          )
          navigate('/', { replace: true })
        }
      })
      .catch((err, foo) => console.log({ error: err, data: err.response.data }))
  }

  const recoverAccount = username => {
    props.startLoading()
    backend
      .recoverAccount(username)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading()
          props.showNotification(
            'success',
            props.intl.formatMessage({ id: 'app.checkInboxClickLinkInConfirmationEmail' })
          )
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const adminSearch = (query, saveResult) => {
    props.startLoading()
    backend.adminSearch(query, token)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading()
          saveResult(res.data)
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const adminSetPatronStatus = (data, saveResult) => {
    props.startLoading()
    backend.adminSetPatronStatus(data, token)
      .then(res => {
        props.stopLoading()
        if (res.status === 200) {
          saveResult(res.data)
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const adminSetRole = (data, saveResult) => {
    props.startLoading()
    backend.adminSetRole(data, token)
      .then(res => {
        props.stopLoading()
        if (res.status === 200) {
          saveResult(res.data)
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const adminUnfreeze = (data, saveResult) => {
    props.startLoading()
    backend.adminUnfreeze(data, token)
      .then(res => {
        props.stopLoading()
        if (res.status === 200) {
          saveResult(res.data)
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  const adminImpersonate = (data, saveResult) => {
    props.startLoading()
    backend.adminImpersonate(data, token)
      .then(res => {
        props.stopLoading()
        if (res.status === 200) {
          props.showNotification(
            'success',
            props.intl.formatMessage(
              { id: 'app.goodToSeeYouAgain' },
              { user: '@' + res.data.account.username }
            )
          )
          impersonateAccountInStorage(res.data)
        }
      })
      .catch(err => {
        props.stopLoading()
        console.log(err)
        props.showNotification('error', err)
      })
  }

  return {
    createAccount,
    createModel,
    createRecipe,
    exportAccount,
    initOauth,
    isUsernameAvailable,
    loadPatrons,
    loadProfile,
    loadRecipe,
    login,
    confirmationLogin,
    loginOauth,
    logout,
    recoverAccount,
    resendActivationEmail,
    restrictAccount,
    removeModel,
    removeRecipe,
    removeAccount,
    refreshAccount,
    saveAccount,
    saveModel,
    saveRecipe,
    signup,
    adminSearch,
    adminSetPatronStatus,
    adminSetRole,
    adminUnfreeze,
    adminImpersonate
  }
}

export default useBackend
