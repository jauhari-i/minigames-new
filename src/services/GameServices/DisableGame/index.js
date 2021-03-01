import Game from '../../../models/Game'

const DisableGame = async gameId => {
  try {
    const game = await Game.findOne({ gameId: gameId })
    if (!game) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Game not found',
      }
    } else {
      const updateQuery = await Game.updateOne({ gameReady: false })
      if (!updateQuery) {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error',
        }
      } else {
        return {
          success: true,
          message: 'Game is disabled',
          statusCode: 200,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default DisableGame
