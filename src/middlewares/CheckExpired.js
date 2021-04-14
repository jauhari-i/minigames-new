export const checkExpired = (playDate, timeEnd) => {
  const today = new Date()
  const playingDate = new Date(playDate)

  if (playingDate.setHours(timeEnd, 0, 0, 0) <= today) {
    return true
  }

  return false
}
