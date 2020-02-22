const personMethods = ({
  backend,
  refresh,
  mergeData,
  subMergeData,
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
  const createPerson = data => {
    setLoading(true)
    return backend
      .createPerson(data, token)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          updatePeople(res.data.person, res.data.person.handle)
          setNotification({
            type: 'success',
            msg: translate('app.created')
          })
          navigate(`/people/${res.data.person.handle}/`)
        }
      })
      .catch(error => {
        setLoading(false)
        showError(error)
      })
  }

  const updatePerson = (handle, data, to = false) => {
    setLoading(true)
    let field = `app.${data[1]}`
    let avatar = false
    if (field === 'app.breasts') field = 'app.chest'
    else if (field === 'app.units') field = 'account.units'
    else if (field === 'app.picture') {
      field = 'account.avatar'
      avatar = true
    }
    field = translate(field)
    return savePerson(handle, data)
      .then(res => {
        if (!avatar) setLoading(false)
        if (res.status === 200) {
          if (avatar) {
            // This is more complex, so just fetch the entire account from the backend
            refresh().then(res => {
              setLoading(false)
              if (to) navigate(to)
            })
          } else {
            setPeople(subMergeData(people, data, handle))
            if (to) navigate(to)
          }
          setNotification({
            type: 'success',
            msg: translate('app.fieldSaved', { field })
          })
        } else {
          console.log('Could not save account', res)
          setNotification({
            type: 'error',
            msg: translate('errors.something')
          })
        }
      })
      .catch(error => showError(error))
  }

  const removePerson = handle => {
    setLoading(true)
    let newPeople = { ...people }
    delete newPeople[handle]
    setPeople(newPeople)
    return backend
      .removePerson(handle, token)
      .then(res => {
        setLoading(false)
        if (res.status === 204) {
          setNotification({
            type: 'success',
            msg: translate('app.fieldRemoved', { field: translate('app.person') })
          })
          navigate('/people/')
        }
      })
      .catch(error => {
        setLoading(false)
        showError(error)
      })
  }

  const isUsernameAvailable = username => {
    return backend
      .availableUsername({ username }, token)
      .then(res => {
        if (res.status === 200) return true
        else return false
      })
      .catch(error => console.log('Invalid username'))
  }

  const savePerson = (handle, data) => backend.savePerson(handle, mergeData({}, data), token)

  const updatePeople = (value, l1, l2, l3) => setPeople(mergeData(people, [value, l1, l2, l3]))

  return {
    createPerson,
    updatePerson,
    removePerson,
    savePerson,
    updatePeople,
    isUsernameAvailable
  }
}

export default personMethods
