import User from '../../../models/Users'

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
      const deleteQuery = await User.deleteOne({ userId: user.userId })
      if (!deleteQuery) {
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
