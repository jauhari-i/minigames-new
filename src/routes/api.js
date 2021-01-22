import { Router } from 'express'
import controllers from '../controllers'
import { app as basicAuth } from '../auth/basic_auth_instance'
import { registerCheck, loginCheck } from '../helpers/validators'

const router = Router()

const {
  AuthController: {
    registerUser,
    loginUser,
    verifyUser,
    requestEmailVerification,
  },
} = controllers

// =============================
// authentication
// =============================

router.post('/user/register', [basicAuth, registerCheck], registerUser)
router.post('/user/login', [basicAuth, loginCheck], loginUser)
router.get('/user/verify/:token', basicAuth, verifyUser)
router.get('/user/request/:token', basicAuth, requestEmailVerification)

export { router }
