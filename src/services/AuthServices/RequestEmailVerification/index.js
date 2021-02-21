import Users from '../../../models/Users'
import jsonwebtoken from 'jsonwebtoken'
import { sendVerificationEmail } from '../../../middlewares/SendEmail'

const RequestEmailValidation = async token => {
  try {
    const decoded = await jsonwebtoken.decode(token, 'minigames-verification')

    if (!decoded) {
      throw {
        success: false,
        statusCode: 400,
        message: 'Token is invalid',
      }
    } else {
      const { sub } = decoded
      const user = await Users.findOne({ userId: sub })
      if (!user) {
        throw {
          success: false,
          statusCode: 404,
          message: 'User not found',
        }
      } else {
        const newToken = await jsonwebtoken.sign(
          { sub: user.userId },
          'minigames-verification',
          { expiresIn: '30m' }
        )
        if (user.isVerified) {
          return {
            success: true,
            statusCode: 200,
            message: 'User already verified',
          }
        } else {
          const sendEmail = await sendVerificationEmail(user.email, newToken)
          if (sendEmail) {
            return {
              success: true,
              statusCode: 200,
              message: 'Email verification has been send',
            }
          } else {
            throw {
              success: false,
              statusCode: 400,
              message: 'Failed to send verification email. please try again',
            }
          }
        }
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      return {
        success: false,
        statusCode: 500,
        message: error.message,
      }
    }
    return error
  }
}

export default RequestEmailValidation
