import User from '../../../models/Users'
import { calculateLimitAndOffset, paginate } from 'paginate-info'

const ListUser = async (currentPage, pageSize) => {
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

      const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize)
      const count = dataUser.length
      const paginatedData = dataUser.slice(offset, offset + limit)
      const paginationInfo = paginate(currentPage, count, paginatedData)

      return {
        success: true,
        statusCode: 200,
        message: 'Get user success',
        data: { data: paginatedData, meta: paginationInfo },
      }
    }
  } catch (error) {
    return error
  }
}

export default ListUser
