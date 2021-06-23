import { db } from '../../db/mysqlConnection'
import bcrypt from 'bcryptjs'
import { defaultImage } from '../../constants/defaultImage'
import { Uploader, DeleteImage } from '../../middlewares/UploadImage'
import { v4 as uuid } from 'uuid'
import {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CREATED,
  CONFLICT,
} from 'http-status'
import moment from 'moment'
import { isValidURL } from '../../helpers/validateUrl'

const generateSalt = async length => {
  const ns = await bcrypt.genSaltSync(length)
  return ns
}

const encryptPassword = async (password, salt) => {
  const encrypted = await bcrypt.hashSync(password, salt)
  return encrypted
}

export const findAdminByEmail = async email => {
  try {
    const [
      row,
      fields,
    ] = await db.query('SELECT * FROM tb_admin WHERE email = ?', [email])

    if (row.length) {
      const data = row[0]
      return {
        code: OK,
        msg: 'Admin found',
        data,
      }
    } else {
      throw {
        code: NOT_FOUND,
        msg: 'Email tidak ditemukan',
        detail: fields,
      }
    }
  } catch (error) {
    return {
      code: error.code,
      error: true,
      detail: error,
    }
  }
}

export const findAdminById = async adminId => {
  try {
    const [
      row,
      fields,
    ] = await db.query(
      'SELECT tb_admin.*, tb_image.secure_url FROM tb_admin INNER JOIN tb_image ON tb_admin.imageId=tb_image.imageId WHERE adminId = ?',
      [adminId]
    )

    if (row.length) {
      const data = row[0]
      return {
        code: OK,
        msg: 'Admin found',
        data,
      }
    } else {
      throw {
        code: NOT_FOUND,
        msg: 'Admin tidak ditemukan',
        detail: fields,
      }
    }
  } catch (error) {
    return {
      code: error.code,
      error: true,
      detail: error,
      msg: error.msg,
    }
  }
}

export const findAdmin = async (page = 1, size = 10) => {
  try {
    return await db
      .query('SELECT COUNT(*) as total FROM tb_admin')
      .then(async result => {
        const adminRows = result[0][0].total
        const skip = (page - 1) * size
        const limit = skip + ',' + size
        return await db
          .query(
            'SELECT tb_admin.adminId, tb_admin.name, tb_admin.email, tb_admin.createdAt, tb_admin.updatedAt, tb_admin.lastLogin, tb_image.secure_url FROM tb_admin INNER JOIN tb_image ON tb_admin.imageId = tb_image.imageID WHERE isSuper = 0 ORDER BY tb_admin.createdAt DESC LIMIT ' +
              limit
          )
          .then(async res => {
            const row = res[0]

            const data = row.map(item => ({
              adminId: item.adminId,
              name: item.name,
              email: item.email,
              image: item.secure_url,
              lastLogin: item.lastLogin,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            }))

            const totalPage = Math.ceil(adminRows / size)

            const meta = {
              page: Number(page),
              size: Number(size),
              totalData: data.length,
              totalPage,
            }

            return {
              code: OK,
              message: 'Get admins success',
              data: { data: data, meta },
            }
          })
          .catch(() => {
            return {
              code: INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
            }
          })
      })
      .catch(() => {
        return {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        }
      })
  } catch (error) {
    return {
      code: error.code,
      msg: error.msg,
      error: true,
    }
  }
}

export const insertAdminToDB = async data => {
  try {
    const { name, email, password } = data

    const adminId = uuid()

    const salt = await generateSalt(10)
    const encrypted = await encryptPassword(password, salt)

    return await db
      .query(
        'INSERT INTO tb_admin (adminId, name,email,password) VALUES (?,?,?,?)',
        [adminId, name, email, encrypted]
      )
      .then(async row => {
        const { public_id, secure_url } = await Uploader(defaultImage)

        return await db
          .query('INSERT INTO tb_image (imageId, secure_url) VALUES (?,?)', [
            public_id,
            secure_url,
          ])
          .then(async img => {
            return await db
              .query('UPDATE tb_admin SET ? WHERE adminId = ?', [
                { imageId: public_id },
                adminId,
              ])
              .then(q => {
                return {
                  code: CREATED,
                  message: 'Admin berhasil dibuat',
                  row,
                  img,
                  q,
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
            msg: 'Email sudah digunakan',
          }
        } else {
          return {
            code: INTERNAL_SERVER_ERROR,
            msg: 'Internal server error!',
          }
        }
      })
  } catch (error) {
    return {
      code: error.code,
      msg: error.msg,
      error: true,
      detail: error,
    }
  }
}

export const updateLastLogin = async email => {
  try {
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    const [res, error] = await db.query(
      'UPDATE tb_admin SET ? WHERE email = ?',
      [{ lastLogin: mysqlTimestamp }, email]
    )
    if (error !== undefined) return INTERNAL_SERVER_ERROR
    return res
  } catch (error) {
    return error
  }
}

export const updateProfile = async (adminId, { name, image }) => {
  return await findAdminById(adminId)
    .then(async res => {
      if (isValidURL(image)) {
        const [
          update,
          error,
        ] = await db.query('UPDATE tb_admin SET ? WHERE adminId = ?', [
          { name: name },
          adminId,
        ])
        if (error !== undefined) return INTERNAL_SERVER_ERROR
        return {
          query: update,
          code: OK,
        }
      } else {
        await DeleteImage(res.data.imageId)
          .then(async () => {
            const img = await Uploader(image)
            const [
              update,
              error,
            ] = await db.query('UPDATE tb_image SET ? WHERE imageId = ?', [
              { secure_url: img.secure_url },
              res.data.imageId,
            ])
            if (error !== undefined) return INTERNAL_SERVER_ERROR
            return {
              query: update,
              code: OK,
            }
          })
          .catch(() => {
            return INTERNAL_SERVER_ERROR
          })
      }
    })
    .catch(err => {
      return err
    })
}

export const getDetailAdmin = async adminId => {
  return await findAdminById(adminId)
    .then(async res => {
      if (res.code !== NOT_FOUND) {
        const item = res.data
        const admin = {
          adminId: item.adminId,
          name: item.name,
          email: item.email,
          image: item.secure_url,
          lastLogin: item.lastLogin,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }
        return admin
      } else {
        return {
          code: NOT_FOUND,
          message: res.msg,
          error: res.error,
        }
      }
    })
    .catch(err => {
      return err
    })
}

export const deleteAdminById = async adminId => {
  return await findAdminById(adminId)
    .then(async data => {
      if (data.code === NOT_FOUND) {
        return {
          code: NOT_FOUND,
        }
      } else {
        await DeleteImage(data.data.imageId)
          .then(async () => {
            await db
              .query('DELETE FROM tb_admin WHERE adminId = ?', [adminId])
              .then(res => {
                const [query, error] = res
                if (error !== undefined)
                  return {
                    code: NOT_FOUND,
                    message: 'Admin Not Found!',
                    error: true,
                  }
                return {
                  code: OK,
                  query,
                }
              })
              .catch(err => {
                return err
              })
          })
          .catch(() => {
            return { code: INTERNAL_SERVER_ERROR }
          })
      }
    })
    .catch(error => {
      return error
    })
}
