import { db } from '../../db/mysqlConnection'
import { DeleteImage, Uploader } from '../../middlewares/UploadImage'
import { v4 as uuid } from 'uuid'
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status'
import { isValidURL } from '../../helpers/validateUrl'

const findGame = async (page = 1, size = 10) => {
  return await db
    .query('SELECT count(*) as total FROM tb_game')
    .then(async result => {
      const gameRows = result[0][0].total
      const skip = (page - 1) * size
      const limit = skip + ',' + size
      return await db
        .query(
          'SELECT tb_game.*, tb_image.secure_url FROM tb_game INNER JOIN tb_image ON tb_game.imageId=tb_image.imageId ORDER BY tb_game.createdAt DESC LIMIT ' +
            limit
        )
        .then(res => {
          const row = res[0]

          const data = row.map(item => ({
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
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }))

          const totalPage = Math.ceil(gameRows / size)

          const meta = {
            page: Number(page),
            size: Number(size),
            totalData: gameRows,
            totalPage,
          }

          return {
            code: OK,
            message: 'Get game success',
            data: {
              data,
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

const findGameWeb = async (userId, page = 1, size = 10) => {
  const skip = (page - 1) * size
  const limit = skip + ',' + size

  return db
    .query(
      'SELECT tb_user_game.*, tb_game.*, tb_image.secure_url, tb_users.name, tb_users.email, tb_users.username, tb_code.uniqueCode, tb_transaction_item.itemId, tb_items.timeStart, tb_items.timeEnd FROM tb_user_game INNER JOIN tb_game ON tb_user_game.gameId=tb_game.gameId INNER JOIN tb_users ON tb_user_game.userId=tb_users.userId INNER JOIN tb_image ON tb_game.imageId = tb_image.imageId INNER JOIN tb_code ON tb_user_game.codeId = tb_code.codeId INNER JOIN tb_transaction_item ON tb_code.trItemId = tb_transaction_item.trItemId INNER JOIN tb_items ON tb_transaction_item.itemId=tb_items.itemId WHERE tb_user_game.userId = ? AND tb_user_game.isExpired = 0 AND tb_user_game.isPlayed = 0 ORDER BY tb_user_game.createdAt DESC LIMIT ' +
        limit,
      [userId]
    )
    .then(async dats => {
      const gRows = dats[0]

      const updateIsExpired = async mgId => {
        await db.query('UPDATE tb_user_game SET ? WHERE mgId = ?', [
          { isExpired: 1 },
          mgId,
        ])
      }

      const data = await Promise.all(
        gRows.map(async i => {
          const today = new Date()
          const playDt = new Date(i.playingDate)

          let expired

          if (today > playDt) {
            await updateIsExpired(i.mgId)
            expired = true
          } else {
            expired = false
          }

          const members = await db
            .query(
              'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
              [i.itemId]
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
            mgId: i.mgId,
            gameDetail: {
              gameId: i.gameId,
              gameTitle: i.gameTitle,
              gameDescription: i.gameDescription,
              gamePrice: i.gamePrice,
              gameDiscount: i.gameDiscount,
              gamePriceAfterDisc: i.gamePriceAfterDisc,
              gameDifficulty: i.gameDiff,
              gameDuration: i.gameDuration,
              gameRating: i.gameRating,
              gameUrl: i.gameUrl,
              gameCapacity: i.gameCapacity,
              gameActive: i.gameActive === 0 ? false : true,
              gameGenre: JSON.parse(i.gameGenre),
              gameImage: i.secure_url,
            },
            codeId: i.codeId,
            isExpired: expired,
            userDetail: {
              userId: i.userId,
              name: i.name,
              email: i.email,
              username: i.username,
            },
            playingDate: i.playingDate,
            timeStart: i.timeStart,
            timeEnd: i.timeEnd,
            members,
            createdAt: i.createdAt,
          }
        })
      )

      const counts = await db
        .query(
          'SELECT COUNT(*) AS total FROM tb_user_game WHERE tb_user_game.userId = ? AND tb_user_game.isExpired = 0 AND tb_user_game.isPlayed = 0',
          [userId]
        )
        .then(c => {
          return c[0][0].total
        })
        .catch(() => {
          return 0
        })

      const totalPage = Math.ceil(counts / size)

      const meta = {
        page: Number(page),
        size: Number(size),
        totalData: counts,
        totalPage,
      }

      return {
        code: OK,
        message: 'Get game success',
        data: {
          data: data,
          meta,
        },
      }
    })
}

const findGameById = async gameId => {
  return await db
    .query(
      'SELECT tb_game.*, tb_image.secure_url FROM tb_game INNER JOIN tb_image ON tb_game.imageId=tb_image.imageId WHERE gameId = ?',
      [gameId]
    )
    .then(result => {
      const row = result[0]

      if (row.length) {
        const data = {
          gameId: row[0].gameId,
          gameTitle: row[0].gameTitle,
          gameDescription: row[0].gameDescription,
          gamePrice: row[0].gamePrice,
          gameDiscount: row[0].gameDiscount,
          gamePriceAfterDisc: row[0].gamePriceAfterDisc,
          gameDifficulty: row[0].gameDiff,
          gameDuration: row[0].gameDuration,
          gameRating: row[0].gameRating,
          gameUrl: row[0].gameUrl,
          gameCapacity: row[0].gameCapacity,
          gameActive: row[0].gameActive === 0 ? false : true,
          gameGenre: JSON.parse(row[0].gameGenre),
          gameImage: row[0].secure_url,
          createdAt: row[0].createdAt,
          updatedAt: row[0].updatedAt,
        }
        return {
          code: OK,
          message: 'Get game success',
          data,
        }
      } else {
        return {
          code: NOT_FOUND,
          message: 'Game not found',
        }
      }
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}

const insertGame = async data => {
  const {
    title,
    price,
    image,
    rating,
    description,
    discount,
    difficulty,
    capacity,
    duration,
    ready,
    genre,
    url,
  } = data

  const { public_id, secure_url } = await Uploader(image)

  const gameId = uuid()

  const gameGenre = JSON.stringify(genre)

  let discountPrice
  if (discount > 0) {
    let disc = price * (discount / 100)
    discountPrice = price - disc
  } else {
    discountPrice = price
  }

  return await db
    .query('INSERT INTO tb_image (imageId, secure_url) VALUES (?,?)', [
      public_id,
      secure_url,
    ])
    .then(async () => {
      return await db
        .query(
          'INSERT INTO tb_game (gameId, gameTitle, imageId, gameDescription, gamePrice, gameDiscount, gamePriceAfterDisc, gameDiff, gameDuration, gameRating, gameUrl, gameCapacity, gameActive, gameGenre) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            gameId,
            title,
            public_id,
            description,
            price,
            discount ? discount : 0,
            discountPrice,
            difficulty,
            duration,
            rating,
            url,
            capacity,
            ready === true ? 1 : 0,
            gameGenre,
          ]
        )
        .then(async () => {
          return {
            code: CREATED,
            message: 'Game created',
            data: {
              gameId: gameId,
            },
          }
        })
        .catch(err => {
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            err,
          }
        })
    })
}

const updateGame = async (gameId, data) => {
  const {
    title,
    price,
    image,
    rating,
    description,
    discount,
    difficulty,
    capacity,
    duration,
    ready,
    genre,
    url,
  } = data

  return await db
    .query(
      'SELECT tb_game.*, tb_image.secure_url FROM tb_game INNER JOIN tb_image ON tb_game.imageId=tb_image.imageId WHERE gameId = ?',
      [gameId]
    )
    .then(async res => {
      const row = res[0][0]

      if (row.gameId) {
        let newimg

        if (image === row.secure_url && isValidURL(image)) {
          newimg = image
        } else {
          newimg = await Uploader(image)
        }

        if (newimg.public_id) {
          await db.query(
            'INSERT INTO tb_image (imageId, secure_url) VALUES (?,?)',
            [newimg.public_id, newimg.secure_url]
          )
          await DeleteImage(row.imageId)
        }

        let discountPrice
        if (discount > 0) {
          let disc = price * (discount / 100)
          discountPrice = price - disc
        } else {
          discountPrice = price
        }

        return await db
          .query('UPDATE tb_game SET ? WHERE gameId = ?', [
            {
              gameTitle: title,
              gameDescription: description,
              gamePrice: price,
              gameDiscount: discount,
              gamePriceAfterDisc: discountPrice,
              gameDiff: difficulty,
              gameDuration: duration,
              gameRating: rating,
              gameUrl: url,
              gameCapacity: capacity,
              gameActive: ready,
              gameGenre: JSON.stringify(genre),
              imageId: newimg !== image ? newimg.public_id : row.imageId,
            },
            gameId,
          ])
          .then(() => {
            return {
              code: OK,
              message: 'Game updated',
            }
          })
          .catch(err => {
            return {
              code: INTERNAL_SERVER_ERROR,
              message: INTERNAL_SERVER_ERROR,
              err,
            }
          })
      } else {
        return {
          code: NOT_FOUND,
          message: 'Game not found',
        }
      }
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: true,
      }
    })
}

const deleteGame = async gameId => {
  return await db
    .query('SELECT * FROM tb_game WHERE gameId = ?', [gameId])
    .then(async data => {
      const row = data[0][0]
      if (row.gameId) {
        await DeleteImage(row.imageId)

        return await db
          .query('DELETE FROM tb_game WHERE gameId = ?', [gameId])
          .then(() => {
            return {
              code: OK,
              message: 'Game deleted',
            }
          })
          .catch(err => {
            return err
          })
      } else {
        return {
          code: NOT_FOUND,
          message: 'Game not found!',
        }
      }
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}

const updateStatus = async (gameId, status) => {
  return await db
    .query('UPDATE tb_game SET ? WHERE gameId = ?', [
      { gameActive: status ? 1 : 0 },
      gameId,
    ])
    .then(() => {
      return {
        code: OK,
        message: 'Game status changed',
      }
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}

export {
  findGame,
  findGameById,
  findGameWeb,
  insertGame,
  updateGame,
  deleteGame,
  updateStatus,
}
