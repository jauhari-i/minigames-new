import { controller as AuthController } from './AuthControllers/AuthController'
import { controller as UserController } from './UserControllers/UserController'
import { controller as GameController } from './GameControllers'
import { controller as AdminController } from './AdminControllers'

const controllers = {
  AuthController,
  UserController,
  GameController,
  AdminController,
}

export default controllers
