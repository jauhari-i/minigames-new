export const timeArray = [7, 9, 12, 14, 16, 19, 21]

export const getTimeStart = t => {
  const tIndex = t - 1
  return timeArray[tIndex]
}

export const getTimeEnd = (t, d) => {
  const tIndex = t - 1
  const timeUser = timeArray[tIndex]
  const hDuration = d / 60
  return timeUser + hDuration
}
