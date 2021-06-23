import {
  findAdminByEmail,
  insertAdminToDB,
  updateLastLogin,
  findAdmin,
  findAdminById,
  updateProfile,
  getDetailAdmin,
  deleteAdminById,
} from './admin_query'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../auth/jwt_auth_instance'
import {
  OK,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} from 'http-status'

import { validateLogin, validateRegisterAdmin } from '../validation'

const comparePassword = async (password, hashed) => {
  const isMatch = await bcrypt.compareSync(password, hashed)

  if (isMatch) return true
  return false
}

export const loginAdmin = async (req, res) => {
  const {
    body: { email, password },
  } = req
  const validation = await validateLogin({ email, password })
  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
      error: true,
    })
  } else {
    const { code, msg, data } = await findAdminByEmail(email)

    if (code === 404) {
      return res.status(NOT_FOUND).json({
        code: NOT_FOUND,
        error: true,
        message: msg,
      })
    } else {
      const isMatch = await comparePassword(password, data.password)
      if (isMatch) {
        const payload = {
          sub: data.adminId,
          role: data.isSuper,
          email: data.email,
        }
        const token = await generateToken(payload)
        const lastLogin = await updateLastLogin(email)
        if (lastLogin === INTERNAL_SERVER_ERROR) {
          return res.status(INTERNAL_SERVER_ERROR).json({
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            error: true,
          })
        }
        return res.status(OK).json({
          code: OK,
          message: 'Login Success',
          data: {
            accessToken: token,
          },
        })
      } else {
        return res.status(BAD_REQUEST).json({
          code: BAD_REQUEST,
          error: true,
          message: 'Password not match',
        })
      }
    }
  }
}

export const registerAdmin = async (req, res) => {
  const validation = await validateRegisterAdmin(req.body)

  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
      error: true,
    })
  } else {
    const { code, msg } = await insertAdminToDB(req.body)

    if (code !== CREATED) {
      return res.status(code).json({
        code: code,
        error: true,
        message: msg,
      })
    } else {
      return res.status(CREATED).json({
        code: CREATED,
        message: 'Admin inserted',
      })
    }
  }
}

export const listAdmin = async (req, res) => {
  const {
    query: { page, size },
  } = req
  const admin = await findAdmin(page, size)

  res.status(admin.code).json(admin)
}

export const profileAdmin = async (req, res) => {
  const { adminId } = req

  const query = await findAdminById(adminId)

  if (query.code === 404) {
    return res.status(NOT_FOUND).json({
      code: NOT_FOUND,
      message: 'Admin not found',
      data: {},
      error: true,
    })
  } else if (query.code === 200) {
    return res.status(OK).json({
      code: OK,
      message: 'Get profile success',
      data: {
        adminId: query.data.adminId,
        name: query.data.name,
        email: query.data.email,
        lastLogin: query.data.lastLogin,
        createdAt: query.data.createdAt,
        updatedAt: query.data.updatedAt,
        image: query.data.secure_url,
      },
    })
  } else {
    return res.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      data: {},
      error: true,
    })
  }
}

export const editProfile = async (req, res) => {
  const {
    body: { name, image },
    adminId,
  } = req

  const query = await updateProfile(adminId, { name, image })

  if (query.code === OK) {
    return res.status(OK).json({
      code: OK,
      message: 'Data updated!',
    })
  } else {
    if (query === INTERNAL_SERVER_ERROR) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: true,
      })
    } else {
      return res.status(query.code).json(query)
    }
  }
}

export const detailAdmin = async (req, res) => {
  const {
    params: { adminId },
  } = req

  const query = await getDetailAdmin(adminId)

  if (query.adminId) {
    return res.status(OK).json({
      code: OK,
      message: 'Get admin success',
      data: query,
    })
  } else {
    return res.status(query.code).json(query)
  }
}

export const deleteAdmin = async (req, res) => {
  const {
    params: { adminId },
  } = req
  const query = await deleteAdminById(adminId)

  if (query.code === OK) {
    return res.status(OK).json({
      code: OK,
      message: 'Admin deleted',
    })
  } else if (query.code === NOT_FOUND) {
    return res.status(NOT_FOUND).json({
      code: NOT_FOUND,
      message: 'Admin not found',
    })
  } else {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ code: INTERNAL_SERVER_ERROR, message: 'Internal server error' })
  }
}
