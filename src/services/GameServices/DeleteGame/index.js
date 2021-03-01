import Game from '../../../models/Game'
import { DeleteImage } from '../../../middlewares/UploadImage'

const DeleteGame = async gameId => {
  try {
    const game = await Game.findOne({ gameId: gameId })
    if (!game) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Game id not found',
      }
    } else {
      const deleteImage = await DeleteImage(game.gameImage.public_id)
      const deletePoster = await DeleteImage(game.posterImage.public_id)
      const deleteQuery = await Game.deleteOne({ gameId: gameId })
      if (!deleteQuery || !deleteImage || !deletePoster) {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error',
        }
      } else {
        return {
          success: true,
          message: 'Game is deleted',
          statusCode: 200,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default DeleteGame
