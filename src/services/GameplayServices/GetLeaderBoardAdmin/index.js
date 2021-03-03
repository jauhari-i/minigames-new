import Leaderboard from '../../../models/Leaderboard'
import Game from '../../../models/Game'
import Users from '../../../models/Users'
import MyGames from '../../../models/MyGames'

const GetLeaderboardUser = async sort => {
  try {
    const lb = await Leaderboard.find()

    const lbData = await Promise.all(
      lb.map(async item => {
        const game = await Game.findOne({ gameId: item.gameId })
        if (!game) {
          return null
        } else {
          const userGame = await MyGames.findOne({ myGameId: item.myGameId })

          const user = await Users.findOne({ userId: userGame.userId })

          return {
            leaderboardId: item.leaderboardId,
            leaderName: item.teamLeaderName,
            teamName: item.teamName,
            teamIcon: item.teamIcon,
            gameId: game.gameId,
            gameData: {
              gameId: game.gameId,
              gameTitle: game.gameTitle,
              posterImage: game.posterImage.secure_url,
              gameImage: game.gameImage.secure_url,
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
            },
            userId: user.userId,
            score: item.score,
            createdAt: item.createdAt,
          }
        }
      })
    )

    const data = lbData.filter(el => {
      return el != null
    })

    let sorted

    if (sort === 'score') {
      sorted = data.sort((a, b) => {
        if (a.score < b.score) return -1
        if (a.score > b.score) return 1
        return 0
      })
    } else {
      sorted = data.sort((a, b) => {
        if (new Date(a.createdAt) < new Date(b.createdAt)) return -1
        if (new Date(a.createdAt) > new Date(b.createdAt)) return 1
        return 0
      })
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Get leaderboard success',
      data: sorted,
    }
  } catch (error) {
    return error
  }
}

export default GetLeaderboardUser
