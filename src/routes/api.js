import { Router } from 'express'
import controllers from '../controllers'
import { app as basicAuth } from '../auth/basic_auth_instance'
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenSuperAdmin,
} from '../auth/jwt_auth_instance'
import {
  registerCheck,
  loginCheck,
  changePassword,
  updateUser,
  addGame,
  editGame,
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
  GameController: {
    addGameHandler,
    activateGameHandler,
    deleteGameHandler,
    detailGameHandler,
    disableGameHandler,
    listGameAdminHandler,
    updateGameHandler,
    detailGameWebHandler,
    listGameUserHandler,
    listGameWebHandler,
  },
} = controllers

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
router.get('/game/list', verifyTokenAdmin, listGameAdminHandler)
router.get('/game/detail/:gameId', verifyTokenAdmin, detailGameHandler)
router.get('/game/mygame', verifyToken, listGameUserHandler)
router.get('/game/web/list', verifyToken, listGameWebHandler)
router.get('/game/web/detail/:gameId', verifyToken, detailGameWebHandler)
router.put('/game/activate/:gameId', verifyTokenAdmin, activateGameHandler)
router.put('/game/disable/:gameId', verifyTokenAdmin, disableGameHandler)
router.put(
  '/game/update/:gameId',
  [verifyTokenAdmin, editGame],
  updateGameHandler
)
router.delete('/game/delete/:gameId', verifyTokenAdmin, deleteGameHandler)

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
