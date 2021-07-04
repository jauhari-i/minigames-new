import { db } from '../../db/mysqlConnection'

export const getAdminEmails = async () => {
  return await db
    .query('SELECT email FROM tb_admin')
    .then(result => {
      const row = result[0]
      const emails = row.map(item => item.email)
      return emails
    })
    .catch(() => {
      return []
    })
}

export const getUserException = async () => {
  return await db.query('SELECT username, email FROM tb_users').then(result => {
    const row = result[0]
    const username = row.map(item => item.username)
    const emails = row.map(item => item.email)
    return { username, emails }
  })
}

export const getGameNames = async () => {
  return await db
    .query('SELECT gameTitle FROM tb_game')
    .then(result => {
      const row = result[0]
      const title = row.map(item => item.gameTitle)
      return title
    })
    .catch(() => {
      return []
    })
}

export const getGameUpdateNames = async gameId => {
  return await db
    .query(`SELECT gameTitle FROM tb_game WHERE gameId != ${gameId}`)
    .then(result => {
      const row = result[0]
      const title = row.map(item => item.gameTitle)
      return title
    })
    .catch(() => {
      return []
    })
}

export const getUserIds = async () => {
  return await db
    .query('SELECT userId FROM tb_users')
    .then(result => {
      const row = result[0]
      const members = row.map(item => item.userId)
      return members
    })
    .catch(() => {
      return []
    })
}
