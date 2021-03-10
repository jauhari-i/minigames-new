import Game from '../../../models/Game'
import MyGame from '../../../models/MyGames'
import Codes from '../../../models/Codes'
import User from '../../../models/Users'

const ListCode = async () => {
  try {
    const userGame = await MyGame.find({})

    if (userGame.length === 0) {
      return {
        success: true,
        message: 'Get code success',
        data: [],
        statusCode: 200,
      }
    } else {
      const gameUser = await Promise.all(
        userGame.map(async item => {
          const game = await Game.findOne({ gameId: item.gameId })
          const code = await Codes.findOne({ codeId: item.codeId })
          const members = await User.find({ userId: { $in: code.codeMembers } })
          const user = await User.findOne({ userId: item.userId })
          const member = members.map(item => ({
            userId: item.userId,
            username: item.username,
            name: item.name,
            email: item.email,
            image: item.userImage.secure_url,
          }))

          const today = new Date()
          const playDate = new Date(code.playingDate)

          const isExpired = (firstDate, secondDate) => {
            if (
              firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)
            ) {
              return true
            }

            return false
          }

          if (!game || !user) {
            return null
          } else {
            if (isExpired(playDate, today)) {
              const updateMyGames = await MyGame.updateOne(
                { myGameId: item.myGameId },
                { isExpired: true }
              )
              if (updateMyGames) {
                return {
                  myGameId: item.myGameId,
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
                  },
                  userId: user.userId,
                  userData: {
                    userId: user.userId,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    image: user.userImage.secure_url,
                  },
                  isExpired: true,
                  isPlayed: item.isPlayed,
                  codeId: code.codeId,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                }
              } else {
                return {
                  myGameId: item.myGameId,
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
                  },
                  userId: user.userId,
                  userData: {
                    userId: user.userId,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    image: user.userImage.secure_url,
                  },
                  isExpired: true,
                  isPlayed: item.isPlayed,
                  codeId: code.codeId,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                }
              }
            } else {
              const updateMyGames = await MyGame.updateOne(
                { myGameId: item.myGameId },
                { isExpired: false }
              )
              if (updateMyGames) {
                return {
                  myGameId: item.myGameId,
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
                  },
                  userId: user.userId,
                  userData: {
                    userId: user.userId,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    image: user.userImage.secure_url,
                  },
                  isExpired: item.isExpired,
                  isPlayed: item.isPlayed,
                  codeId: code.codeId,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                }
              } else {
                return {
                  myGameId: item.myGameId,
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
                  },
                  userId: user.userId,
                  userData: {
                    userId: user.userId,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    image: user.userImage.secure_url,
                  },
                  isExpired: item.isExpired,
                  isPlayed: item.isPlayed,
                  codeId: code.codeId,
                  uniqueCode: code.uniqueCode,
                  members: member,
                  playingSchedule: code.playingDate,
                  timeStart: code.timeStart,
                  timeEnd: code.timeEnd,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
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
        message: 'Get code success',
        data: data,
        statusCode: 200,
      }
    }
  } catch (error) {
    return error
  }
}

export default ListCode
