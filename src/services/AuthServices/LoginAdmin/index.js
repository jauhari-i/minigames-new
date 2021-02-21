import Admin from '../../../models/Admin'
import bcryptjs from 'bcryptjs'
import { generateToken } from '../../../auth/jwt_auth_instance'

const LoginAdmin = async data => {
  const { email, password } = data
  try {
    const admin = await Admin.findOne({ adminEmail: email })
    if (!admin) {
      throw {
        success: false,
        statusCode: 404,
        message: 'User not found or not verified yet',
      }
    } else {
      const passwordIsMatch = await bcryptjs.compare(
        password,
        admin.adminPassword
      )
      if (passwordIsMatch) {
        const payload = {
          sub: admin.adminId,
          email: admin.adminEmail,
          role: admin.level + 1,
        }

        const token = await generateToken(payload)

        if (token) {
          const updateLastLogin = await Admin.findOneAndUpdate(
            { adminId: admin.adminId },
            {
              lastLogin: Date.now(),
            }
          )
          if (!updateLastLogin)
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal Server Error, Failed to login',
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

export default LoginAdmin
