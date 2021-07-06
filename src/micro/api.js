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
import {
  addGame,
  listGameAdmin,
  detailGameAdmin,
  updateGameAdmin,
  deleteGameAdmin,
  updateGameStatus,
} from './game/game_handler'
import { detailUser, listNames, listUsers } from './user/user_handler'
import { addToCart, getUserCart, removeFromCart } from './cart/cart_handler'
import {
  acceptTransaction,
  checkoutTransaction,
  deleteTransaction,
  detailTransactionAdmin,
  detailTransactionUser,
  listTransactionAdmin,
  listTransactionUsers,
  rejectTransaction,
  uploadTransImage,
} from './transaction/transaction_handler'
import { getListCodes } from './code/code_handler'
import { joinGame, saveGame } from './gameplay/gameplay_handler'

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

router.get('/users/list', verifyTokenAdmin, listUsers)
router.get('/users/list-name', verifyToken, listNames)

router.get('/users/detail/:userId', verifyTokenAdmin, detailUser)

router.get('/verify/:token', basicAuth, verifyUser)
router.get('/request/email/:token', basicAuth, requestVerification)

router.post('/game/add', verifyTokenAdmin, addGame)
router.get('/game/list/admin', verifyTokenAdmin, listGameAdmin)
router.get('/game/detail/:gameId', verifyTokenAdmin, detailGameAdmin)
router.put('/game/update/:gameId', verifyTokenAdmin, updateGameAdmin)
router.put(
  '/game/status/:gameId/active/:status',
  verifyTokenAdmin,
  updateGameStatus
)
router.delete('/game/delete/:gameId', verifyTokenAdmin, deleteGameAdmin)

router.post('/cart/add/item', verifyToken, addToCart)
router.delete('/cart/remove/item/:itemId', verifyToken, removeFromCart)
router.get('/cart/user', verifyToken, getUserCart)

router.get('/transaction/checkout', verifyToken, checkoutTransaction)
router.get('/transaction/list/admin', verifyTokenAdmin, listTransactionAdmin)
router.get('/transaction/list/users', verifyToken, listTransactionUsers)
router.get(
  '/transaction/detail/:transactionId',
  verifyTokenAdmin,
  detailTransactionAdmin
)
router.get(
  '/transaction/users/detail/:transactionId',
  verifyToken,
  detailTransactionUser
)
router.put('/transaction/upload/:transactionId', verifyToken, uploadTransImage)
router.put(
  '/transaction/accept/:transactionId',
  verifyTokenAdmin,
  acceptTransaction
)
router.put(
  '/transaction/reject/:transactionId',
  verifyTokenAdmin,
  rejectTransaction
)
router.delete(
  '/transaction/delete/:transactionId',
  verifyTokenAdmin,
  deleteTransaction
)

router.get('/codes/list', verifyTokenAdmin, getListCodes)

router.post('/gameplay/join', verifyToken, joinGame)
router.post('/gameplay/save', verifyToken, saveGame)

export { router }
