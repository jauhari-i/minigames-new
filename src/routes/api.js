import { Router } from 'express'
import controllers from '../controllers'
import { app as basicAuth } from '../auth/basic_auth_instance'
import { verifyToken, verifyTokenAdmin } from '../auth/jwt_auth_instance'
import {
  registerCheck,
  loginCheck,
  changePassword,
  updateUser,
} from '../helpers/validators'

const router = Router()

const {
  AuthController: {
    registerUser,
    loginUser,
    verifyUser,
    requestEmailVerification,
    loginAdmin,
  },
  UserController: {
    deleteUser,
    getProfileUser,
    listUserAdmin,
    listUserWeb,
    updatePassword,
    updateProfile,
  },
} = controllers

// =============================
// authentication
// =============================

router.post('/user/register', [basicAuth, registerCheck], registerUser)
router.post('/user/login', [basicAuth, loginCheck], loginUser)
router.get('/user/verify/:token', basicAuth, verifyUser)
router.get('/user/request/:token', basicAuth, requestEmailVerification)
router.get('/admin/login', [basicAuth, loginCheck], loginAdmin)

// =============================
// user
// =============================

router.put('/user/update-profile', [verifyUser, updateUser], updateProfile)
router.put(
  '/user/update-password',
  [verifyUser, changePassword],
  updatePassword
)
router.get('/user/profile', verifyToken, getProfileUser)
router.get('/user/list-web', verifyToken, listUserWeb)
router.get('/user/list-admin', verifyTokenAdmin, listUserAdmin)
router.delete('/user/delete/:id', verifyTokenAdmin, deleteUser)

export { router }
