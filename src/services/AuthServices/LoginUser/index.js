import Users from '../../../models/Users'
import bcryptjs from 'bcryptjs'
import { generateToken } from '../../../auth/jwt_auth_instance'

const LoginUser = async data => {
  const { email, password } = data
  try {
    const user = await Users.findOne({ email: email, isVerified: true })
    if (!user) {
      throw {
        success: false,
        statusCode: 404,
        message: 'User not found or not verified yet',
      }
    } else {
      const passwordIsMatch = await bcryptjs.compare(password, user.password)
      if (passwordIsMatch) {
        const payload = {
          sub: user.userId,
          email: user.email,
        }

        const token = await generateToken(payload)

        if (token) {
          const updateLastLogin = await Users.findOneAndUpdate(
            { userId: user.userId },
            {
              lastLogin: Date.now(),
            }
          )
          if (!updateLastLogin)
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal Server Error, Failed to login users',
            }
          return {
            success: true,
            statusCode: 200,
            message: 'Login Success!',
            data: {
              accessToken: token,
            },
          }
        } else {
          throw {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error, Failed to generate token',
          }
        }
      } else {
        throw {
          success: false,
          statusCode: 400,
          message: 'Password is not match',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default LoginUser
