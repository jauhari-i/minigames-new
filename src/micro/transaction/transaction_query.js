import { db } from '../../db/mysqlConnection'
import { v4 as uuid } from 'uuid'
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from 'http-status'
import { findUserCart } from '../cart/cart_query'
import { status } from '../../constants/transactionStatus'
import jwt from 'jsonwebtoken'
import { DeleteImage, Uploader } from '../../middlewares/UploadImage'
import { generate } from '../../constants/generateCode'
import moment from 'moment'

var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

const checkout = async userId => {
  return await findUserCart(userId)
    .then(async cart => {
      const { data } = cart

      const failedAction = async transactionId => {
        await db.query('DELETE FROM tb_transaction WHERE transactionId = ?', [
          transactionId,
        ])
      }

      if (!data.items.length) {
        return {
          code: BAD_REQUEST,
          message: 'Cart is empty',
        }
      } else {
        const transactionId = uuid()
        return await db
          .query(
            'INSERT INTO tb_transaction (transactionId, transactionTotal, transactionStatus, paymentToken, userId) VALUES (?,?,?,?,?)',
            [transactionId, data.total, status.notUploaded, '', userId]
          )
          .then(async () => {
            const transactionItems = await Promise.all(
              data.items.map(async i => {
                const trId = uuid()
                return await db
                  .query(
                    'INSERT INTO tb_transaction_item (trItemId, gameId, itemId, transactionId) VALUES (?,?,?,?)',
                    [trId, i.gameDetail.gameId, i.itemId, transactionId]
                  )
                  .then(() => {
                    return true
                  })
                  .catch(() => {
                    return false
                  })
              })
            )

            if (transactionItems.includes(false)) {
              await failedAction()

              return {
                code: INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
              }
            } else {
              const paymentToken = await jwt.sign(
                {
                  transactionId,
                  sub: userId,
                },
                'minigames-payment-token',
                { expiresIn: '48h' }
              )
              return await db
                .query('UPDATE tb_transaction SET ? WHERE transactionId = ?', [
                  { paymentToken },
                  transactionId,
                ])
                .then(async () => {
                  return await db
                    .query('UPDATE tb_cart SET ? WHERE cartId = ?', [
                      { isCheckout: 1 },
                      data.cartId,
                    ])
                    .then(() => {
                      return {
                        code: CREATED,
                        message: 'Transaction created',
                      }
                    })
                    .catch(async () => {
                      await failedAction()
                      return {
                        code: INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                      }
                    })
                })
                .catch(async () => {
                  await failedAction()
                  return {
                    code: INTERNAL_SERVER_ERROR,
                    message: 'Internal server error',
                  }
                })
            }
          })
          .catch(async () => {
            await failedAction()
            return {
              code: INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
            }
          })
      }
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}
const findTransactionAdmin = async (page = 1, size = 10) => {
  return await db
    .query('SELECT count(*) as trTotal FROM tb_transaction')
    .then(async counts => {
      const transCount = counts[0][0].trTotal
      const skip = (page - 1) * size
      const limit = skip + ',' + size

      return await db
        .query(
          'SELECT tb_transaction.*, tb_image.secure_url, tb_users.name AS userName, tb_admin.name AS adminName FROM tb_transaction LEFT JOIN tb_image ON tb_transaction.imageId=tb_image.imageId LEFT JOIN tb_users ON tb_transaction.userId=tb_users.userId LEFT JOIN tb_admin ON tb_transaction.adminId=tb_admin.adminId ORDER BY tb_transaction.createdAt DESC LIMIT ' +
            limit
        )
        .then(async trans => {
          const transRow = trans[0]

          if (!transRow.length) {
            return {
              code: OK,
              message: 'Get transaction success',
              data: [],
            }
          } else {
            const t = await Promise.all(
              transRow.map(async i => {
                const itemsData = await db
                  .query(
                    'SELECT * FROM tb_transaction_item INNER JOIN tb_items ON tb_transaction_item.itemId = tb_items.itemId INNER JOIN tb_game ON tb_transaction_item.gameId=tb_game.gameId WHERE tb_transaction_item.transactionId = ?',
                    [i.transactionId]
                  )
                  .then(async a => {
                    const trItem = a[0]

                    const datas = await Promise.all(
                      trItem.map(async m => {
                        return await db
                          .query(
                            'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
                            [m.itemId]
                          )
                          .then(mem => {
                            const membersData = mem[0]

                            const mems = membersData.map(mm => ({
                              memberId: mm.memberId,
                              userId: mm.userId,
                              name: mm.name,
                              email: mm.email,
                              username: mm.username,
                            }))
                            const itemDetail = {
                              trItemId: m.trItemId,
                              gameId: m.gameId,
                              gameDetail: {
                                gameId: m.gameId,
                                gameTitle: m.gameTitle,
                                gameImage: m.secure_url,
                                gamePrice: m.gamePrice,
                                gamePriceAfterDisc: m.gamePriceAfterDisc,
                                gameRating: m.gameRating,
                                gameDiff: m.gameDiff,
                                gameDuration: m.gameDuration,
                                gameUrl: m.gameUrl,
                                gameCapacity: m.gameCapacity,
                                gameGenre: JSON.parse(m.gameGenre),
                                gameActive: m.gameActive === 1 ? true : false,
                              },
                              itemId: m.itemId,
                              playingDate: m.playingDate,
                              timeEnd: m.timeEnd,
                              timeStart: m.timeStart,
                              total: m.total,
                              members: mems,
                            }
                            return itemDetail
                          })
                          .catch(() => {
                            return false
                          })
                      })
                    )

                    if (!datas) {
                      return false
                    } else {
                      return datas
                    }
                  })
                  .catch(() => {
                    return false
                  })

                const tData = {
                  transactionId: i.transactionId,
                  transactionTotal: i.transactionTotal,
                  transactionStatus: i.transactionStatus,
                  transactionImage: i.secure_url ? i.secure_url : '',
                  paymentToken: i.paymentToken,
                  isExpired: i.isExpired === 1 ? true : false,
                  isRejected: i.isRejected === 1 ? true : false,
                  rejectedReason: i.rejectedReason,
                  responseDate: i.responseDate,
                  userId: i.userId,
                  userName: i.userName,
                  adminId: i.adminId,
                  adminName: i.adminName,
                  items: itemsData,
                  createdAt: i.createdAt,
                  updatedAt: i.updatedAt,
                }

                return tData
              })
            )
            if (!t) {
              return {
                code: INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
              }
            } else {
              const totalPage = Math.ceil(transCount / size)

              const meta = {
                page: Number(page),
                size: Number(size),
                totalData: t.length,
                totalPage,
              }
              return {
                code: OK,
                message: 'Get transaction success',
                data: {
                  data: t,
                  meta,
                },
              }
            }
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
const findTransactionUsers = async (page = 1, size = 10, userId) => {
  return await db
    .query('SELECT count(*) as trTotal FROM tb_transaction WHERE userId = ?', [
      userId,
    ])
    .then(async counts => {
      const transCount = counts[0][0].trTotal
      const skip = (page - 1) * size
      const limit = skip + ',' + size

      return await db
        .query(
          'SELECT tb_transaction.*, tb_image.secure_url, tb_users.name AS userName, tb_admin.name AS adminName FROM tb_transaction LEFT JOIN tb_image ON tb_transaction.imageId=tb_image.imageId LEFT JOIN tb_users ON tb_transaction.userId=tb_users.userId LEFT JOIN tb_admin ON tb_transaction.adminId=tb_admin.adminId WHERE tb_transaction.userId = ? ORDER BY tb_transaction.createdAt DESC LIMIT ' +
            limit,
          [userId]
        )
        .then(async trans => {
          const transRow = trans[0]

          if (!transRow.length) {
            return {
              code: OK,
              message: 'Get transaction success',
              data: [],
            }
          } else {
            const t = await Promise.all(
              transRow.map(async i => {
                const itemsData = await db
                  .query(
                    'SELECT * FROM tb_transaction_item INNER JOIN tb_items ON tb_transaction_item.itemId = tb_items.itemId INNER JOIN tb_game ON tb_transaction_item.gameId=tb_game.gameId WHERE tb_transaction_item.transactionId = ?',
                    [i.transactionId]
                  )
                  .then(async a => {
                    const trItem = a[0]

                    const datas = await Promise.all(
                      trItem.map(async m => {
                        return await db
                          .query(
                            'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
                            [m.itemId]
                          )
                          .then(mem => {
                            const membersData = mem[0]

                            const mems = membersData.map(mm => ({
                              memberId: mm.memberId,
                              userId: mm.userId,
                              name: mm.name,
                              email: mm.email,
                              username: mm.username,
                            }))
                            const itemDetail = {
                              trItemId: m.trItemId,
                              gameId: m.gameId,
                              gameDetail: {
                                gameId: m.gameId,
                                gameTitle: m.gameTitle,
                                gameImage: m.secure_url,
                                gamePrice: m.gamePrice,
                                gamePriceAfterDisc: m.gamePriceAfterDisc,
                                gameRating: m.gameRating,
                                gameDiff: m.gameDiff,
                                gameDuration: m.gameDuration,
                                gameUrl: m.gameUrl,
                                gameCapacity: m.gameCapacity,
                                gameGenre: JSON.parse(m.gameGenre),
                                gameActive: m.gameActive === 1 ? true : false,
                              },
                              itemId: m.itemId,
                              playingDate: m.playingDate,
                              timeEnd: m.timeEnd,
                              timeStart: m.timeStart,
                              total: m.total,
                              members: mems,
                            }
                            return itemDetail
                          })
                          .catch(() => {
                            return false
                          })
                      })
                    )

                    if (!datas) {
                      return false
                    } else {
                      return datas
                    }
                  })
                  .catch(() => {
                    return false
                  })

                const tData = {
                  transactionId: i.transactionId,
                  transactionTotal: i.transactionTotal,
                  transactionStatus: i.transactionStatus,
                  transactionImage: i.secure_url ? i.secure_url : '',
                  paymentToken: i.paymentToken,
                  isExpired: i.isExpired === 1 ? true : false,
                  isRejected: i.isRejected === 1 ? true : false,
                  rejectedReason: i.rejectedReason,
                  responseDate: i.responseDate,
                  userId: i.userId,
                  userName: i.userName,
                  items: itemsData,
                  createdAt: i.createdAt,
                  updatedAt: i.updatedAt,
                }

                return tData
              })
            )
            if (!t) {
              return {
                code: INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
              }
            } else {
              const totalPage = Math.ceil(transCount / size)

              const meta = {
                page: Number(page),
                size: Number(size),
                totalData: t.length,
                totalPage,
              }
              return {
                code: OK,
                message: 'Get transaction success',
                data: {
                  data: t,
                  meta,
                },
              }
            }
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
const findOneTransactionAdmin = async transactionId => {
  return await db
    .query(
      'SELECT tb_transaction.*, tb_image.secure_url, tb_users.name AS userName, tb_admin.name AS adminName FROM tb_transaction LEFT JOIN tb_image ON tb_transaction.imageId=tb_image.imageId LEFT JOIN tb_users ON tb_transaction.userId=tb_users.userId LEFT JOIN tb_admin ON tb_transaction.adminId=tb_admin.adminId WHERE tb_transaction.transactionId = ?',
      [transactionId]
    )
    .then(async trans => {
      const transRow = trans[0]

      if (!transRow.length) {
        return {
          code: NOT_FOUND,
          message: 'Transaction not found',
        }
      } else {
        const t = await Promise.all(
          transRow.map(async i => {
            const itemsData = await db
              .query(
                'SELECT * FROM tb_transaction_item INNER JOIN tb_items ON tb_transaction_item.itemId = tb_items.itemId INNER JOIN tb_game ON tb_transaction_item.gameId=tb_game.gameId WHERE tb_transaction_item.transactionId = ?',
                [i.transactionId]
              )
              .then(async a => {
                const trItem = a[0]

                const datas = await Promise.all(
                  trItem.map(async m => {
                    return await db
                      .query(
                        'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
                        [m.itemId]
                      )
                      .then(mem => {
                        const membersData = mem[0]

                        const mems = membersData.map(mm => ({
                          memberId: mm.memberId,
                          userId: mm.userId,
                          name: mm.name,
                          email: mm.email,
                          username: mm.username,
                        }))
                        const itemDetail = {
                          trItemId: m.trItemId,
                          gameId: m.gameId,
                          gameDetail: {
                            gameId: m.gameId,
                            gameTitle: m.gameTitle,
                            gameImage: m.secure_url,
                            gamePrice: m.gamePrice,
                            gamePriceAfterDisc: m.gamePriceAfterDisc,
                            gameRating: m.gameRating,
                            gameDiff: m.gameDiff,
                            gameDuration: m.gameDuration,
                            gameUrl: m.gameUrl,
                            gameCapacity: m.gameCapacity,
                            gameGenre: JSON.parse(m.gameGenre),
                            gameActive: m.gameActive === 1 ? true : false,
                          },
                          itemId: m.itemId,
                          playingDate: m.playingDate,
                          timeEnd: m.timeEnd,
                          timeStart: m.timeStart,
                          total: m.total,
                          members: mems,
                        }
                        return itemDetail
                      })
                      .catch(() => {
                        return false
                      })
                  })
                )

                if (!datas) {
                  return false
                } else {
                  return datas
                }
              })
              .catch(() => {
                return false
              })

            const tData = {
              transactionId: i.transactionId,
              transactionTotal: i.transactionTotal,
              transactionStatus: i.transactionStatus,
              transactionImage: i.secure_url ? i.secure_url : '',
              paymentToken: i.paymentToken,
              isExpired: i.isExpired === 1 ? true : false,
              isRejected: i.isRejected === 1 ? true : false,
              rejectedReason: i.rejectedReason,
              responseDate: i.responseDate,
              userId: i.userId,
              userName: i.userName,
              adminId: i.adminId,
              adminName: i.adminName,
              items: itemsData,
              createdAt: i.createdAt,
              updatedAt: i.updatedAt,
            }

            return tData
          })
        )
        if (!t) {
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          }
        } else {
          return {
            code: OK,
            message: 'Get transaction success',
            data: t[0],
          }
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
const findOneTransactionUsers = async (transactionId, userId) => {
  return await db
    .query(
      'SELECT tb_transaction.*, tb_image.secure_url, tb_users.name AS userName, tb_admin.name AS adminName FROM tb_transaction LEFT JOIN tb_image ON tb_transaction.imageId=tb_image.imageId LEFT JOIN tb_users ON tb_transaction.userId=tb_users.userId LEFT JOIN tb_admin ON tb_transaction.adminId=tb_admin.adminId WHERE tb_transaction.transactionId = ? AND tb_transaction.userId = ?',
      [transactionId, userId]
    )
    .then(async trans => {
      const transRow = trans[0]
      if (!transRow.length) {
        return {
          code: NOT_FOUND,
          message: 'Transaction not found',
        }
      } else {
        const t = await Promise.all(
          transRow.map(async i => {
            const itemsData = await db
              .query(
                'SELECT * FROM tb_transaction_item INNER JOIN tb_items ON tb_transaction_item.itemId = tb_items.itemId INNER JOIN tb_game ON tb_transaction_item.gameId=tb_game.gameId WHERE tb_transaction_item.transactionId = ?',
                [i.transactionId]
              )
              .then(async a => {
                const trItem = a[0]

                const datas = await Promise.all(
                  trItem.map(async m => {
                    return await db
                      .query(
                        'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
                        [m.itemId]
                      )
                      .then(mem => {
                        const membersData = mem[0]

                        const mems = membersData.map(mm => ({
                          memberId: mm.memberId,
                          userId: mm.userId,
                          name: mm.name,
                          email: mm.email,
                          username: mm.username,
                        }))
                        const itemDetail = {
                          trItemId: m.trItemId,
                          gameId: m.gameId,
                          gameDetail: {
                            gameId: m.gameId,
                            gameTitle: m.gameTitle,
                            gameImage: m.secure_url,
                            gamePrice: m.gamePrice,
                            gamePriceAfterDisc: m.gamePriceAfterDisc,
                            gameRating: m.gameRating,
                            gameDiff: m.gameDiff,
                            gameDuration: m.gameDuration,
                            gameUrl: m.gameUrl,
                            gameCapacity: m.gameCapacity,
                            gameGenre: JSON.parse(m.gameGenre),
                            gameActive: m.gameActive === 1 ? true : false,
                          },
                          itemId: m.itemId,
                          playingDate: m.playingDate,
                          timeEnd: m.timeEnd,
                          timeStart: m.timeStart,
                          total: m.total,
                          members: mems,
                        }
                        return itemDetail
                      })
                      .catch(() => {
                        return false
                      })
                  })
                )

                if (!datas) {
                  return false
                } else {
                  return datas
                }
              })
              .catch(() => {
                return false
              })

            const tData = {
              transactionId: i.transactionId,
              transactionTotal: i.transactionTotal,
              transactionStatus: i.transactionStatus,
              transactionImage: i.secure_url ? i.secure_url : '',
              paymentToken: i.paymentToken,
              isExpired: i.isExpired === 1 ? true : false,
              isRejected: i.isRejected === 1 ? true : false,
              rejectedReason: i.rejectedReason,
              responseDate: i.responseDate,
              userId: i.userId,
              userName: i.userName,
              items: itemsData,
              createdAt: i.createdAt,
              updatedAt: i.updatedAt,
            }

            return tData
          })
        )
        if (!t) {
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          }
        } else {
          return {
            code: OK,
            message: 'Get transaction success',
            data: t[0],
          }
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
const updateImage = async (image, userId, transactionId) => {
  return await db
    .query(
      'SELECT * FROM tb_transaction WHERE transactionId = ? AND userId = ?',
      [transactionId, userId]
    )
    .then(async tr => {
      const tRow = tr[0]

      const { paymentToken } = tRow[0]

      const decoded = await jwt.decode(paymentToken)
      const isExpired = Date.now() > decoded.exp * 1000

      if (!tRow.length) {
        return {
          code: NOT_FOUND,
          message: 'Transaction not found',
        }
      } else if (tRow[0].isExpired === 1 || isExpired) {
        return {
          code: BAD_REQUEST,
          message: 'Transaction is expired',
        }
      } else if (tRow[0].isRejected === 1) {
        return {
          code: BAD_REQUEST,
          message: 'Transaction is rejected',
        }
      } else {
        let transactionImg
        const currentImage = tRow[0].imageId

        if (currentImage !== null) {
          await DeleteImage(currentImage)
          await db.query('DELETE FROM tb_image WHERE imageId = ?', [
            currentImage,
          ])
          transactionImg = await Uploader(image)
        } else {
          transactionImg = await Uploader(image)
        }

        await db.query(
          'INSERT INTO tb_image (imageId, secure_url) VALUES (?,?)',
          [transactionImg.public_id, transactionImg.secure_url]
        )

        return await db
          .query('UPDATE tb_transaction SET ? WHERE transactionId = ?', [
            {
              transactionStatus: status.pending,
              imageId: transactionImg.public_id,
            },
            tRow[0].transactionId,
          ])
          .then(() => {
            return {
              code: OK,
              message: 'Transaction image Uploaded',
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
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}
const accTrans = async (transactionId, adminId) => {
  return await db
    .query(
      'SELECT tb_transaction.*, tb_image.secure_url FROM tb_transaction LEFT JOIN tb_image ON tb_transaction.imageId=tb_image.imageId WHERE transactionId = ?',
      [transactionId]
    )
    .then(async trRow => {
      if (!trRow[0].length) {
        return {
          code: NOT_FOUND,
          message: 'Transaction not found',
        }
      }

      const { transactionStatus, userId } = trRow[0][0]

      if (transactionStatus === status.notUploaded) {
        return {
          code: BAD_REQUEST,
          message: 'Transaction image is not uploaded',
        }
      } else if (transactionStatus === status.rejected) {
        return {
          code: BAD_REQUEST,
          message: 'Transaction already rejected',
        }
      } else if (transactionStatus === status.success) {
        return {
          code: OK,
          message: 'Transaction already accepted',
        }
      } else {
        return await db
          .query(
            'SELECT * FROM tb_transaction_item INNER JOIN tb_items ON tb_transaction_item.itemId = tb_items.itemId WHERE transactionId =?',
            [transactionId]
          )
          .then(async trItemRow => {
            const codes = await Promise.all(
              trItemRow[0].map(async item => {
                const code = generate(8)
                const codeId = uuid()

                return await db
                  .query(
                    'INSERT INTO tb_code (codeId, trItemId, uniqueCode) VALUES (?,?,?)',
                    [codeId, item.trItemId, code]
                  )
                  .then(async () => {
                    const memberId = uuid()
                    return await db
                      .query(
                        'INSERT INTO tb_user_game (mgId, gameId, userId, playingDate, codeId) VALUES (?,?,?,?,?)',
                        [memberId, item.gameId, userId, item.playDate, codeId]
                      )
                      .then(() => {
                        return code
                      })
                      .catch(() => {
                        return false
                      })
                  })
                  .catch(() => {
                    return false
                  })
              })
            )

            if (codes.includes(false)) {
              return {
                code: INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
              }
            } else {
              return await db
                .query('UPDATE tb_transaction SET ? WHERE transactionId = ?', [
                  {
                    transactionStatus: status.success,
                    responseDate: mysqlTimestamp,
                    adminId: adminId,
                  },
                  transactionId,
                ])
                .then(async () => {
                  return {
                    code: OK,
                    message: 'Transaction accepted',
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
          .catch(() => {
            return {
              code: INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
            }
          })
      }
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}
const rejTrans = async (transactionId, reason, adminId) => {
  return await db
    .query('SELECT * FROM tb_transaction WHERE transactionId = ?', [
      transactionId,
    ])
    .then(async tRow => {
      if (!tRow[0].length) {
        return {
          code: NOT_FOUND,
          message: 'Transaction not found',
        }
      } else {
        const transaction = tRow[0][0]

        if (transaction.transactionStatus === status.rejected) {
          return {
            code: OK,
            message: 'Transaction already rejected',
          }
        } else if (transaction.transactionStatus === status.success) {
          return {
            code: BAD_REQUEST,
            message: 'Transaction already accepted',
          }
        } else {
          return await db
            .query('UPDATE tb_transaction SET ? WHERE transactionId = ?', [
              {
                transactionStatus: status.rejected,
                rejectedReason: reason,
                adminId: adminId,
                responseDate: mysqlTimestamp,
              },
              transactionId,
            ])
            .then(() => {
              return {
                code: OK,
                message: 'Transaction is rejected',
              }
            })
            .catch(() => {
              return {
                code: INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
              }
            })
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
const deleteTrans = async transactionId => {
  return await db
    .query('SELECT * FROM tb_transaction WHERE transactionId = ?', [
      transactionId,
    ])
    .then(async tRow => {
      if (!tRow[0].length) {
        return {
          code: NOT_FOUND,
          message: 'Transaction not found',
        }
      } else {
        return await db
          .query('DELETE FROM tb_transaction WHERE transactionId = ?', [
            transactionId,
          ])
          .then(() => {
            return {
              code: OK,
              message: 'Transaction is deleted',
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
}

export {
  checkout,
  updateImage,
  findTransactionAdmin,
  findTransactionUsers,
  findOneTransactionAdmin,
  findOneTransactionUsers,
  accTrans,
  rejTrans,
  deleteTrans,
}
