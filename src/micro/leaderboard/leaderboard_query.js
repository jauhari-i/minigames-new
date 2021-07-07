import { db } from '../../db/mysqlConnection'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'

export const listLeaderboard = async (gameId, page = 1, size = 10) => {
  return await db
    .query(
      'SELECT count(*) AS total FROM tb_leaderboard WHERE gameId = ?',
      gameId
    )
    .then(async rows => {
      const lRows = rows[0][0].total
      const skip = (page - 1) * size
      const limit = skip + ',' + size

      return await db
        .query(
          'SELECT tb_leaderboard.*, tb_game.*, tb_image.secure_url, tb_users.name, tb_users.email, tb_users.username, FROM tb_leaderboard INNER JOIN tb_game ON tb_leaderboard.gameId=tb_game.gameId INNER JOIN tb_users ON tb_leaderboard.userId=tb_users.userId INNER JOIN tb_image ON tb_game.imageId = tb_image.imageId ORDER BY tb_leaderboard.score DESC LIMIT ' +
            limit
        )
        .then(res => {
          const lItems = res[0]

          const data = lItems.map(item => ({
            leaderboardId: item.leaderboardId,
            teamName: item.teamName,
            teamIcon: item.teamIcon,
            playerDetails: {
              userId: item.userId,
              name: item.name,
              email: item.email,
              username: item.username,
            },
            gameDetail: {
              gameId: item.gameId,
              gameTitle: item.gameTitle,
              gameDescription: item.gameDescription,
              gamePrice: item.gamePrice,
              gameDiscount: item.gameDiscount,
              gamePriceAfterDisc: item.gamePriceAfterDisc,
              gameDifficulty: item.gameDiff,
              gameDuration: item.gameDuration,
              gameRating: item.gameRating,
              gameUrl: item.gameUrl,
              gameCapacity: item.gameCapacity,
              gameActive: item.gameActive === 0 ? false : true,
              gameGenre: JSON.parse(item.gameGenre),
              gameImage: item.secure_url,
            },
            score: item.score,
            createdAt: item.createdAt,
          }))

          const totalPage = Math.ceil(lRows / size)

          const meta = {
            page: Number(page),
            size: Number(size),
            totalData: lRows,
            totalPage,
          }

          return {
            code: OK,
            message: 'Get leaderboard success',
            data: {
              data: data,
              meta,
            },
          }
        })
        .catch(() => {
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          }
        })
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}
