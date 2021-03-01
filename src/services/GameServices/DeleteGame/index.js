import Game from '../../../models/Game'

const DeleteGame = async gameId => {
  try {
    const deleteQuery = await Game.deleteOne({ gameId: gameId })
    if (!deleteQuery) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Game not found',
      }
    } else {
      return {
        success: true,
        message: 'Game is deleted',
        statusCode: 200,
      }
    }
  } catch (error) {
    return error
  }
}

export default DeleteGame
