import User from '../../../models/Users'

const ListWeb = async () => {
  try {
    const user = await User.find({ isVerified: true })
    if (user.length === 0) {
      return {
        success: true,
        statusCode: 200,
        message: 'Get user web success',
        data: user,
      }
    } else {
      const dataUser = user.map(item => ({
        userId: item.userId,
        name: item.name,
        username: item.username,
        userImage: item.userImage.secure_url,
      }))
      return {
        success: true,
        statusCode: 200,
        message: 'Get user web success',
        data: dataUser,
      }
    }
  } catch (error) {
    return error
  }
}

export default ListWeb
