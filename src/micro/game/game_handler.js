import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'
import { findGame, insertGame } from './game_query'

import { validateGame } from '../validation'

export const addGame = async (req, res) => {
  const data = req.body

  const validation = await validateGame(data)

  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
    })
  } else {
    const query = await insertGame(data)

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

export const listGameAdmin = async (req, res) => {
  const {
    query: { page, size },
  } = req

  const query = await findGame(page, size)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
