import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { navigate } from 'gatsby'
import Backend from '@freesewing/utils/backend'
import { useIntl } from 'react-intl'

import useLocalStorage from './useLocalStorage'

function useApp(slug = null) {
  // Environment
  const language = process.env.GATSBY_LANGUAGE

  // Backend
  const backend = new Backend(process.env.GATSBY_BACKEND)

  // i18n
  const intl = useIntl()

  // Persistent state
  const [account, setAccount] = useLocalStorage('account', { username: false })
  const [models, setModels] = useLocalStorage('models', {})
  const [patterns, setPatterns] = useLocalStorage('patterns', {})
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [token, setToken] = useLocalStorage('token')
  const [notification, setNotification] = useLocalStorage('notification')

  // React State
  const [crumbs, setCrumbs] = useState([])
  const [description, setDescription] = useState(false)
  const [image, setImage] = useState(`https://freesewing.org/share/language.wide.jpg`)
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState(false)
  const [title, setTitle] = useState('FreeSewing')

  // Methods

  // Error handling
  const showError = error => {
    setLoading(false)
    setNotification({
      type: 'error',
      msg: error
    })
  }

  // Persist user data to local storage
  const persist = data => {
    if (data.account) setAccount(data.account)
    if (data.models) setModels(data.models)
    if (data.patterns) setPatterns(data.patterns)
    if (data.theme) setTheme(data.theme)
    if (data.token) setToken(data.token)
  }

  // Update user data
  const saveAccount = data => backend.saveAccount(mergeData({}, data), token)
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
  const updateModels = (value, l1, l2, l3) => setModels(mergeData(models, [value, l1, l2, l3]))
  const updatePatterns = (value, l1, l2, l3) =>
    setPatterns(mergeData(patterns, [value, l1, l2, l3]))
  const mergeData = (orig, toMerge) => {
    let [value, l1 = false, l2 = false, l3 = false] = toMerge
    if (!l1) return
    let data = { ...orig }
    if (l2 && typeof data[l1] === 'undefined') data[l1] = {}
    if (l3 && typeof data[l1][l2] === 'undefined') data[l1][l2] = {}
    if (l3) data[l1][l2][l3] = value
    else if (l2) data[l1][l2] = value
    else data[l1] = value

    return data
  }

  // Refresh user data from backend
  const refresh = () => {
    backend
      .account(token)
      .then(res => {
        if (res.status === 200) persist(res.data)
        else console.log('Loading account data did not return 200', res)
      })
      .catch(error => showError(error))
  }

  // Login user
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

  // Login user from confirmation
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

  // Create account
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
            msg:
              app.translate('app.accountCreated') +
              ' 🙌  ' +
              app.tranlate('app.welcomeAboard') +
              ' 🎉'
          })
        } else return res.status
      })
      .catch(error => {
        showError(error)
        if (error.response) return error.response.status
        else return error
      })
  }

  // Logout user
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

  // Check whether username is available
  const isUsernameAvailable = username => {
    return backend
      .availableUsername({ username }, token)
      .then(res => {
        if (res.status === 200) return true
        else return false
      })
      .catch(error => console.log('Invalid username'))
  }

  // Remove account !
  const removeAccount = () => {
    setLoading(true)
    backend
      .remove(token)
      .then(res => {
        if (res.status === 200) {
          persist({
            account: { username: false },
            models: {},
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

  // Export account
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

  // Restrict (processin of) account (data)
  const restrictAccount = () => {
    setLoading(true)
    backend
      .restrict(token)
      .then(res => {
        if (res.status === 200) {
          persist({
            account: { username: false },
            models: {},
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

  // Save a pattern to account
  const createPattern = data => {
    setLoading(true)
    return backend
      .createPattern(data, token)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          updatePatterns(res.data, res.data.handle)
          setNotification({
            type: 'success',
            msg: translate('app.created')
          })
          navigate(`/patterns/${res.data.handle}/`)
        }
      })
      .catch(error => {
        setLoading(false)
        showError(error)
      })
  }

  // Remove pattern
  const removePattern = handle => {
    setLoading(true)
    let newPatterns = { ...patterns }
    delete newPatterns[handle]
    setPatterns(newPatterns)
    return backend
      .removePattern(handle, token)
      .then(res => {
        setLoading(false)
        if (res.status === 204) {
          setNotification({
            type: 'success',
            msg: translate('app.fieldRemoved', { field: app.transate('app.pattern') })
          })
          navigate('/patterns/')
        }
      })
      .catch(error => {
        setLoading(false)
        showError(error)
      })
  }

  // Update pattern
  const updatePattern = (handle, data) => {
    setLoading(true)
    let newPatterns = { ...patterns }
    newPatterns[handle] = {
      ...newPatterns[handle],
      ...data
    }
    setPatterns(newPatterns)
    return backend
      .savePattern(handle, data, token)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          setNotification({
            type: 'success',
            msg: translate('app.fieldSaved', { field: translate('app.pattern') })
          })
          navigate(`/patterns/${handle}/`)
        }
      })
      .catch(error => {
        setLoading(false)
        showError(error)
      })
  }

  // Translate helper method
  const translate = (id, values = false) => {
    if (!values) return intl.formatMessage({ id })
    else return intl.formatMessage({ id }, values)
  }

  // Toggles
  const toggleDarkMode = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const toggleMenu = () => setMenu(!menu)
  const closeNav = evt => {
    if (typeof evt.target.classList === 'object') {
      console.log(evt.target.classList.contains('MuiExpansionPanelSummary-content'))
      if (!evt.target.classList.contains('MuiExpansionPanelSummary-content')) setMenu(false)
    } else setMenu(false)
  }

  // Media queries
  const mobile = useMediaQuery('(max-width:599px)')
  const tablet = useMediaQuery('(min-width: 600px) and (max-width: 959px)')

  // Return bundle
  return {
    // Persistent state
    account,
    setAccount,
    updateAccount,
    saveAccount,
    models,
    setModels,
    updateModels,
    patterns,
    setPatterns,
    updatePatterns,
    theme,
    setTheme,
    token,
    setToken,
    notification,
    setNotification,

    // React state
    crumbs,
    setCrumbs,
    description,
    setDescription,
    image,
    setImage,
    loading,
    setLoading,
    menu,
    setMenu,
    title,
    setTitle,

    // Methods
    refresh,
    login,
    confirmationLogin,
    createAccount,
    logout,
    isUsernameAvailable,
    removeAccount,
    exportAccount,
    restrictAccount,
    createPattern,
    removePattern,
    updatePattern,

    // Toggles
    toggleDarkMode,
    toggleMenu,
    closeNav,

    // Translation
    translate,
    intl,

    // Media queries
    mobile,
    tablet,

    // Helper vars
    language
  }
}

export default useApp
