import { findUsers, findUsersById, findUsersName } from './user_query'

export const listUsers = async (req, res) => {
  const {
    query: { page, size },
  } = req
  const users = await findUsers(page, size)
  res.status(users.code).json(users)
}

export const listNames = async (req, res) => {
  const users = await findUsersName()
  res.status(users.code).json(users)
}

export const detailUser = async (req, res) => {
  const {
    params: { userId },
  } = req
  const user = await findUsersById(userId)
  res.status(user.code).json(user)
}
