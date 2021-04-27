import Game from '../../../models/Game'
import MyGame from '../../../models/MyGames'

const ListGameWeb = async userId => {
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
      const gameWeb = await Promise.all(
        game.map(async item => {
          const usergame = await MyGame.findOne({
            gameId: item.gameId,
            userId: userId,
            isPlayed: false,
          })
          return {
            gameId: item.gameId,
            gameTitle: item.gameTitle,
            posterImage: item.posterImage.secure_url,
            gameImage: item.gameImage.secure_url,
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
            canPlay:
              usergame &&
              usergame.myGameId &&
              !usergame.isExpired &&
              !usergame.isPlayed
                ? true
                : false,
            createdAt: item.createdAt,
            createdBy: item.createdBy,
          }
        })
      )
      return {
        success: true,
        message: 'Get game success',
        data: gameWeb,
        statusCode: 200,
      }
    }
  } catch (error) {
    return error
  }
}

export default ListGameWeb
