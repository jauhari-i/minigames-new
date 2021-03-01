import Game from '../../../models/Game'

const UpdateGame = async (data, id) => {
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

    const game = await Game.findOne({ gameId: id })
    if (!game) {
      throw {
        statusCode: 404,
        message: 'Game not found',
        success: false,
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
      }
      const updateQuery = await Game.updateOne({ gameId: game.gameId }, doc)
      if (!updateQuery) {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, failed to update game',
        }
      } else {
        return {
          success: true,
          statusCode: 200,
          message: 'Update game success',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default UpdateGame
