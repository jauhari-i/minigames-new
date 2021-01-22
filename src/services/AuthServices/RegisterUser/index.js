import Users from '../../../models/Users'
import bcryptjs from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import jsonwebtoken from 'jsonwebtoken'
import { sendVerificationEmail } from '../../../middlewares/SendEmail'

const RegisterUser = async data => {
  const { name, email, username, password } = data
  try {
    const encryptedPassword = await bcryptjs.hash(password, 10)
    if (!encryptedPassword) {
      throw {
        success: false,
        statusCode: 500,
        message: 'Internal server error, Failed to secure password',
      }
    } else {
      const newUser = await Users.create({
        userId: uuid(),
        name,
        email,
        username,
        password: encryptedPassword,
      })
      if (!newUser) {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error, Failed to register user',
        }
      } else {
        const verificationToken = await jsonwebtoken.sign(
          { sub: newUser.userId },
          'minigames-verification',
          { expiresIn: '30m' }
        )

        const sendEmail = await sendVerificationEmail(
          newUser.email,
          verificationToken
        )

        if (sendEmail) {
          return {
            success: true,
            statusCode: 201,
            message: 'Success registering user',
            data: {
              userId: newUser.userId,
            },
          }
        } else {
          const deleteNewUser = await Users.deleteOne({
            userId: newUser.userId,
          })
          if (deleteNewUser) {
            throw {
              success: false,
              statusCode: 500,
              message: 'Cant send verification email, please try again latter',
            }
          } else {
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to register user',
            }
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default RegisterUser
