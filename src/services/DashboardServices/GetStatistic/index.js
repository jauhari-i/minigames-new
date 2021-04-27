import Game from '../../../models/Game'
import Transaction from '../../../models/Transaction'
import User from '../../../models/Users'
import Admin from '../../../models/Admin'
import { status } from '../../../constants/transactionStatus'
import CodeServices from '../../CodeServices'

const GetStatistic = async (adminId, roles) => {
  const adminCount = await Admin.countDocuments()
  const codes = await CodeServices.ListCodes()
  const codeCount = codes.data.length
  const transactionCount = await Transaction.countDocuments()
  const accTransCount = await Transaction.countDocuments({
    transactionStatus: status.success,
  })
  const rejTransCount = await Transaction.countDocuments({
    transactionStatus: status.rejected,
  })
  const pendTransCount = await Transaction.countDocuments({
    transactionStatus: status.pending,
  })
  const noUploadTransCount = await Transaction.countDocuments({
    transactionStatus: status.notUploaded,
    isExpired: false,
  })
  const expiredTransCount = await Transaction.countDocuments({
    transactionStatus: status.expired,
    isExpired: true,
  })
  const userCount = await User.countDocuments()
  const gameCount = await Game.countDocuments()

  return {
    success: true,
    message: 'Get statistic success',
    statusCode: 200,
    data: {
      adminCount: roles !== 2 ? null : adminCount,
      userCount,
      gameCount,
      expiredTransCount,
      noUploadTransCount,
      pendTransCount,
      rejTransCount,
      accTransCount,
      transactionCount,
      codeCount,
    },
  }
}

export default GetStatistic
