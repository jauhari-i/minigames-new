import Game from '../../../models/Game'
import Admin from '../../../models/Admin'
import { v4 as uuid } from 'uuid'

const AddGame = async (data, adminId) => {
  try {
    const {
      title,
      poster,
      image,
      genre,
      price,
      discount,
      rating,
      description,
      difficulty,
      capacity,
      duration,
      url,
      ready,
    } = data

    const admin = await Admin.findOne({ adminId: adminId })
    if (!admin) {
      throw {
        success: false,
        statusCode: 403,
        message: 'This action is restricted',
      }
    } else {
      let discountPrice
      if (discount > 0) {
        let disc = price * (discount / 100)
        discountPrice = price - disc
      } else {
        discountPrice = price
      }
      const doc = {
        gameId: uuid(),
        gameTitle: title,
        posterImage: poster,
        gameImage: image,
        gameDescription: description,
        gamePrice: price,
        gameDiscount: discount ? discount : 0,
        gamePriceAfterDiscount: discountPrice,
        gameDifficulty: difficulty,
        gameRating: rating,
        gameGenre: genre,
        gameDuration: duration,
        gameUrl: url,
        gameCapacity: capacity,
        gameReady: ready,
        createdBy: {
          name: admin.adminName,
          adminId: admin.adminId,
        },
      }
      const newGame = await Game.create(doc)
      if (newGame) {
        return {
          success: true,
          message: 'Create game success',
          statusCode: 201,
          data: {
            gameId: newGame.gameId,
          },
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, failed to create game',
        }
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      return {
        success: false,
        statusCode: 500,
        message: error.message,
      }
    }
    return error
  }
}

export default AddGame
