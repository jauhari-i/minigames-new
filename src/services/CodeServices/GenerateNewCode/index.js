import Codes from '../../../models/Codes'
import MyGames from '../../../models/MyGames'
import Game from '../../../models/Game'
import { getTimeEnd, getTimeStart } from '../../../constants/timePlay'
import { generate } from '../../../constants/generateCode'

const GenerateNewCode = async (codeId, data) => {
  const { time, playDate } = data

  try {
    const code = await Codes.findOne({ codeId })
    if (!code) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Code not found',
      }
    } else {
      const today = new Date()
      const playingDate = new Date(playDate)

      const isExpired = (firstDate, secondDate) => {
        if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
          return true
        }

        return false
      }

      const game = await Game.findOne({ gameId: code.gameId })
      const newCode = generate(8)
      const updateQuery = await Codes.updateOne(
        { codeId },
        {
          playingDate: playingDate,
          timeStart: getTimeStart(time),
          timeEnd: getTimeEnd(time, game.gameDuration),
          uniqueCode: newCode,
        }
      )

      if (updateQuery) {
        const updateMyGame = await MyGames.updateOne(
          { codeId: code.codeId },
          {
            isExpired: isExpired(playingDate, today),
            isPlayed: false,
            lastPlayer: '',
            lastPlayedDate: null,
          }
        )
        if (updateMyGame) {
          return {
            success: true,
            statusCode: 200,
            message: 'Code generated success',
            data: {
              uniqueCode: newCode,
            },
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
  } catch (error) {
    return error
  }
}

export default GenerateNewCode
