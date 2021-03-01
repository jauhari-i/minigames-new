import Game from '../../../models/Game'

const DetailGameAdmin = async gameId => {
  try {
    const game = await Game.findOne({ gameId: gameId })

    if (!game) {
      return {
        success: false,
        message: 'Game not found!',
        statusCode: 404,
      }
    } else {
      const gameData = {
        gameId: game.gameId,
        gameTitle: game.gameTitle,
        posterImage: game.posterImage,
        gameImage: game.gameImage,
        gameDescription: game.gameDescription,
        gamePrice: game.gamePrice,
        gameDiscount: game.gameDiscount,
        gamePriceAfterDiscount: game.gamePriceAfterDiscount,
        gameDifficulty: game.gameDifficulty,
        gameRating: game.gameRating,
        gameGenre: game.gameGenre,
        gameDuration: game.gameDuration,
        gameUrl: game.gameUrl,
        gameCapacity: game.gameCapacity,
        gameReady: game.gameReady,
        createdAt: game.createdAt,
        createdBy: game.createdBy,
      }
      return {
        success: true,
        message: 'Get game success',
        data: gameData,
        statusCode: 200,
      }
    }
  } catch (error) {
    return error
  }
}

export default DetailGameAdmin
