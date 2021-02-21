import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  AdminServices: {
    AddAdmin,
    DeleteAdmin,
    GetListAdmin,
    GetProfileAdmin,
    UpdatePassword,
    UpdateProfile,
  },
} = services

const controller = {
  addAdminHandler: async (req, res) => {
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
      const { name, email, password } = req.body
      const data = { name, email, password }
      const query = await AddAdmin(data)
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
  deleteAdminHandler: async (req, res) => {
    const { adminId } = req.params
    if (!adminId) {
      handleError(
        { statusCode: 400, message: 'Id is not valid', success: false },
        res
      )
    } else {
      const query = await DeleteAdmin(adminId)
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
  listAdminHandler: async (req, res) => {
    const query = await GetListAdmin()
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
  profileAdminHandler: async (req, res) => {
    const adminId = req.adminId
    if (!adminId) {
      handleError(
        { success: false, statusCode: 401, message: 'Unauhtorized' },
        res
      )
    } else {
      const query = await GetProfileAdmin(adminId)
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
  detailAdminHandler: async (req, res) => {
    const adminId = req.params.adminId
    if (!adminId) {
      handleError(
        { success: false, statusCode: 400, message: 'Invalid id provided' },
        res
      )
    } else {
      const query = await GetProfileAdmin(adminId)
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
  updatePasswordHandler: async (req, res) => {
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
      const adminId = req.adminId
      if (newPassword !== confirmPassword) {
        handleError(
          {
            statusCode: 400,
            message: 'Password confirmation not same',
          },
          res
        )
      }
      const data = { oldPassword, password: newPassword }
      const query = await UpdatePassword(adminId, data)
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
  updateProfileHandler: async (req, res) => {
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
      const { name, image } = req.body

      const data = { name, image }

      const adminId = req.adminId

      const query = await UpdateProfile(adminId, data)
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
  updateAdminHandler: async (req, res) => {
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
      const { name, image } = req.body

      const data = { name, image }

      const adminId = req.params.adminId

      const query = await UpdateProfile(adminId, data)
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
