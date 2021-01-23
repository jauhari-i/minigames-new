import User from '../../../models/Users'

const ListWeb = async () => {
  try {
    const user = await User.find()
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
        name: user.name,
        username: user.username,
        userImage: user.userImage,
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
