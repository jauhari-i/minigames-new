import Admin from '../../../models/Admin'
import bcryptjs from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { defaultImage } from '../../../constants/defaultImage'
import { Uploader } from '../../../middlewares/UploadImage'

const AddAdmin = async data => {
  const { name, email, password } = data

  try {
    const encryptedPassword = await bcryptjs.hash(password, 10)

    const img = await Uploader(defaultImage)

    if (!encryptedPassword) {
      throw {
        success: false,
        statusCode: 500,
        message: 'Internal server error, Failed to secure password',
      }
    } else {
      const newAdmin = await Admin.create({
        adminId: uuid(),
        adminName: name,
        adminEmail: email,
        adminImage: img,
        adminPassword: encryptedPassword,
      })
      if (newAdmin) {
        return {
          success: true,
          statusCode: 201,
          message: 'Register admin success!',
          data: {
            adminId: newAdmin.adminId,
            adminName: newAdmin.adminName,
            adminEmail: newAdmin.adminEmail,
            adminImage: newAdmin.adminImage.secure_url,
            createdAt: newAdmin.createdAt,
          },
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, Failed to register admin',
        }
      }
    }
  } catch (e) {
    return e
  }
}

export default AddAdmin
