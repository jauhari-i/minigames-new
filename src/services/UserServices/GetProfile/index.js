import User from '../../../models/Users'

const ProfileUser = async id => {
  try {
    const user = await User.findOne({ userId: id })
    if (!user) {
      throw {
        success: false,
        statusCode: 404,
        message: 'User not found!',
      }
    } else {
      const profile = {
        userId: user.userId,
        name: user.name,
        username: user.username,
        email: user.email,
        userImage: user.userImage.secure_url,
        isVerified: user.isVerified,
        city: user.city,
        province: user.province,
        birthday: user.birthday,
        online: user.online,
        phoneNumber: user.phoneNumber,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      }
      return {
        success: true,
        statusCode: 200,
        message: 'Get profile success',
        data: profile,
      }
    }
  } catch (error) {
    return error
  }
}

export default ProfileUser
