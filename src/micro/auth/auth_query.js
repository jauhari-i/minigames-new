import { db } from '../../db/mysqlConnection'
import bcrypt from 'bcryptjs'
import { defaultImage } from '../../constants/defaultImage'
import { Uploader } from '../../middlewares/UploadImage'
import { v4 as uuid } from 'uuid'
import {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CREATED,
  CONFLICT,
} from 'http-status'
import jsonwebtoken from 'jsonwebtoken'
import { sendVerificationEmail } from '../../middlewares/SendEmail'
import moment from 'moment'

var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

const generateSalt = async length => {
  const ns = await bcrypt.genSaltSync(length)
  return ns
}

const encryptPassword = async (password, salt) => {
  const encrypted = await bcrypt.hashSync(password, salt)
  return encrypted
}

export const findUserByEmail = async email => {
  try {
    return await db
      .query('SELECT * FROM tb_users WHERE email = ?', [email])
      .then(res => {
        const row = res[0]
        if (row.length === 0) {
          return {
            code: NOT_FOUND,
            message: 'User tidak ditemukan',
            data: {},
          }
        } else {
          return {
            code: OK,
            data: row[0],
          }
        }
      })
      .catch(() => {
        return {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          data: {},
        }
      })
  } catch (error) {
    return error
  }
}

export const findUserById = async id => {
  try {
    return await db
      .query(
        'SELECT tb_users.*,tb_image.secure_url FROM tb_users INNER JOIN tb_image ON tb_users.imageId=tb_image.imageId WHERE userId = ?',
        [id]
      )
      .then(res => {
        const row = res[0]
        if (row.length === 0) {
          return {
            code: NOT_FOUND,
            message: 'User tidak ditemukan',
            data: {},
          }
        } else {
          return {
            code: OK,
            data: row[0],
          }
        }
      })
      .catch(() => {
        return {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          data: {},
        }
      })
  } catch (error) {
    return error
  }
}

export const insertUser = async data => {
  const { name, email, username, password } = data
  try {
    const userId = uuid()

    const salt = await generateSalt(10)
    const encrypted = await encryptPassword(password, salt)

    return await db
      .query(
        'INSERT INTO tb_users (userId, name, username, email, password) VALUES (?,?,?,?,?)',
        [userId, name, username, email, encrypted]
      )
      .then(async () => {
        const { public_id, secure_url } = await Uploader(defaultImage)

        return await db
          .query('INSERT INTO tb_image (imageId, secure_url) VALUES (?,?)', [
            public_id,
            secure_url,
          ])
          .then(async () => {
            return await db
              .query('UPDATE tb_users SET ? WHERE userId = ?', [
                { imageId: public_id },
                userId,
              ])
              .then(async () => {
                const verificationToken = await jsonwebtoken.sign(
                  { sub: userId },
                  'minigames-verification',
                  { expiresIn: '30m' }
                )

                const sendEmail = await sendVerificationEmail(
                  email,
                  verificationToken
                )
                if (sendEmail) {
                  return {
                    code: CREATED,
                    msg: 'User berhasil dibuat',
                  }
                } else {
                  return await db
                    .query('DELETE FROM tb_users WHERE userId = ? ', [userId])
                    .then(() => {
                      return {
                        code: INTERNAL_SERVER_ERROR,
                        msg: 'Internal server error!',
                      }
                    })
                    .catch(() => {
                      return {
                        code: INTERNAL_SERVER_ERROR,
                        msg: 'Internal server error!',
                      }
                    })
                }
              })
              .catch(error => {
                return {
                  code: INTERNAL_SERVER_ERROR,
                  msg: 'Internal server error!',
                  detail: error,
                }
              })
          })
          .catch(error => {
            return {
              code: INTERNAL_SERVER_ERROR,
              msg: 'Internal server error!',
              detail: error,
            }
          })
      })
      .catch(err => {
        if (err.errno === 1062) {
          return {
            code: CONFLICT,
            msg: 'Email atau username telah digunakan',
          }
        } else {
          return {
            code: INTERNAL_SERVER_ERROR,
            msg: 'Internal server error!',
          }
        }
      })
  } catch (error) {
    return error
  }
}

export const updateLastLogin = async email => {
  try {
    const [res, error] = await db.query(
      'UPDATE tb_users SET ? WHERE email = ?',
      [{ lastLogin: mysqlTimestamp }, email]
    )
    if (error !== undefined) return INTERNAL_SERVER_ERROR
    return res
  } catch (error) {
    return error
  }
}

export const updateVerify = async id => {
  try {
    const user = await findUserById(id)

    if (user.code === NOT_FOUND) {
      throw {
        code: NOT_FOUND,
        msg: 'User not found',
      }
    } else {
      const data = user.data

      if (data.isVerified === 1) {
        return {
          code: OK,
          msg: 'User already verified',
        }
      } else {
        return await db
          .query('UPDATE tb_users SET ? WHERE userId = ?', [
            { isVerified: 1, verifiedAt: mysqlTimestamp },
            data.userId,
          ])
          .then(() => {
            return {
              code: OK,
              msg: 'User verified',
            }
          })
          .catch(() => {
            return {
              code: INTERNAL_SERVER_ERROR,
              msg: 'Internal server error',
            }
          })
      }
    }
  } catch (error) {
    return error
  }
}

export const requestEmail = async id => {
  try {
    const user = await findUserById(id)
    if (user.code === NOT_FOUND) {
      throw {
        code: NOT_FOUND,
        msg: 'User not found',
      }
    } else {
      const data = user.data

      if (data.isVerified === 1) {
        return {
          code: OK,
          msg: 'User already verified',
        }
      } else {
        const verificationToken = await jsonwebtoken.sign(
          { sub: data.userId },
          'minigames-verification',
          { expiresIn: '30m' }
        )

        const sendEmail = await sendVerificationEmail(
          data.email,
          verificationToken
        )

        if (sendEmail) {
          return {
            code: CREATED,
            msg: 'Email telah terkirim',
          }
        } else {
          return {
            code: INTERNAL_SERVER_ERROR,
            msg: 'Internal server error',
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}
