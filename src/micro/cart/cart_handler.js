import { addItemToCart, findUserCart, removeItemFromCart } from './cart_query'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'
import { validateCart } from '../validation'

export const addToCart = async (req, res) => {
  const { userId, body } = req

  const validation = await validateCart(body)
  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
    })
  } else {
    const query = await addItemToCart(body, userId)
    if (!query.code) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      })
    } else {
      return res.status(query.code).json(query)
    }
  }
}

export const removeFromCart = async (req, res) => {
  const {
    params: { itemId },
  } = req

  const query = await removeItemFromCart(itemId)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}

export const getUserCart = async (req, res) => {
  const { userId } = req

  const query = await findUserCart(userId)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
