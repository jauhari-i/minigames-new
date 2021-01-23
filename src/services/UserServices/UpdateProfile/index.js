import User from '../../../models/Users'

const UpdateProfile = async (id, data) => {
  const { name, userImage, city, province, birthday, phoneNumber } = data

  try {
    const user = await User.findOne({ userId: id })
    if (!user) {
      throw {
        success: false,
        statusCode: 404,
        message: 'User not found',
      }
    } else {
      const updateQuery = await User.updateOne(
        { userId: user.userId },
        {
          name,
          userImage,
          city,
          province,
          birthday,
          phoneNumber,
        }
      )
      if (updateQuery) {
        return {
          success: true,
          statusCode: 200,
          message: 'Update user success',
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, failed to update user',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default UpdateProfile
