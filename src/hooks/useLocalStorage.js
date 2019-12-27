import { useState } from 'react'

// See: https://usehooks.com/useLocalStorage/

function useLocalStorage(key, initialValue) {
  const prefix = 'fs_'
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(prefix + key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(prefix + key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
