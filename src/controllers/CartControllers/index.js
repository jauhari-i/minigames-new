import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  CartServices: { AddToCart, GetCart, RemoveFromCart },
} = services

const controller = {
  addToCartHandler: async (req, res) => {
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
      const { gameId, playDate, members, time } = req.body

      const data = {
        gameId,
        playDate,
        members,
        time,
      }

      const { userId } = req

      const query = await AddToCart(userId, data)
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
  getCartHandler: async (req, res) => {
    const { userId } = req

    const query = await GetCart(userId)
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
  removeFromCartHandler: async (req, res) => {
    const {
      userId,
      params: { itemId },
    } = req

    const query = await RemoveFromCart(itemId, userId)
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
