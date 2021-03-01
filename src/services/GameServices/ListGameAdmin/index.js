import Game from '../../../models/Game'

const ListGameAdmin = async () => {
  try {
    const game = await Game.find({})

    if (game.length === 0) {
      return {
        success: true,
        message: 'Get game success',
        data: [],
        statusCode: 200,
      }
    } else {
      const gameData = game.map(item => ({
        gameId: item.gameId,
        gameTitle: item.gameTitle,
        posterImage: item.posterImage,
        gameImage: item.gameImage,
        gameDescription: item.gameDescription,
        gamePrice: item.gamePrice,
        gameDiscount: item.gameDiscount,
        gamePriceAfterDiscount: item.gamePriceAfterDiscount,
        gameDifficulty: item.gameDifficulty,
        gameRating: item.gameRating,
        gameGenre: item.gameGenre,
        gameDuration: item.gameDuration,
        gameUrl: item.gameUrl,
        gameCapacity: item.gameCapacity,
        gameReady: item.gameReady,
        createdAt: item.createdAt,
        createdBy: item.createdBy,
      }))
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

export default ListGameAdmin
