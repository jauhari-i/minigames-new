export const checkExpired = (playDate, timeEnd) => {
  const today = new Date()
  const playingDate = new Date(playDate)

  if (playingDate.setHours(timeEnd, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
    return true
  }

  return false
}
