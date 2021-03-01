import Transaction from '../../../models/Transaction'
import { DeleteImage } from '../../../middlewares/UploadImage'

const DeleteTransaction = async transactionId => {
  try {
    const tr = await Transaction.findOne({ transactionId })
    if (!tr) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Transaction not found',
      }
    } else {
      const deleteQuery = await Transaction.deleteOne({
        transactionId: tr.transactionId,
      })
      const deleteImage = await DeleteImage(tr.transactionImage.public_id)
      if (deleteQuery && deleteImage.result) {
        return {
          success: true,
          statusCode: 200,
          message: 'Delete Transaction success',
        }
      } else {
        return {
          success: false,
          statusCode: 500,
          message: 'Internal server error',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default DeleteTransaction
