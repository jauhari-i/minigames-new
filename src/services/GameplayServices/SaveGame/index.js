import Codes from '../../../models/Codes'
import Game from '../../../models/Game'
import MyGames from '../../../models/MyGames'
import Users from '../../../models/Users'
import Leaderboard from '../../../models/Leaderboard'
import { v4 as uuidv4 } from 'uuid'

const SaveGame = async (
  codeId,
  uniqueCode,
  time,
  teamName,
  teamIcon,
  userId
) => {
  try {
    if (uniqueCode === 'InFinite') {
      return {
        success: true,
        statusCode: 200,
        message: 'Save game success',
      }
    } else {
      const code = await Codes.findOne({ codeId })
      const game = await Game.findOne({ gameId: code.gameId })
      const user = await Users.findOne({ userId })
      const myGame = await MyGames.findOneAndUpdate(
        { codeId: code.codeId },
        {
          isPlayed: true,
        }
      )

      if (!game) {
        throw {
          success: false,
          statusCode: 400,
          message: 'Game is unavailable',
        }
      } else {
        if (!game.gameReady) {
          throw {
            success: false,
            statusCode: 400,
            message: 'Game is unavailable',
          }
        } else {
          const doc = {
            leaderboardId: uuidv4(),
            teamLeaderName: user.name,
            teamName: teamName,
            teamIcon: teamIcon,
            myGameId: myGame.myGameId,
            gameId: game.gameId,
            score: time,
          }

          const leader = await Leaderboard.create(doc)
          if (leader) {
            return {
              success: true,
              statusCode: 201,
              message: 'Save game success',
              data: {
                leaderboardId: leader.leaderboardId,
              },
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
    return error
  }
}

export default SaveGame
