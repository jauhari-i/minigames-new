import Transaction from '../../../models/Transaction'
import MyGames from '../../../models/MyGames'
import Codes from '../../../models/Codes'
import { status } from '../../../constants/transactionStatus'
import { generate } from '../../../constants/generateCode'
import { v4 as uuid } from 'uuid'

const AccTransaction = async (transactionId, adminId) => {
  try {
    const tr = await Transaction.findOne({ transactionId })
    if (!tr) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Transaction not found',
      }
    } else {
      if (!tr.transactionImage.public_id) {
        throw {
          success: false,
          statusCode: 400,
          message: 'Transaction Payment not uploaded',
        }
      } else {
        if (tr.transactionStatus === status.success) {
          throw {
            success: true,
            statusCode: 200,
            message: 'Transaction already accepted',
          }
        } else {
          const updateTransaction = await Transaction.updateOne(
            { transactionId },
            {
              transactionStatus: status.success,
              adminId,
            }
          )
          if (updateTransaction) {
            const addMyGame = await Promise.all(
              tr.transactionItems.map(async item => {
                const code = await Codes.create({
                  codeId: uuid(),
                  gameId: item.gameId,
                  userId: tr.userId,
                  playingDate: item.playingDate,
                  timeStart: item.timeStart,
                  timeEnd: item.timeEnd,
                  uniqueCode: generate(8),
                  codeMembers: item.members,
                })

                const isExpired = Date.now() > item.playingDate
                const myGame = await MyGames.create({
                  myGameId: uuid(),
                  gameId: item.gameId,
                  userId: tr.userId,
                  isExpired: isExpired,
                  isPlayed: false,
                  lastPlayedDate: item.playingDate,
                  codeId: code.codeId,
                })

                return myGame
              })
            )
            if (addMyGame) {
              return {
                success: true,
                statusCode: 200,
                message: 'Transaction confirmed',
              }
            } else {
              throw {
                success: false,
                statusCode: 500,
                message: 'Internal server error',
              }
            }
          } else {
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error',
            }
          }
        }
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      return {
        success: false,
        statusCode: 500,
        message: 'Internal server error',
      }
    }
    return error
  }
}

export default AccTransaction
