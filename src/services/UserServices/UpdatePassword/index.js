import User from '../../../models/Users'
import bcryptjs from 'bcryptjs'

const UpdatePassword = async (id, data) => {
  const { oldPassword, newPassword } = data
  try {
    const user = await User.findOne({ userId: id })
    if (!user) {
      throw {
        success: false,
        statusCode: 404,
        message: 'User not found',
      }
    } else {
      const isMatch = await bcryptjs.compareSync(oldPassword, user.password)
      if (!isMatch) {
        throw {
          success: false,
          statusCode: 400,
          message: 'Old password not match',
        }
      } else {
        if (oldPassword === newPassword) {
          throw {
            success: false,
            statusCode: 400,
            message: 'New password cannot be the old password',
          }
        } else {
          const encryptedPassword = await bcryptjs.hashSync(newPassword, 10)
          if (!encryptedPassword) {
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error failed to secure password',
            }
          } else {
            const updateQuery = await User.updateOne(
              { userId: user.userId },
              { password: encryptedPassword }
            )
            if (!updateQuery) {
              throw {
                success: false,
                statusCode: 500,
                message: 'Internal server error failed to update user password',
              }
            } else {
              return {
                success: true,
                statusCode: 200,
                message: 'Update password success',
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
