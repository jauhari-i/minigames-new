import Users from '../../../models/Users'
import jsonwebtoken from 'jsonwebtoken'

const VerifyUser = async token => {
  try {
    const decoded = await jsonwebtoken.verify(token, 'minigames-verification')
    if (!decoded) {
      throw {
        success: false,
        statusCode: 400,
        message: 'Verification Token is expired',
      }
    } else {
      const user = await Users.findOne({ userId: decoded.sub })
      if (user.isVerified) {
        return {
          success: true,
          statusCode: 200,
          message: 'User is already verified',
        }
      } else {
        const updateVerify = await Users.updateOne(
          {
            userId: user.userId,
          },
          {
            isVerified: true,
            verifiedAt: Date.now(),
          }
        )
        if (!updateVerify) {
          throw {
            success: false,
            statusCode: 500,
            message: 'Internal server error, failed to verify user',
          }
        } else {
          return {
            success: true,
            statusCode: 200,
            message: 'User is verified',
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default VerifyUser
