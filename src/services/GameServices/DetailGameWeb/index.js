import Game from '../../../models/Game'
import MyGame from '../../../models/MyGames'
import Codes from '../../../models/Codes'
import User from '../../../models/Users'

const DetailGameAdmin = async (gameId, userId) => {
  try {
    const game = await Game.findOne({ gameId: gameId })

    if (!game) {
      return {
        success: false,
        message: 'Game not found!',
        statusCode: 404,
      }
    } else {
      const usergame = await MyGame.findOne({
        gameId: game.gameId,
        userId: userId,
      })

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
        canPlay:
          usergame && !usergame.isExpired && !usergame.isPlayed ? true : false,
        createdAt: game.createdAt,
        createdBy: game.createdBy,
      }

      if (usergame) {
        const code = await Codes.findOne({ codeId: usergame.codeId })
        const members = await User.find({ userId: { $in: code.codeMembers } })

        const member = members.map(item => ({
          userId: item.userId,
          username: item.username,
          name: item.name,
          email: item.email,
          image: item.userImage,
        }))

        gameData.uniqueCode = code.uniqueCode
        gameData.members = member
        gameData.playingSchedule = code.playingDate
        gameData.timeStart = code.timeStart
        gameData.timeEnd = code.timeEnd
      }

      return {
        success: true,
        message: 'Get detail game success',
        data: gameData,
        statusCode: 200,
      }
    }
  } catch (error) {
    return error
  }
}

export default DetailGameAdmin
