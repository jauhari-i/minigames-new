import Game from '../../../models/Game'
import User from '../../../models/Users'
import Admin from '../../../models/Admin'
import Transaction from '../../../models/Transaction'
import { status } from '../../../constants/transactionStatus'
import jwt from 'jsonwebtoken'

const DetailTransaction = async transactionId => {
  try {
    const tr = await Transaction.findOne({ transactionId })
    if (!tr) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Transaction not found',
      }
    } else {
      const user = await User.findOne({ userId: tr.userId })
      let admin
      let data

      if (tr.adminId) {
        const adminData = await Admin.findOne({ adminId: tr.adminId })
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
        tr.transactionItems.map(async tItem => {
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
        tr.paymentToken,
        'minigames-payment-token'
      )
      const isExpired = Date.now() > decoded.exp * 1000
      if (isExpired && tr.transactionStatus === status.notUploaded) {
        const expTr = await Transaction.findOneAndUpdate(
          { transactionId: tr.transactionId },
          {
            transactionStatus: status.expired,
            isExpired: true,
          }
        )

        data = {
          transactionId: expTr.transactionId,
          transactionItems: trItemDetail,
          transactionStatus: status.expired,
          transactionTotal: expTr.transactionTotal,
          transactionImage: expTr.transactionImage,
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
        data = {
          transactionId: tr.transactionId,
          transactionItems: trItemDetail,
          transactionStatus: tr.transactionStatus,
          transactionTotal: tr.transactionTotal,
          transactionImage: tr.transactionImage,
          isRejected: tr.isRejected,
          rejectedReason: tr.isRejected && tr.rejectedReason,
          isExpired: tr.isExpired,
          createdAt: tr.createdAt,
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

      return {
        success: true,
        statusCode: 200,
        message: 'Detail transaction success',
        data: data,
      }
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

export default DetailTransaction
