import Admin from '../../../models/Admin'

const UpdateAdmin = async (id, data) => {
  const { name, image } = data
  try {
    const admin = await Admin.findOne({ adminId: id })
    if (!admin) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Id admin not found',
      }
    } else {
      const updateQuery = await Admin.updateOne(
        { adminId: admin.adminId },
        {
          adminName: name,
          adminImage: image,
        }
      )
      if (updateQuery) {
        return {
          success: true,
          statusCode: 200,
          message: 'Update profile success',
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, failed to update admin',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default UpdateAdmin
