import Game from '../../../models/Game'
import User from '../../../models/Users'
import Admin from '../../../models/Admin'
import Transaction from '../../../models/Transaction'
import { status } from '../../../constants/transactionStatus'
import jwt from 'jsonwebtoken'

const ListTransactionAdmin = async () => {
  try {
    const tr = await Transaction.find({})

    if (tr.length) {
      const trData = await Promise.all(
        tr.map(async trItem => {
          const user = await User.findOne({ userId: trItem.userId })
          let admin

          if (trItem.adminId) {
            const adminData = await Admin.findOne({ adminId: trItem.adminId })
            admin = {
              adminId: adminData.adminId,
              adminName: adminData.adminName,
              adminEmail: adminData.adminEmail,
              adminImage: adminData.adminImage.secure_url,
            }
          } else {
            admin = {}
          }

          const trItemDetail = await Promise.all(
            trItem.transactionItems.map(async tItem => {
              const game = await Game.findOne({ gameId: tItem.gameId })
              const members = await User.find({
                userId: { $in: tItem.members },
              })

              const member = members.map(item => ({
                userId: item.userId,
                username: item.username,
                name: item.name,
                email: item.email,
                image: item.userImage.secure_url,
              }))

              return {
                gameId: game.gameId,
                gameData: {
                  gameId: game.gameId,
                  gameTitle: game.gameTitle,
                  posterImage: game.posterImage.secure_url,
                  gameImage: game.gameImage.secure_url,
                  gameDescription: game.gameDescription,
                  gamePrice: game.gamePrice,
                  gameDiscount: game.gameDiscount,
                  gamePriceAfterDiscount: game.gamePriceAfterDiscount,
                  gameDifficulty: game.gameDifficulty,
                  gameRating: game.gameRating,
                  gameGenre: game.gameGenre,
                  gameDuration: game.gameDuration,
                  gameUrl: game.gameUrl,
                  gameCapacity: game.gameCapacity,
                  gameReady: game.gameReady,
                  createdAt: game.createdAt,
                  createdBy: game.createdBy,
                },
                playingDate: tItem.datePlay,
                timeStart: tItem.timeStart,
                timeEnd: tItem.timeEnd,
                itemPrice: tItem.itemPrice,
                members: member,
              }
            })
          )

          const decoded = await jwt.decode(
            trItem.paymentToken,
            'minigames-payment-token'
          )
          const isExpired = Date.now() > decoded.exp * 1000
          if (isExpired && trItem.transactionStatus === status.notUploaded) {
            const expTr = await Transaction.findOneAndUpdate(
              { transactionId: trItem.transactionId },
              {
                transactionStatus: status.expired,
                isExpired: true,
              }
            )

            return {
              transactionId: expTr.transactionId,
              transactionItems: trItemDetail,
              transactionStatus: status.expired,
              transactionTotal: expTr.transactionTotal,
              transactionImage: expTr.transactionImage.secure_url,
              isRejected: expTr.isRejected,
              rejectedReason: expTr.isRejected && expTr.rejectedReason,
              isExpired: true,
              createdAt: expTr.createdAt,
              userData: {
                userId: user.userId,
                username: user.username,
                name: user.name,
                email: user.email,
                image: user.userImage.secure_url,
              },
              adminData: admin,
            }
          } else {
            return {
              transactionId: trItem.transactionId,
              transactionItems: trItemDetail,
              transactionStatus: trItem.transactionStatus,
              transactionTotal: trItem.transactionTotal,
              transactionImage: trItem.transactionImage.secure_url,
              isRejected: trItem.isRejected,
              rejectedReason: trItem.isRejected && trItem.rejectedReason,
              isExpired: trItem.isExpired,
              createdAt: trItem.createdAt,
              userData: {
                userId: user.userId,
                username: user.username,
                name: user.name,
                email: user.email,
                image: user.userImage.secure_url,
              },

              adminData: admin,
            }
          }
        })
      )
      if (trData) {
        const sortNewest = trData.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return {
          success: true,
          statusCode: 200,
          message: 'Get transaction success',
          data: sortNewest,
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error',
        }
      }
    } else {
      return {
        success: true,
        message: 'Get transaction success',
        data: [],
        statusCode: 200,
      }
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

export default ListTransactionAdmin
