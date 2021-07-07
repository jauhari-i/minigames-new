import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import { db } from '../../db/mysqlConnection'

export const findCode = async (page = 1, size = 10) => {
  return await db
    .query('SELECT count(*) as total FROM tb_code')
    .then(async result => {
      const codeRows = result[0][0].total
      const skip = (page - 1) * size
      const limit = skip + ',' + size
      return await db
        .query(
          'SELECT tb_user_game.*, tb_code.*, tb_transaction_item.*, tb_game.*, tb_image.secure_url, tb_users.name, tb_users.email, tb_users.username, tb_items.timeStart, tb_items.timeEnd FROM tb_user_game INNER JOIN tb_code ON tb_user_game.codeId=tb_code.codeId INNER JOIN tb_transaction_item ON tb_code.trItemId=tb_transaction_item.trItemId INNER JOIN tb_game ON tb_transaction_item.gameId=tb_game.gameId INNER JOIN tb_image ON tb_game.imageId = tb_image.imageId INNER JOIN tb_users ON tb_user_game.userId=tb_users.userId INNER JOIN tb_items ON tb_transaction_item.itemId = tb_items.itemId ORDER BY tb_user_game.createdAt DESC LIMIT ' +
            limit
        )
        .then(async codeRow => {
          const codes = await Promise.all(
            codeRow[0].map(async item => {
              const members = await db
                .query(
                  'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
                  [item.itemId]
                )
                .then(res => {
                  const memRow = res[0]
                  const users = memRow.map(m => ({
                    memberId: m.memberId,
                    userId: m.userId,
                    name: m.name,
                    email: m.email,
                    username: m.username,
                  }))
                  return users
                })
                .catch(() => {
                  return []
                })

              return {
                codeId: item.codeId,
                mgId: item.mgId,
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
                userData: {
                  userId: item.userId,
                  name: item.name,
                  email: item.email,
                  username: item.username,
                },
                isExpired: item.isExpired === 0 ? false : true,
                isPlayed: item.isPlayed === 0 ? false : true,
                uniqueCode: item.uniqueCode,
                members,
                playingDate: item.playingDate,
                timeStart: item.timeStart,
                timeEnd: item.timeEnd,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
              }
            })
          )

          const totalPage = Math.ceil(codeRows / size)

          const meta = {
            page: Number(page),
            size: Number(size),
            totalData: codeRows,
            totalPage,
          }

          return {
            code: OK,
            message: 'Get code success',
            data: {
              data: codes,
              meta,
            },
          }
        })
        .catch(() => {
          return {
            coode: INTERNAL_SERVER_ERROR,
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
