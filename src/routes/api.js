import { Router } from 'express'
import controllers from '../controllers'
import { app as basicAuth } from '../auth/basic_auth_instance'
import { v4 as uuid } from 'uuid'
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenSuperAdmin,
  generateToken,
} from '../auth/jwt_auth_instance'
import {
  registerCheck,
  loginCheck,
  changePassword,
  updateUser,
  addGame,
  addAdmin,
  updateAdmin,
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
  AdminController: {
    addAdminHandler,
    deleteAdminHandler,
    detailAdminHandler,
    listAdminHandler,
    profileAdminHandler,
    updateAdminHandler,
    updatePasswordHandler,
    updateProfileHandler,
  },
  GameController: { addGameHandler },
} = controllers

// Generate Token
router.get('/generate/token/:role', async (req, res) => {
  const payload = {
    sub: uuid(),
    role: Number(req.params.role),
    email: 'mail@mail.com',
  }
  const token = await generateToken(payload)
  res.status(200).json({
    success: true,
    data: {
      token,
    },
    role: req.params.role,
  })
})

// =============================
// authentication
// =============================

router.post('/user/register', [basicAuth, registerCheck], registerUser)
router.post('/user/login', [basicAuth, loginCheck], loginUser)
router.get('/user/verify/:token', basicAuth, verifyUser)
router.get('/user/request/:token', basicAuth, requestEmailVerification)
router.post('/admin/login', [basicAuth, loginCheck], loginAdmin)

// =============================
// user
// =============================

router.put('/user/update-profile', [verifyToken, updateUser], updateProfile)
router.put(
  '/user/update-password',
  [verifyToken, changePassword],
  updatePassword
)
router.get('/user/profile', verifyToken, getProfileUser)
router.get('/user/list-web', verifyToken, listUserWeb)
router.get('/user/list-admin', verifyTokenAdmin, listUserAdmin)
router.delete('/user/delete/:id', verifyTokenAdmin, deleteUser)

// =============================
// game
// =============================

router.post('/game/create', [verifyTokenAdmin, addGame], addGameHandler)

// =============================
// admin
// =============================

router.post('/admin/create', [verifyTokenSuperAdmin, addAdmin], addAdminHandler)
router.get('/admin/list', verifyTokenSuperAdmin, listAdminHandler)
router.get('/admin/detail/:adminId', verifyTokenSuperAdmin, detailAdminHandler)
router.get('/admin/profile', verifyTokenAdmin, profileAdminHandler)
router.put(
  '/admin/update-profile',
  [verifyTokenAdmin, updateAdmin],
  updateProfileHandler
)
router.put(
  '/admin/update-password',
  [verifyTokenAdmin, changePassword],
  updatePasswordHandler
)
router.put(
  '/admin/update/:adminId',
  [verifyTokenSuperAdmin, updateAdmin],
  updateAdminHandler
)
router.delete(
  '/admin/delete/:adminId',
  verifyTokenSuperAdmin,
  deleteAdminHandler
)

// =============================
// cart
// =============================

// =============================
// transaction
// =============================

// =============================
// gameplay
// =============================

// =============================
// codes
// =============================

// =============================
// dashboard
// =============================

export { router }
