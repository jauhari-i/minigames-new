import Admin from '../../../models/Admin'

const DeleteAdmin = async id => {
  try {
    const deleteQuery = await Admin.deleteOne({ adminId: id })
    if (deleteQuery) {
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
  } catch (error) {
    return error
  }
}

export default DeleteAdmin
