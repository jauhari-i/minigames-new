import User from '../../../models/Users'

const ListUser = async () => {
  try {
    const user = await User.find()
    if (user.length === 0) {
      return {
        success: true,
        statusCode: 200,
        message: 'Get user success',
        data: user,
      }
    } else {
      const dataUser = user.map(item => ({
        userId: item.userId,
        name: user.name,
        username: user.username,
        email: user.email,
        userImage: user.userImage,
        verified: user.isVerified,
        verifiedAt: user.verifiedAt,
        city: user.city,
        province: user.province,
        birthday: user.birthday,
        online: user.online,
        phoneNumber: user.phoneNumber,
      }))
      return {
        success: true,
        statusCode: 200,
        message: 'Get user success',
        data: dataUser,
      }
    }
  } catch (error) {
    return error
  }
}

export default ListUser
