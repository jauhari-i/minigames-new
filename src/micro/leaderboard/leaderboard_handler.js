import { INTERNAL_SERVER_ERROR } from 'http-status'
import { listLeaderboard } from './leaderboard_query'

export const getLeaderboard = async (req, res) => {
  const {
    params: { gameId },
    query: { page = 1, size = 10 },
  } = req

  const query = await listLeaderboard(gameId, page, size)

  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
