import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  GameServices: { AddGame },
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
}

export { controller }
