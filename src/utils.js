export const updatePatternData = (value, l1 = false, l2 = false, l3 = false) => {
  if (!l1) return
  let newData = { ...patternData }

  if (l2 && typeof newData[l1] === 'undefined') newData[l1] = {}
  if (l3 && typeof newData[l1][l2] === 'undefined') newData[l1][l2] = {}

  if (l3) newData[l1][l2][l3] = value
  else if (l2) newData[l1][l2] = value
  else newData[l1] = value
  setPatternData(newData)
}
