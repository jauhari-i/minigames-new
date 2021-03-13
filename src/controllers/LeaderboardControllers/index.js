import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  LeaderboardServices: {
    DeleteLeaderboard,
    GetLeaderboardAdmin,
    GetLeaderboardUser,
    JoinGame,
    SaveGame,
  },
} = services

const controller = {
  deleteLeaderboardHandler: async (req, res) => {
    const {
      params: { leaderboardId },
    } = req

    const query = await DeleteLeaderboard(leaderboardId)
    if (query) {
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    } else {
      handleError({ statusCode: 500, message: 'Internal server error' }, res)
    }
  },
  getLeaderboardAdminHandler: async (req, res) => {
    const {
      params: { sort = 'score' },
    } = req

    const query = await GetLeaderboardAdmin(sort)
    if (query) {
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    } else {
      handleError({ statusCode: 500, message: 'Internal server error' }, res)
    }
  },
  getLeaderboardUserHandler: async (req, res) => {
    const {
      params: { sort = 'score', gameId },
    } = req

    const query = await GetLeaderboardUser(gameId, sort)
    if (query) {
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    } else {
      handleError({ statusCode: 500, message: 'Internal server error' }, res)
    }
  },
  joinGameHandler: async (req, res) => {
    const validationError = validationResult(req)
    if (validationError.errors.length) {
      handleError(
        {
          statusCode: 400,
          message: 'Input error',
          errors: validationError.errors,
        },
        res
      )
    } else {
      const {
        body: { code },
        userId,
      } = req

      const query = await JoinGame(code, userId)

      if (query) {
        if (!query.success) {
          handleError(query, res)
        } else {
          res.status(query.statusCode).json(query)
        }
      } else {
        handleError({ statusCode: 500, message: 'Internal server error' }, res)
      }
    }
  },
  saveGameHandler: async (req, res) => {
    const validationError = validationResult(req)
    if (validationError.errors.length) {
      handleError(
        {
          statusCode: 400,
          message: 'Input error',
          errors: validationError.errors,
        },
        res
      )
    } else {
      const {
        body: { codeId, time, teamName, teamIcon, uniqueCode },
        userId,
      } = req

      const query = await SaveGame(
        codeId,
        uniqueCode,
        time,
        teamName,
        teamIcon,
        userId
      )

      if (query) {
        if (!query.success) {
          handleError(query, res)
        } else {
          res.status(query.statusCode).json(query)
        }
      } else {
        handleError({ statusCode: 500, message: 'Internal server error' }, res)
      }
    }
  },
}

export { controller }
