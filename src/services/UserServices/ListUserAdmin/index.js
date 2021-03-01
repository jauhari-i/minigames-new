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
        name: item.name,
        username: item.username,
        email: item.email,
        userImage: item.userImage.secure_url,
        verified: item.isVerified,
        verifiedAt: item.verifiedAt,
        city: item.city,
        province: item.province,
        birthday: item.birthday,
        online: item.online,
        phoneNumber: item.phoneNumber,
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
