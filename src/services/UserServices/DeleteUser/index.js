import User from '../../../models/Users'
import { DeleteImage } from '../../../middlewares/UploadImage'

const DeleteUser = async id => {
  try {
    const user = await User.findOne({ userId: id })
    if (!user) {
      throw {
        success: false,
        statusCode: 404,
        message: 'User not found',
      }
    } else {
      const deleteImg = await DeleteImage(user.userImage.public_id)
      const deleteQuery = await User.deleteOne({ userId: user.userId })
      if (!deleteQuery || !deleteImg) {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, failed to delete user',
        }
      } else {
        return {
          success: true,
          statusCode: 200,
          message: 'Delete user success',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default DeleteUser
