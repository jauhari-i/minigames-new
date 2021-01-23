import Admin from '../../../models/Admin'

const ProfileAdmin = async id => {
  try {
    const admin = await Admin.findOne({ adminId: id })
    if (!admin) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Profile admin not found',
      }
    } else {
      const data = {
        adminId: admin.adminId,
        adminName: admin.adminName,
        adminEmail: admin.adminEmail,
        adminImage: admin.adminImage,
        createdAt: admin.createdAt,
      }
      return {
        success: true,
        statusCode: 200,
        message: 'Get profile success',
        data,
      }
    }
  } catch (error) {
    return error
  }
}

export default ProfileAdmin
