import {
  findUserByEmail,
  findUserById,
  insertUser,
  requestEmail,
  updateLastLogin,
  updateVerify,
} from './auth_query'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../auth/jwt_auth_instance'
import {
  OK,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} from 'http-status'
import jsonwebtoken from 'jsonwebtoken'
import { validateLogin, validateRegisterUser } from '../validation'

const comparePassword = async (password, hashed) => {
  const isMatch = await bcrypt.compareSync(password, hashed)

  if (isMatch) return true
  return false
}

export const loginUser = async (req, res) => {
  const {
    body: { email, password },
  } = req

  const validation = await validateLogin({ email, password })

  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
    })
  } else {
    const user = await findUserByEmail(email)

    const { code, data, msg } = user

    if (code === 404) {
      return res.status(NOT_FOUND).json({
        code: NOT_FOUND,
        error: true,
        message: msg,
      })
    } else {
      if (data.isVerified === 0) {
        return res.status(NOT_FOUND).json({
          code: NOT_FOUND,
          error: true,
          message: 'User not verified',
        })
      } else {
        const isMatch = await comparePassword(password, data.password)
        if (isMatch) {
          const payload = {
            sub: data.userId,
            role: 9,
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
            message: 'Password tidak sama',
          })
        }
      }
    }
  }
}

export const registerUser = async (req, res) => {
  const {
    body: { name, username, email, password, confirmPassword },
  } = req

  const validation = await validateRegisterUser({
    name,
    username,
    email,
    password,
    confirmPassword,
  })

  if (validation.error) {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message: validation.message,
    })
  } else {
    const resp = await insertUser({ name, username, email, password })

    if (resp.code !== CREATED) {
      return res.status(resp.code).json({
        code: resp.code,
        error: true,
        message: resp.msg,
      })
    } else {
      return res.status(CREATED).json({
        code: CREATED,
        message: 'User berhasil dibuat',
      })
    }
  }
}

export const profileUser = async (req, res) => {
  const { userId } = req

  const user = await findUserById(userId)

  const { code } = user

  if (code === NOT_FOUND) {
    return res.status(NOT_FOUND).json({
      code: NOT_FOUND,
      message: 'User tidak ditemukan',
      data: {},
    })
  } else {
    const { data } = user
    const u = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      username: data.username,
      image: data.secure_url,
      isVerified: data.isVerified,
      verifiedAt: data.verifiedAt,
      city: data.city,
      province: data.province,
      birthdate: data.birthdate,
      phoneNumber: data.phoneNumber,
      lastLogin: data.lastLogin,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }

    return res.status(OK).json({
      code: OK,
      message: 'Get profile success',
      data: u,
    })
  }
}

export const verifyUser = async (req, res) => {
  const {
    params: { token },
  } = req

  await jsonwebtoken.verify(
    token,
    'minigames-verification',
    async (err, dec) => {
      if (dec) {
        const query = await updateVerify(dec.sub)
        return res.status(query.code).json({
          code: query.code,
          message: query.msg,
        })
      } else {
        return res.status(BAD_REQUEST).json({
          code: BAD_REQUEST,
          error: true,
          message: err.message,
        })
      }
    }
  )
}

export const requestVerification = async (req, res) => {
  const {
    params: { token },
  } = req

  const decoded = await jsonwebtoken.decode(token, 'minigames-verification')

  if (decoded !== null) {
    const query = await requestEmail(decoded.sub)
    return res.status(query.code).json({
      code: query.code,
      message: query.msg,
    })
  } else {
    return res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      error: true,
      message: 'Token tidak valid',
    })
  }
}
