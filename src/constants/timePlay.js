export const timeArray = [
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
]

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
