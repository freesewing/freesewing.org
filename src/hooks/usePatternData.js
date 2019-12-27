import { useState } from 'react'

function usePatternData({ initialData }) {
  // State
  const [data, setData] = useState(initialData || {})

  const importPatternData = () => {
    if (typeof data.settings === 'undefined') updatePatternData({}, 'settings')
    if (typeof data.settings.options === 'undefined') updatePatternData({}, 'settings', 'options')
    if (typeof data.settings !== 'undefined') {
      // Load settings
      for (let key of Object.keys(data.settings)) {
        if (key !== 'options') updatePatternData(data.settings[key], 'settings', key)
      }
      if (typeof data.settings.options !== 'undefined') {
        // Load options
        for (let key of Object.keys(data.settings.options)) {
          this.updatePatternData(data.settings.options[key], 'settings', 'options', key)
        }
      }
    }
    // Load root level keys
    for (let key of Object.keys(data)) {
      if (key !== 'settings') updatePatternData(data[key], key)
    }
  }

  const updatePatternData = (value, l1 = false, l2 = false, l3 = false) => {
    if (!l1) return
    let newData = { ...data }

    if (l2 && typeof newData[l1] === 'undefined') newData[l1] = {}
    if (l3 && typeof newData[l1][l2] === 'undefined') newData[l1][l2] = {}

    if (l3) newData[l1][l2][l3] = value
    else if (l2) newData[l1][l2] = value
    else newData[l1] = value
    setData(newData)
  }

  return {
    patternData: data,
    importPatternData,
    setPatterndata: setData,
    updatePatternData
  }
}

export default usePatternData
