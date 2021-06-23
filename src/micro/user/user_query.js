import { db } from '../../db/mysqlConnection'
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status'

export const findUsers = async (page = 1, size = 10) => {
  return await db
    .query('SELECT COUNT(*) as total FROM tb_users')
    .then(async result => {
      const userRows = result[0][0].total
      const skip = (page - 1) * size
      const limit = skip + ',' + size
      return await db
        .query(
          'SELECT tb_users.*, tb_image.secure_url FROM tb_users INNER JOIN tb_image ON tb_users.imageId=tb_image.imageId ORDER BY tb_users.createdAt DESC LIMIT ' +
            limit
        )
        .then(query => {
          const row = query[0]

          const data = row.map(item => ({
            userId: item.userId,
            name: item.name,
            email: item.email,
            image: item.secure_url,
            username: item.username,
            isVerified: item.isVerified === 1 ? true : false,
            verifiedAt: item.verifiedAt,
            city: item.city,
            province: item.province,
            birthday: item.birthday,
            phoneNumber: item.phoneNumber,
            lastLogin: item.lastLogin,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }))

          const totalPage = Math.ceil(userRows / size)

          const meta = {
            page: Number(page),
            size: Number(size),
            totalData: data.length,
            totalPage,
          }

          return {
            code: OK,
            message: 'Get users success',
            data: { data: data, meta },
          }
        })
        .catch(() => {
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error!',
          }
        })
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
      }
    })
}

export const findUsersName = async () => {
  return await db
    .query('SELECT userId, name, username FROM tb_users')
    .then(result => {
      const row = result[0]

      return {
        code: OK,
        message: 'Get users name success',
        data: row,
      }
    })
    .catch(() => {
      return { code: INTERNAL_SERVER_ERROR, message: 'Internal server error!' }
    })
}

export const findUsersById = async (userId = '') => {
  return await db
    .query(
      'SELECT tb_users.*, tb_image.secure_url FROM tb_users INNER JOIN tb_image ON tb_users.imageId=tb_image.imageId WHERE userId=?',
      [userId]
    )
    .then(result => {
      const rows = result[0]
      if (rows.length) {
        const {
          userId,
          name,
          email,
          username,
          isVerified,
          verifiedAt,
          city,
          province,
          birthday,
          phoneNumber,
          secure_url,
          lastLogin,
          createdAt,
          updatedAt,
        } = rows[0]
        return {
          code: OK,
          message: 'Get Users Success',
          data: {
            userId,
            name,
            email,
            username,
            isVerified: isVerified === 1 ? true : false,
            verifiedAt,
            city,
            province,
            birthday,
            phoneNumber,
            image: secure_url,
            lastLogin,
            createdAt,
            updatedAt,
          },
        }
      } else {
        return {
          code: NOT_FOUND,
          message: 'Users not found',
          error: true,
        }
      }
    })
    .catch(() => {
      return { code: INTERNAL_SERVER_ERROR, message: 'Internal server error!' }
    })
}
