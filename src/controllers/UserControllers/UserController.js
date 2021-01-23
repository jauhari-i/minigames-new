import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  UserServices: {
    DeleteUser,
    GetProfile,
    ListUser,
    ListUserWeb,
    UpdatePassword,
    UpdateProfile,
  },
} = services

const controller = {
  deleteUser: async (req, res) => {
    const { id } = req.params
    const query = await DeleteUser(id)
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
  getProfileUser: async (req, res) => {
    const { userId } = req
    const query = await GetProfile(userId)
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
  listUserAdmin: async (req, res) => {
    const query = await ListUser()
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
  listUserWeb: async (req, res) => {
    const query = await ListUserWeb()
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
  updatePassword: async (req, res) => {
    const { userId } = req
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
      const { oldPassword, newPassword, confirmPassword } = req.body
      if (newPassword !== confirmPassword) {
        handleError({
          success: false,
          statusCode: 400,
          message: 'Password confirmation not match',
        })
      } else {
        const payload = {
          oldPassword,
          newPassword,
        }
        const query = await UpdatePassword(userId, payload)
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
  updateProfile: async (req, res) => {
    const { userId } = req
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
        name,
        userImage,
        city,
        province,
        birthday,
        phoneNumber,
      } = req.body
      const payload = {
        name,
        userImage,
        city,
        province,
        birthday,
        phoneNumber,
      }
      const query = await UpdateProfile(userId, payload)
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
