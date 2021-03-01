import Admin from '../../../models/Admin'
import { DeleteImage } from '../../../middlewares/UploadImage'

const DeleteAdmin = async id => {
  try {
    const admin = await Admin.findOne({ adminId: id })
    if (!admin) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Admin not found',
      }
    } else {
      const deleteImg = await DeleteImage(admin.adminImage.public_id)
      const deleteQuery = await Admin.deleteOne({ adminId: admin.adminId })
      if (deleteQuery && deleteImg.result) {
        return {
          success: true,
          statusCode: 200,
          message: 'Delete Admin Success!',
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, failed to delete admin',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default DeleteAdmin
