import { controller as AuthController } from './AuthControllers/AuthController'
import { controller as UserController } from './UserControllers/UserController'
import { controller as GameController } from './GameControllers'
import { controller as AdminController } from './AdminControllers'
import { controller as CartController } from './CartControllers'
import { controller as TransactionController } from './TransactionControllers'

const controllers = {
  AuthController,
  UserController,
  GameController,
  AdminController,
  CartController,
  TransactionController,
}

export default controllers
