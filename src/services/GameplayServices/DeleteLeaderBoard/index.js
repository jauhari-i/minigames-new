import Leaderboard from '../../../models/Leaderboard'

const DeleteLeaderboard = async leaderboardId => {
  try {
    const lb = await Leaderboard.findOne({ leaderboardId })

    if (!lb) {
      throw {
        success: false,
        message: 'Leaderboard not found',
        statusCode: 404,
      }
    } else {
      const query = await Leaderboard.deleteOne({
        leaderboardId: lb.leaderboardId,
      })

      if (!query) {
        throw {
          success: false,
          message: 'Internal server error',
          statusCode: 500,
        }
      } else {
        return {
          success: true,
          message: 'Delete game success',
          statusCode: 200,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default DeleteLeaderboard
