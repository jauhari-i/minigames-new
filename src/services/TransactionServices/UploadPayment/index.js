import Transaction from '../../../models/Transaction'
import { Uploader } from '../../../middlewares/UploadImage'
import { status } from '../../../constants/transactionStatus'
import jwt from 'jsonwebtoken'

const UploadPayment = async (data, transactionId) => {
  const { image } = data

  try {
    const transaction = await Transaction.findOne({
      transactionId: transactionId,
    })
    if (!transaction) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Transaction not found',
      }
    } else {
      let img

      const decoded = await jwt.decode(transaction.paymentToken)
      const isExpired = Date.now() > decoded.exp * 1000

      if (isExpired) {
        img = {}
      } else {
        img = await Uploader(image)
      }

      const updateTransaction = await Transaction.updateOne(
        { transactionId: transaction.transactionId },
        {
          transactionImage: img,
          transactionStatus: isExpired ? status.expired : status.pending,
          isExpired: isExpired,
        }
      )

      if (!updateTransaction) {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error',
        }
      } else {
        if (isExpired) {
          return {
            success: false,
            statusCode: 400,
            message: 'Transaction is expired',
          }
        } else {
          return {
            success: true,
            statusCode: 200,
            message: 'Transaction Image is uploaded',
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default UploadPayment
