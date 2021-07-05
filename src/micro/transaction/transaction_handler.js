import {
  accTrans,
  checkout,
  deleteTrans,
  findOneTransactionAdmin,
  findOneTransactionUsers,
  findTransactionAdmin,
  findTransactionUsers,
  rejTrans,
  updateImage,
} from './transaction_query'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'
import { validateReject } from '../validation'

export const checkoutTransaction = async (req, res) => {
  const query = await checkout(req.userId)

  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
export const uploadTransImage = async (req, res) => {
  const {
    body: { image },
    userId,
    params: { transactionId },
  } = req

  if (!image || image === '') {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: 'Image cant be empty',
    })
  } else {
    const query = await updateImage(image, userId, transactionId)
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
export const listTransactionAdmin = async (req, res) => {
  const {
    query: { page = 1, size = 10 },
  } = req
  const query = await findTransactionAdmin(page, size)

  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
export const listTransactionUsers = async (req, res) => {
  const {
    query: { page = 1, size = 10 },
    userId,
  } = req
  const query = await findTransactionUsers(page, size, userId)

  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
export const detailTransactionAdmin = async (req, res) => {
  const {
    params: { transactionId },
  } = req

  const query = await findOneTransactionAdmin(transactionId)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
export const detailTransactionUser = async (req, res) => {
  const {
    params: { transactionId },
    userId,
  } = req

  const query = await findOneTransactionUsers(transactionId, userId)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
export const acceptTransaction = async (req, res) => {
  const {
    adminId,
    params: { transactionId },
  } = req

  const query = await accTrans(transactionId, adminId)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
export const rejectTransaction = async (req, res) => {
  const {
    params: { transactionId },
    adminId,
    body,
  } = req

  const validation = await validateReject(body)

  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
    })
  } else {
    const query = await rejTrans(transactionId, body.reason, adminId)
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
export const deleteTransaction = async (req, res) => {
  const {
    params: { transactionId },
  } = req

  const query = await deleteTrans(transactionId)
  if (!query.code) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  } else {
    return res.status(query.code).json(query)
  }
}
