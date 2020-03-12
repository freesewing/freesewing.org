import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { navigate as gatsbyNavigate } from 'gatsby'
import Backend from '@freesewing/utils/backend'
import { useIntl } from 'react-intl'

import useLocalStorage from './useLocalStorage'
import accountMethods from './lib/account'
import personMethods from './lib/person'
import patternMethods from './lib/pattern'
import sessionMethods from './lib/session'
import adminMethods from './lib/admin'

function useApp() {
  // Environment

  // Backend
  const backend = new Backend(process.env.GATSBY_BACKEND)

  // i18n
  const intl = useIntl()

  // Persistent state
  const [admin, setAdmin] = useLocalStorage('admin', null)
  const [account, setAccount] = useLocalStorage('account', { username: false })
  const [people, setPeople] = useLocalStorage('people', {})
  const [patterns, setPatterns] = useLocalStorage('patterns', {})
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [token, setToken] = useLocalStorage('token')
  const [notification, setNotification] = useLocalStorage('notification')
  // Various stuff we may need to hold on to between page loads
  const [vars, setVars] = useLocalStorage('vars', {})

  // React State
  const [crumbs, setCrumbs] = useState([])
  const [description, setDescription] = useState(false)
  const [image, setImage] = useState(`https://freesewing.org/share/language.wide.jpg`)
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState(false)
  const [mobileAside, setMobileAside] = useState(false)
  const [title, setTitle] = useState('FreeSewing')

  /*
   * Helper method to merge data objects
   * This can be used as-is for the account object
   * For a collection of objects (like people and patterns)
   * you'll need to call subMergeData instead
   */
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

  // Helper method to merge data into a top-level property of a data object
  const subMergeData = (orig, toMerge, key) => {
    let [value, l1 = false, l2 = false] = toMerge
    return mergeData(orig, [value, key, l1, l2])
  }

  // Persist user data to local storage
  const persist = data => {
    if (data.account) setAccount(data.account)
    if (data.people) setPeople(data.people)
    if (data.patterns) setPatterns(data.patterns)
    if (data.theme) setTheme(data.theme)
    if (data.token) setToken(data.token)
    if (data.vars) setVar(data.vars)
  }

  // Refresh user data from backend
  const refresh = () => {
    return backend
      .account(token)
      .then(res => {
        if (res.status === 200) persist(res.data)
        else console.log('Loading account data did not return 200', res)
      })
      .catch(error => showError(error))
  }

  // SSR-save navigate method
  const navigate = slug => {
    if (typeof window !== 'undefined') gatsbyNavigate(slug)
  }

  // Translate helper method
  const translate = (id, values = false) => {
    if (!values) return intl.formatMessage({ id })
    else return intl.formatMessage({ id }, values)
  }

  // Error handling
  const showError = error => {
    setLoading(false)
    setNotification({
      type: 'error',
      msg: error
    })
  }

  // Toggles
  const toggleDarkMode = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const toggleMenu = () => setMenu(!menu)
  const toggleMobileAside = () => setMobileAside(!mobileAside)
  const closeNav = evt => {
    if (typeof evt.target.className === 'object') {
      if (evt.target.className.baseVal.indexOf('o-closenav') === -1) return setMenu(false)
    } else if (evt.target.className.indexOf('o-closenav') === -1) return setMenu(false)
  }

  // Media queries
  const mobile = useMediaQuery('(max-width:599px)')
  const tablet = useMediaQuery('(min-width: 600px) and (max-width: 959px)')

  // These are user in other methods
  let core = {
    // Helper methods
    backend,
    refresh,
    mergeData,
    subMergeData,
    persist,
    navigate,
    translate,
    showError,
    // React state
    loading,
    setLoading,
    // Persistent state
    admin,
    setAdmin,
    account,
    setAccount,
    people,
    setPeople,
    patterns,
    setPatterns,
    notification,
    setNotification,
    token,
    setToken,
    theme,
    setTheme,
    vars,
    setVars
  }

  return {
    ...core,
    ...accountMethods(core),
    ...personMethods(core),
    ...patternMethods(core),
    ...sessionMethods(core),
    ...adminMethods(core),

    // React state
    crumbs,
    setCrumbs,
    description,
    setDescription,
    image,
    setImage,
    menu,
    setMenu,
    mobileAside,
    setMobileAside,
    title,
    setTitle,

    // Toggles
    toggleDarkMode,
    toggleMenu,
    toggleMobileAside,
    closeNav,

    // Translation
    translate,
    intl,

    // Media queries
    mobile,
    tablet,

    // Site language
    language: process.env.GATSBY_LANGUAGE
  }
}

export default useApp
