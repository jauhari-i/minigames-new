import User from '../../../models/Users'
import { DeleteImage, Uploader } from '../../../middlewares/UploadImage'
import { isValidURL } from '../../../helpers/validateUrl'

const UpdateProfile = async (id, data) => {
  const { name, userImage, city, province, birthday, phoneNumber } = data

  try {
    const user = await User.findOne({ userId: id })
    if (!user) {
      throw {
        success: false,
        statusCode: 404,
        message: 'User not found',
      }
    } else {
      let img

      if (isValidURL(userImage)) {
        img = user.userImage
      } else {
        const deleteImage = await DeleteImage(user.userImage.public_id)
        if (deleteImage.result) {
          img = await Uploader(userImage)
        } else {
          img = user.userImage
        }
      }
      const updateQuery = await User.updateOne(
        { userId: user.userId },
        {
          name,
          userImage: img,
          city,
          province,
          birthday,
          phoneNumber,
        }
      )
      if (updateQuery) {
        return {
          success: true,
          statusCode: 200,
          message: 'Update user success',
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, failed to update user',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default UpdateProfile
