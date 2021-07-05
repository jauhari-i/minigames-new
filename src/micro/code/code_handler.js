import { INTERNAL_SERVER_ERROR } from 'http-status'
import { findCode } from './code_query'

export const getListCodes = async (req, res) => {
  const {
    query: { page = 1, size = 10 },
  } = req

  const query = await findCode(page, size)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
