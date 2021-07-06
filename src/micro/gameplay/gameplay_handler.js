import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'
import { validateJoin, validateSave } from '../validation'
import { joinQuery, saveQuery } from './gameplay_query'

export const joinGame = async (req, res) => {
  const { userId, body } = req

  const validation = await validateJoin(body)

  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
    })
  } else {
    const query = await joinQuery(userId, body.uniqueCode)

    if (!query.code) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      })
    } else {
      return res.status(query.code).json(query)
    }
  }
}
export const saveGame = async (req, res) => {
  const { userId, body } = req

  const validation = await validateSave(body)

  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
    })
  } else {
    const query = await saveQuery(userId, body)

    if (!query.code) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      })
    } else {
      return res.status(query.code).json(query)
    }
  }
}
