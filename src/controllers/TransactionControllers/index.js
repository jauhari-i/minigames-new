import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  TransactionServices: {
    AccTransaction,
    CheckoutTransaction,
    DeleteTransaction,
    DetailTransaction,
    ListTransactionAdmin,
    ListTransactionUser,
    RejectTransaction,
    UploadPayment,
  },
} = services

const controller = {
  accTransactionHandler: async (req, res) => {
    const {
      adminId,
      params: { transactionId },
    } = req

    const query = await AccTransaction(transactionId, adminId)
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
  checkoutTransctionHandler: async (req, res) => {
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
      const data = {
        cartId: req.body.cartId,
      }

      const { userId } = req

      const query = await CheckoutTransaction(data, userId)
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
  deleteTransactionHandler: async (req, res) => {
    const { transactionId } = req.params

    const query = await DeleteTransaction(transactionId)
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
  detailTransactionHandler: async (req, res) => {
    const { transactionId } = req.params

    const query = await DetailTransaction(transactionId)
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
  listTransactionAdminHandler: async (req, res) => {
    const query = await ListTransactionAdmin()
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
  listTransactionUserHandler: async (req, res) => {
    const { userId } = req

    const query = await ListTransactionUser(userId)
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
  rejectTransactionHandler: async (req, res) => {
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
        params: { transactionId },
        body: { reason },
        adminId,
      } = req
      const data = {
        transactionId,
        reason,
      }

      const query = await RejectTransaction(data, adminId)
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
  uploadPaymentHandler: async (req, res) => {
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
        params: { transactionId },
        body: { image },
      } = req
      const data = {
        image,
      }

      const query = await UploadPayment(data, transactionId)
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
