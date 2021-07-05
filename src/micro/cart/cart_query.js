import { db } from '../../db/mysqlConnection'
import { v4 as uuid } from 'uuid'
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from 'http-status'
import moment from 'moment'
import { getTimeEnd, getTimeStart } from '../../constants/timePlay'

const addItemToCart = async (data, userId) => {
  const { gameId, time, date, members } = data

  const failedAction = async (itemId, members) => {
    await db.query('DELETE FROM tb_items WHERE itemId = ?', [itemId])
    members.map(async item => {
      await db.query('DELETE FROM tb_members WHERE userId = ?', [item])
    })
  }

  return await db
    .query('SELECT * FROM tb_cart WHERE userId = ? AND isCheckout = 0', [
      userId,
    ])
    .then(async c => {
      const cartRow = c[0]

      let cartId
      let cartTotal
      if (cartRow.length) {
        cartId = cartRow[0].cartId
        cartTotal = cartRow[0].total
      } else {
        cartId = uuid()
        cartTotal = 0
        await db.query(
          'INSERT INTO tb_cart (cartId, total, userId) VALUES (?,?,?)',
          [cartId, 0, userId]
        )
      }

      return await db
        .query('SELECT * FROM tb_game WHERE gameId = ?', [gameId])
        .then(async g => {
          const gameRow = g[0][0]

          if (!gameRow.gameId) {
            return {
              code: NOT_FOUND,
              message: 'Game not found',
            }
          } else if (gameRow.gameActive === 0) {
            return {
              code: BAD_REQUEST,
              message: 'Game not activated',
            }
          } else if (members.length > gameRow.gameCapacity) {
            return {
              code: BAD_REQUEST,
              message: 'Members is more than game capacity',
            }
          } else {
            return await db
              .query('SELECT * FROM tb_items WHERE gameId =? AND cartId = ?', [
                gameId,
                cartId,
              ])
              .then(async dupRow => {
                const duplicated = dupRow[0].length

                if (duplicated) {
                  return {
                    code: BAD_REQUEST,
                    message: 'Game already added to cart',
                  }
                } else {
                  const itemId = uuid()
                  const timeStart = getTimeStart(time)
                  const timeEnd = getTimeEnd(time, gameRow.gameDuration)
                  const total = gameRow.gamePriceAfterDisc
                  const playDate = moment(date).format('YYYY-MM-DD')

                  return await db
                    .query(
                      'INSERT INTO tb_items (itemId, gameId, playDate, timeEnd, timeStart, cartId, total) VALUES (?,?,?,?,?,?,?)',
                      [
                        itemId,
                        gameRow.gameId,
                        playDate,
                        timeEnd,
                        timeStart,
                        cartId,
                        total,
                      ]
                    )
                    .then(async () => {
                      const insertMembers = await Promise.all(
                        members.map(async item => {
                          const memberId = uuid()
                          return await db
                            .query(
                              'INSERT INTO tb_members (memberId, itemId, userId) VALUES (?,?,?)',
                              [memberId, itemId, item]
                            )
                            .then(() => {
                              return 1
                            })
                            .catch(async () => {
                              return 0
                            })
                        })
                      )
                      if (insertMembers[members.length - 1] === 1) {
                        const newTotal = total + cartTotal
                        return await db
                          .query('UPDATE tb_cart SET ? WHERE cartId = ?', [
                            { total: newTotal },
                            cartId,
                          ])
                          .then(() => {
                            return {
                              code: CREATED,
                              message: 'Item added to cart',
                            }
                          })
                          .catch(async err => {
                            console.log(err)
                            await failedAction(itemId, members)
                            return {
                              code: INTERNAL_SERVER_ERROR,
                              message: 'Internal server error',
                            }
                          })
                      } else {
                        await failedAction(itemId, members)
                        return {
                          code: INTERNAL_SERVER_ERROR,
                          message: 'Internal server error',
                        }
                      }
                    })
                    .catch(async err => {
                      await failedAction(itemId, [])
                      console.log(err)
                      return {
                        code: INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                      }
                    })
                }
              })
              .catch(err => {
                console.log(err)
                return {
                  code: INTERNAL_SERVER_ERROR,
                  message: 'Internal server error',
                }
              })
          }
        })
        .catch(err => {
          console.log(err)
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          }
        })
    })
    .catch(err => {
      console.log(err)
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}
const removeItemFromCart = async itemId => {
  return await db
    .query(
      'SELECT tb_items.*, tb_cart.total AS totalPrice FROM tb_items INNER JOIN tb_cart ON tb_items.cartId = tb_cart.cartId WHERE itemId = ?',
      [itemId]
    )
    .then(async row => {
      const itemRow = row[0]

      if (!itemRow.length) {
        return {
          code: NOT_FOUND,
          message: 'Item not found',
        }
      } else {
        const newTotal = itemRow[0].totalPrice - itemRow[0].total

        return await db
          .query('DELETE FROM tb_items WHERE itemId = ?', [itemId])
          .then(async () => {
            return await db
              .query('UPDATE tb_cart SET ? WHERE cartId = ?', [
                { total: newTotal },
                itemRow[0].cartId,
              ])
              .then(() => {
                return {
                  code: OK,
                  message: 'Item removed from cart',
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
    })
    .catch(err => {
      console.log(err)
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}
const findUserCart = async userId => {
  return await db
    .query('SELECT * FROM tb_cart WHERE userId = ? AND isCheckout = 0', [
      userId,
    ])
    .then(async c => {
      const cRow = c[0]

      let cartId
      let total = 0

      if (!cRow.length) {
        cartId = uuid()
        return await db
          .query('INSERT INTO tb_cart (cartId, total, userId) VALUES (?,?,?)', [
            cartId,
            0,
            userId,
          ])
          .then(() => {
            return {
              code: OK,
              message: 'Get user cart success',
              data: {
                cartId,
                total,
                items: [],
              },
            }
          })
          .catch(() => {
            return {
              code: INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
            }
          })
      } else {
        cartId = cRow[0].cartId
        return await db
          .query(
            'SELECT tb_cart.*,tb_items.itemId,tb_items.gameId, tb_items.playDate, tb_items.timeEnd, tb_items.timeStart, tb_items.total AS itemPrice, tb_game.*, tb_image.secure_url FROM tb_cart INNER JOIN tb_items ON tb_cart.cartId = tb_items.cartId INNER JOIN tb_game ON tb_items.gameId = tb_game.gameId INNER JOIN tb_image ON tb_game.imageId = tb_image.imageId WHERE tb_cart.userId = ?',
            [userId]
          )
          .then(async row => {
            const data = row[0]
            const items = await Promise.all(
              data.map(async item => {
                cartId = item.cartId
                total = total + item.itemPrice
                const members = await db
                  .query(
                    'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
                    [item.itemId]
                  )
                  .then(result => {
                    const memRow = result[0]
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
                  itemId: item.itemId,
                  itemPrice: item.itemPrice,
                  playDate: item.playDate,
                  timeEnd: item.timeEnd,
                  timeStart: item.timeStart,
                  members,
                  gameDetail: {
                    gameId: item.gameId,
                    gameTitle: item.gameTitle,
                    gameImage: item.secure_url,
                    gamePrice: item.gamePrice,
                    gamePriceAfterDisc: item.gamePriceAfterDisc,
                    gameRating: item.gameRating,
                    gameDiff: item.gameDiff,
                    gameDuration: item.gameDuration,
                    gameUrl: item.gameUrl,
                    gameCapacity: item.gameCapacity,
                    gameGenre: JSON.parse(item.gameGenre),
                    gameActive: item.gameActive === 1 ? true : false,
                  },
                }
              })
            )

            const cart = {
              cartId,
              total,
              items: items,
            }
            return {
              code: OK,
              message: 'Get user cart success',
              data: cart,
            }
          })
          .catch(() => {
            return {
              code: INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
            }
          })
      }
    })
}

export { addItemToCart, removeItemFromCart, findUserCart }
