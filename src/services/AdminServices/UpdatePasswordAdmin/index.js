import Admin from '../../../models/Admin'
import bcryptjs from 'bcryptjs'

const UpdatePassword = async (id, data) => {
  const { oldPassword, password } = data
  try {
    const admin = await Admin.findOne({ adminId: id })
    if (!admin) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Admin not found',
      }
    } else {
      const isMatch = await bcryptjs.compareSync(
        oldPassword,
        admin.adminPassword
      )
      if (!isMatch) {
        throw {
          success: false,
          statusCode: 400,
          message: 'Old password not match',
        }
      } else {
        if (oldPassword === password) {
          throw {
            success: false,
            statusCode: 400,
            message: 'New password cannot be same with old password',
          }
        } else {
          const encryptedPassword = await bcryptjs.hashSync(password, 10)
          if (!encryptedPassword) {
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to secure password',
            }
          } else {
            const updateQuery = await Admin.updateOne(
              { adminId: admin.adminId },
              { adminPassword: encryptedPassword }
            )
            if (!updateQuery) {
              throw {
                success: false,
                statusCode: 500,
                message: 'Internal server error, failed to update password',
              }
            } else {
              return {
                success: true,
                statusCode: 200,
                message: 'Password updated successful',
              }
            }
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default UpdatePassword
