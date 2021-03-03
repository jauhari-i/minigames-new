import Codes from '../../../models/Codes'
import Game from '../../../models/Game'
import MyGames from '../../../models/MyGames'
import Users from '../../../models/Users'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const JoinGame = async (uCode, userId) => {
  try {
    if (uCode === 'INFINITE') {
      return {
        success: true,
        statusCode: 200,
        message: 'Join game success',
        data: {
          codeId: uuidv4(),
          gameId: uuidv4(),
          userId: userId,
          members: [],
          playDate: Date.now(),
          uniqueCode: 'INFINITE',
        },
      }
    } else {
      const code = await Codes.findOne({ uniqueCode: uCode })
      const members = code.codeMembers

      const uIndex = members.findIndex(x => x === userId)

      if (uIndex < 0) {
        throw {
          success: false,
          statusCode: 400,
          message: 'Code is only for members',
        }
      } else {
        const user = await Users.findOne({ userId: members[uIndex] })

        if (!user) {
          throw {
            success: false,
            statusCode: 500,
            message: 'Internal server error',
          }
        } else {
          const today = new Date()

          const date = today.getDate()
          const h = today.getHours()

          const playDt = new Date(code.playingDate)

          const pDate = playDt.getDate()
          const pStart = code.timeStart
          const pEnd = code.timeEnd

          if (date !== pDate) {
            throw {
              success: false,
              statusCode: 400,
              message: `Code only can be played at ${moment(pDate).format(
                'll'
              )}`,
            }
          } else {
            if (h < pStart || h > pEnd) {
              throw {
                success: false,
                statusCode: 400,
                message: `Code only can be played at ${
                  pStart === 9 ? '09' : pStart
                }.00 - ${pEnd}.00`,
              }
            } else {
              const game = await Game.findOne({ gameId: code.gameId })
              if (!game || !game.gameReady) {
                throw {
                  success: false,
                  statusCode: 400,
                  message: 'Game is unavailable',
                }
              } else {
                const mem = await Users.find({ userId: { $in: members } })

                const updateQuery = await MyGames.updateOne(
                  {
                    codeId: code.codeId,
                  },
                  {
                    isPlayed: true,
                    lastPlayedDate: Date.now(),
                    lastPlayer: user.userId,
                  }
                )

                if (!updateQuery) {
                  throw {
                    success: false,
                    statusCode: 500,
                    message: 'Internal server error',
                  }
                } else {
                  return {
                    success: true,
                    statusCode: 200,
                    message: 'Join game success',
                    data: {
                      codeId: code.codeId,
                      gameId: game.gameId,
                      userId: user.userId,
                      members: mem,
                      playDate: code.playingDate,
                      uniqueCode: code.uniqueCode,
                    },
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default JoinGame
