import Game from '../../../models/Game'
import MyGame from '../../../models/MyGames'
import Codes from '../../../models/Codes'
import User from '../../../models/Users'
import { checkExpired } from '../../../middlewares/CheckExpired'

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
          const code = await Codes.findOne({ codeId: item.codeId })

          const playDate = code.playingDate

          const expired = checkExpired(playDate, code.timeEnd)

          const game = await Game.findOne({ gameId: item.gameId })
          const members = await User.find({ userId: { $in: code.codeMembers } })

          const member = members.map(item => ({
            userId: item.userId,
            username: item.username,
            name: item.name,
            email: item.email,
            image: item.userImage.secure_url,
          }))

          if (!game) {
            return null
          } else {
            if (expired) {
              const updateMygame = await MyGame.updateOne(
                { myGameId: item.myGameId },
                { isExpired: true }
              )
              if (updateMygame) {
                return {
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
                  canPlay: expired,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: game.createdAt,
                  createdBy: game.createdBy,
                }
              } else {
                return {
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
                  canPlay: expired,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: game.createdAt,
                  createdBy: game.createdBy,
                }
              }
            } else {
              const updateMygame = await MyGame.updateOne(
                { myGameId: item.myGameId },
                { isExpired: false }
              )
              if (updateMygame) {
                return {
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
                  canPlay: item.isPlayed ? false : true,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: game.createdAt,
                  createdBy: game.createdBy,
                }
              } else {
                return {
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
                  canPlay: item.isPlayed ? false : true,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: game.createdAt,
                  createdBy: game.createdBy,
                }
              }
            }
          }
        })
      )

      const data = gameUser.filter(el => {
        return el != null
      })
      return {
        success: true,
        message: 'Get game success',
        data: data,
        statusCode: 200,
      }
    }
  } catch (error) {
    return error
  }
}

export default ListGameUser
