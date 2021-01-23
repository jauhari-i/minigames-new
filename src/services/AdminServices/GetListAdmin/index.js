import Admin from '../../../models/Admin'

const ListAdmin = async () => {
  try {
    const list = await Admin.find({ level: 0 })
    if (list.length === 0) {
      return {
        success: true,
        statusCode: 200,
        message: 'Get admin success',
        data: list,
      }
    } else {
      const dataAdmin = list.map(item => ({
        adminId: item.adminId,
        adminName: item.adminName,
        adminEmail: item.adminEmail,
        adminImage: item.adminImage,
        createdAt: item.createdAt,
      }))
      return {
        success: true,
        statusCode: 200,
        message: 'Get admin success',
        data: dataAdmin,
      }
    }
  } catch (error) {
    return error
  }
}

export default ListAdmin
