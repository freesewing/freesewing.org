import { useState } from 'react'

function useMergeData(initialData) {
  const [data, setData] = useState(initialData)

  const mergeData = (value, l1 = false, l2 = false, l3 = false) => {
    if (!l1) return
    let newData = { ...data }

    if (l2 && typeof newData[l1] === 'undefined') newData[l1] = {}
    if (l3 && typeof newData[l1][l2] === 'undefined') newData[l1][l2] = {}

    if (l3) newData[l1][l2][l3] = value
    else if (l2) newData[l1][l2] = value
    else newData[l1] = value
    setData(newData)

    return newData
  }

  return [data, setData, mergeData]
}

export default useMergeData
