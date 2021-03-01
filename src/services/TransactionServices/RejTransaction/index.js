import Transaction from '../../../models/Transaction'
import { status } from '../../../constants/transactionStatus'

const RejectTransaction = async (data, adminId) => {
  const { transactionId, reason } = data

  try {
    const tr = await Transaction.findOne({ transactionId })
    if (!tr) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Transaction not found',
      }
    } else {
      if (!tr.transactionImage) {
        throw {
          success: false,
          statusCode: 400,
          message: 'Transaction Payment not uploaded',
        }
      } else {
        if (tr.transactionStatus === status.success) {
          throw {
            success: true,
            statusCode: 200,
            message: 'Transaction already accepted',
          }
        } else {
          const updateTransaction = await Transaction.updateOne(
            { transactionId },
            {
              transactionStatus: status.rejected,
              isRejected: true,
              rejectedReason: reason,
              adminId,
            }
          )
          if (updateTransaction) {
            return {
              statusCode: 200,
              success: true,
              message: 'Transaction rejected',
            }
          } else {
            throw {
              statusCode: 500,
              message: 'Internal server error',
              success: false,
            }
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default RejectTransaction
