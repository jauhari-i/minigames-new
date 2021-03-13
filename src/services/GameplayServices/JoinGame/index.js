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
      if (!code) {
        throw {
          success: false,
          statusCode: 404,
          message: 'Code not found',
        }
      } else {
        const mG = await MyGames.findOne({ codeId: code.codeId })
        if (!mG) {
          throw {
            success: false,
            statusCode: 404,
            messge: 'Code not found',
          }
        } else {
          if (mG.isPlayed || mG.isExpired) {
            throw {
              success: false,
              statusCode: 400,
              message: mG.isExpired
                ? 'Code is expired'
                : 'Code already played at ' + mG.lastPlayedDate,
            }
          } else {
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
                const h = today.getHours() * 60

                const playDt = new Date(code.playingDate)

                const pDate = playDt.getDate()
                const pStart = code.timeStart * 60
                const pEnd = code.timeEnd * 60

                if (date !== pDate) {
                  throw {
                    success: false,
                    statusCode: 400,
                    message: `Code only can be played at ${moment(
                      playDt
                    ).format('ll')}`,
                  }
                } else {
                  const canPlay = pStart <= h && h <= pEnd
                  if (canPlay) {
                    const game = await Game.findOne({ gameId: code.gameId })
                    if (!game || !game.gameReady) {
                      throw {
                        success: false,
                        statusCode: 400,
                        message: 'Game is unavailable',
                      }
                    } else {
                      const mem = await Users.find({ userId: { $in: members } })

                      const member = mem.map(item => ({
                        userId: item.userId,
                        username: item.username,
                        name: item.name,
                        email: item.email,
                        image: item.userImage.secure_url,
                      }))

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
                            members: member,
                            playDate: code.playingDate,
                            uniqueCode: code.uniqueCode,
                          },
                        }
                      }
                    }
                  } else {
                    throw {
                      success: false,
                      statusCode: 400,
                      message: `Code only can be played at ${
                        pStart / 60 === 9 ? '09' : pStart / 60
                      }.00 - ${pEnd / 60}.00`,
                    }
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
