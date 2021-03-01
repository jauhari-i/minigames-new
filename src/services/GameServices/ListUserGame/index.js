import Game from '../../../models/Game'
import MyGame from '../../../models/MyGames'
import Codes from '../../../models/Codes'
import User from '../../../models/Users'

const ListGameUser = async userId => {
  try {
    const userGame = await MyGame.find({ userId: userId })

    if (userGame.length === 0) {
      return {
        success: true,
        message: 'Get game success',
        data: [],
        statusCode: 200,
      }
    } else {
      const gameUser = await Promise.all(
        userGame.map(async item => {
          const game = await Game.findOne({ gameId: item.gameId })
          const code = await Codes.findOne({ codeId: item.codeId })
          const members = await User.find({ userId: { $in: code.codeMembers } })

          const member = members.map(item => ({
            userId: item.userId,
            username: item.username,
            name: item.name,
            email: item.email,
            image: item.userImage.secure_url,
          }))

          let data

          if (game) {
            data = {
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
              canPlay: !item.isExpired && !item.isPlayed ? true : false,
              uniqueCode: code.uniqueCode,
              members: member,
              playingSchedule: code.playingDate,
              timeStart: code.timeStart,
              timeEnd: code.timeEnd,
              createdAt: game.createdAt,
              createdBy: game.createdBy,
            }
          } else {
            data = {
              gameId: item.gameId,
              gameTitle: 'Game Deleted',
              posterImage: 'Game Deleted',
              gameImage: 'Game Deleted',
              gameDescription: 'Game Deleted',
              gamePrice: 0,
              gameDiscount: 0,
              gamePriceAfterDiscount: 0,
              gameDifficulty: 0,
              gameRating: 0,
              gameGenre: [],
              gameDuration: 0,
              gameUrl: 'Game Deleted',
              gameCapacity: 0,
              gameReady: false,
              canPlay: false,
              uniqueCode: code.uniqueCode,
              members: member,
              playingSchedule: code.playingDate,
              timeStart: code.timeStart,
              timeEnd: code.timeEnd,
              createdAt: Date.now(),
              createdBy: Date.now(),
            }
          }

          return data
        })
      )
      return {
        success: true,
        message: 'Get game success',
        data: gameUser,
        statusCode: 200,
      }
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

export default ListGameUser
