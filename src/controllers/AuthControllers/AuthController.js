import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  AuthServices: {
    RegisterUser,
    LoginUser,
    VerifyUser,
    RequestEmaillVerification,
  },
} = services

const controller = {
  registerUser: async (req, res) => {
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
      const { name, email, username, password, confirmPassword } = req.body
      if (password !== confirmPassword) {
        handleError({
          success: false,
          statusCode: 400,
          message: 'Password confirmation not match',
        })
      } else {
        const query = await RegisterUser({ name, email, username, password })

        if (query) {
          if (!query.success) {
            handleError(query, res)
          } else {
            res.status(query.statusCode).json(query)
          }
        } else {
          handleError(
            { statusCode: 500, message: 'Internal server error' },
            res
          )
        }
      }
    }
  },
  loginUser: async (req, res) => {
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
      const { email, password } = req.body

      const query = await LoginUser({ email, password })

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
  verifyUser: async (req, res) => {
    const { token } = req.params
    if (!token) {
      handleError(
        {
          statusCode: 400,
          message: 'Token is missing',
        },
        res
      )
    } else {
      const query = await VerifyUser(token)
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
  requestEmailVerification: async (req, res) => {
    const { token } = req.params
    if (!token) {
      handleError(
        {
          statusCode: 400,
          message: 'Token is missing',
        },
        res
      )
    } else {
      const query = await RequestEmaillVerification(token)
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
