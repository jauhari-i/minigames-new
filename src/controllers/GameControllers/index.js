import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  GameServices: {
    AddGame,
    DeleteGame,
    ListGameAdmin,
    DetailGame,
    ActivateGame,
    UpdateGame,
    DisableGame,
    ListGameUser,
    ListGameWeb,
    DetailGameWeb,
  },
} = services

const controller = {
  addGameHandler: async (req, res) => {
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
        title,
        poster,
        image,
        genre,
        price,
        discount,
        rating,
        description,
        difficulty,
        capacity,
        duration,
        url,
        ready,
      } = req.body

      const data = {
        title,
        poster,
        image,
        genre,
        price,
        discount,
        rating,
        description,
        difficulty,
        capacity,
        duration,
        url,
        ready,
      }
      const adminId = req.adminId

      const query = await AddGame(data, adminId)
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
  deleteGameHandler: async (req, res) => {
    const { gameId } = req.params

    const query = await DeleteGame(gameId)
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
  updateGameHandler: async (req, res) => {
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
        title,
        poster,
        image,
        genre,
        price,
        discount,
        rating,
        description,
        difficulty,
        capacity,
        duration,
        url,
        ready,
      } = req.body

      const data = {
        title,
        poster,
        image,
        genre,
        price,
        discount,
        rating,
        description,
        difficulty,
        capacity,
        duration,
        url,
        ready,
      }
      const { gameId } = req.params

      const query = await UpdateGame(data, gameId)
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
  detailGameHandler: async (req, res) => {
    const { gameId } = req.params

    const query = await DetailGame(gameId)
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
  listGameAdminHandler: async (req, res) => {
    const query = await ListGameAdmin()
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
  activateGameHandler: async (req, res) => {
    const { gameId } = req.params

    const query = await ActivateGame(gameId)
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
  disableGameHandler: async (req, res) => {
    const { gameId } = req.params

    const query = await DisableGame(gameId)
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
  listGameWebHandler: async (req, res) => {
    const { userId } = req

    const query = await ListGameWeb(userId)
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
  listGameUserHandler: async (req, res) => {
    const { userId } = req

    const query = await ListGameUser(userId)
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
  detailGameWebHandler: async (req, res) => {
    const { gameId } = req.params
    const { userId } = req

    const query = await DetailGameWeb(gameId, userId)
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
}

export { controller }
