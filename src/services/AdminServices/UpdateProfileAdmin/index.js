import Admin from '../../../models/Admin'
import { DeleteImage, Uploader } from '../../../middlewares/UploadImage'
import { isValidURL } from '../../../helpers/validateUrl'

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
      let img
      if (isValidURL(image)) {
        img = admin.adminImage
      } else {
        const deleteImage = await DeleteImage(admin.adminImage.public_id)
        if (deleteImage.result) {
          img = await Uploader(image)
        } else {
          img = admin.adminImage
        }
      }
      const updateQuery = await Admin.updateOne(
        { adminId: admin.adminId },
        {
          adminName: name,
          adminImage: img,
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
