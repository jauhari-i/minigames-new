import { Router } from 'express'
import { app as basicAuth } from '../auth/basic_auth_instance'
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenSuperAdmin,
} from '../auth/jwt_auth_instance'
import {
  listAdmin,
  loginAdmin,
  registerAdmin,
  profileAdmin,
  editProfile,
  detailAdmin,
  deleteAdmin,
} from './admin/admin_handler'
import {
  loginUser,
  profileUser,
  registerUser,
  requestVerification,
  verifyUser,
} from './auth/auth_handler'

const router = Router()

router.post('/admin/login', basicAuth, loginAdmin)
router.post('/admin/register', verifyTokenSuperAdmin, registerAdmin)

router.get('/admin/list', verifyTokenSuperAdmin, listAdmin)
router.get('/admin/profile-admin', verifyTokenAdmin, profileAdmin)
router.get('/admin/detail/:adminId', verifyTokenSuperAdmin, detailAdmin)

router.put('/admin/update-profile', verifyTokenAdmin, editProfile)

router.delete('/admin/delete/:adminId', verifyTokenSuperAdmin, deleteAdmin)

router.post('/users/login', basicAuth, loginUser)
router.post('/users/register', basicAuth, registerUser)

router.get('/users/profile-user', verifyToken, profileUser)

router.get('/verify/:token', basicAuth, verifyUser)
router.get('/request/email/:token', basicAuth, requestVerification)

export { router }
