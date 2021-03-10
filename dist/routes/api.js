"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _controllers = _interopRequireDefault(require("../controllers"));

var _basic_auth_instance = require("../auth/basic_auth_instance");

var _jwt_auth_instance = require("../auth/jwt_auth_instance");

var _validators = require("../helpers/validators");

var router = (0, _express.Router)();
exports.router = router;
var _controllers$AuthCont = _controllers["default"].AuthController,
    registerUser = _controllers$AuthCont.registerUser,
    loginUser = _controllers$AuthCont.loginUser,
    verifyUser = _controllers$AuthCont.verifyUser,
    requestEmailVerification = _controllers$AuthCont.requestEmailVerification,
    loginAdmin = _controllers$AuthCont.loginAdmin,
    _controllers$UserCont = _controllers["default"].UserController,
    deleteUser = _controllers$UserCont.deleteUser,
    getProfileUser = _controllers$UserCont.getProfileUser,
    listUserAdmin = _controllers$UserCont.listUserAdmin,
    listUserWeb = _controllers$UserCont.listUserWeb,
    updatePassword = _controllers$UserCont.updatePassword,
    updateProfile = _controllers$UserCont.updateProfile,
    _controllers$AdminCon = _controllers["default"].AdminController,
    addAdminHandler = _controllers$AdminCon.addAdminHandler,
    deleteAdminHandler = _controllers$AdminCon.deleteAdminHandler,
    detailAdminHandler = _controllers$AdminCon.detailAdminHandler,
    listAdminHandler = _controllers$AdminCon.listAdminHandler,
    profileAdminHandler = _controllers$AdminCon.profileAdminHandler,
    updateAdminHandler = _controllers$AdminCon.updateAdminHandler,
    updatePasswordHandler = _controllers$AdminCon.updatePasswordHandler,
    updateProfileHandler = _controllers$AdminCon.updateProfileHandler,
    _controllers$GameCont = _controllers["default"].GameController,
    addGameHandler = _controllers$GameCont.addGameHandler,
    activateGameHandler = _controllers$GameCont.activateGameHandler,
    deleteGameHandler = _controllers$GameCont.deleteGameHandler,
    detailGameHandler = _controllers$GameCont.detailGameHandler,
    disableGameHandler = _controllers$GameCont.disableGameHandler,
    listGameAdminHandler = _controllers$GameCont.listGameAdminHandler,
    updateGameHandler = _controllers$GameCont.updateGameHandler,
    detailGameWebHandler = _controllers$GameCont.detailGameWebHandler,
    listGameUserHandler = _controllers$GameCont.listGameUserHandler,
    listGameWebHandler = _controllers$GameCont.listGameWebHandler,
    _controllers$CartCont = _controllers["default"].CartController,
    addToCartHandler = _controllers$CartCont.addToCartHandler,
    getCartHandler = _controllers$CartCont.getCartHandler,
    removeFromCartHandler = _controllers$CartCont.removeFromCartHandler,
    _controllers$Transact = _controllers["default"].TransactionController,
    accTransactionHandler = _controllers$Transact.accTransactionHandler,
    checkoutTransctionHandler = _controllers$Transact.checkoutTransctionHandler,
    deleteTransactionHandler = _controllers$Transact.deleteTransactionHandler,
    detailTransactionHandler = _controllers$Transact.detailTransactionHandler,
    listTransactionAdminHandler = _controllers$Transact.listTransactionAdminHandler,
    listTransactionUserHandler = _controllers$Transact.listTransactionUserHandler,
    rejectTransactionHandler = _controllers$Transact.rejectTransactionHandler,
    uploadPaymentHandler = _controllers$Transact.uploadPaymentHandler,
    _controllers$CodeCont = _controllers["default"].CodeController,
    generateCodeHandler = _controllers$CodeCont.generateCodeHandler,
    listCodeHandler = _controllers$CodeCont.listCodeHandler,
    getStatisticHandler = _controllers["default"].DashboardController.getStatisticHandler,
    _controllers$Leaderbo = _controllers["default"].LeaderboardController,
    deleteLeaderboardHandler = _controllers$Leaderbo.deleteLeaderboardHandler,
    getLeaderboardAdminHandler = _controllers$Leaderbo.getLeaderboardAdminHandler,
    getLeaderboardUserHandler = _controllers$Leaderbo.getLeaderboardUserHandler,
    saveGameHandler = _controllers$Leaderbo.saveGameHandler,
    joinGameHandler = _controllers$Leaderbo.joinGameHandler; // =============================
// authentication
// =============================

router.post('/user/register', [_basic_auth_instance.app, _validators.registerCheck], registerUser);
router.post('/user/login', [_basic_auth_instance.app, _validators.loginCheck], loginUser);
router.get('/user/verify/:token', _basic_auth_instance.app, verifyUser);
router.get('/user/request/:token', _basic_auth_instance.app, requestEmailVerification);
router.post('/admin/login', [_basic_auth_instance.app, _validators.loginCheck], loginAdmin); // =============================
// user
// =============================

router.put('/user/update-profile', [_jwt_auth_instance.verifyToken, _validators.updateUser], updateProfile);
router.put('/user/update-password', [_jwt_auth_instance.verifyToken, _validators.changePassword], updatePassword);
router.get('/user/profile', _jwt_auth_instance.verifyToken, getProfileUser);
router.get('/user/list-web', _jwt_auth_instance.verifyToken, listUserWeb);
router.get('/user/list-admin', _jwt_auth_instance.verifyTokenAdmin, listUserAdmin);
router["delete"]('/user/delete/:id', _jwt_auth_instance.verifyTokenAdmin, deleteUser); // =============================
// game
// =============================

router.post('/game/create', [_jwt_auth_instance.verifyTokenAdmin, _validators.addGame], addGameHandler);
router.get('/game/list', _jwt_auth_instance.verifyTokenAdmin, listGameAdminHandler);
router.get('/game/detail/:gameId', _jwt_auth_instance.verifyTokenAdmin, detailGameHandler);
router.get('/game/mygame', _jwt_auth_instance.verifyToken, listGameUserHandler);
router.get('/game/web/list', _jwt_auth_instance.verifyToken, listGameWebHandler);
router.get('/game/web/detail/:gameId', _jwt_auth_instance.verifyToken, detailGameWebHandler);
router.put('/game/activate/:gameId', _jwt_auth_instance.verifyTokenAdmin, activateGameHandler);
router.put('/game/disable/:gameId', _jwt_auth_instance.verifyTokenAdmin, disableGameHandler);
router.put('/game/update/:gameId', [_jwt_auth_instance.verifyTokenAdmin, _validators.editGame], updateGameHandler);
router["delete"]('/game/delete/:gameId', _jwt_auth_instance.verifyTokenAdmin, deleteGameHandler); // =============================
// admin
// =============================

router.post('/admin/create', [_jwt_auth_instance.verifyTokenSuperAdmin, _validators.addAdmin], addAdminHandler);
router.get('/admin/list', _jwt_auth_instance.verifyTokenSuperAdmin, listAdminHandler);
router.get('/admin/detail/:adminId', _jwt_auth_instance.verifyTokenSuperAdmin, detailAdminHandler);
router.get('/admin/profile', _jwt_auth_instance.verifyTokenAdmin, profileAdminHandler);
router.put('/admin/update-profile', [_jwt_auth_instance.verifyTokenAdmin, _validators.updateAdmin], updateProfileHandler);
router.put('/admin/update-password', [_jwt_auth_instance.verifyTokenAdmin, _validators.changePassword], updatePasswordHandler);
router.put('/admin/update/:adminId', [_jwt_auth_instance.verifyTokenSuperAdmin, _validators.updateAdmin], updateAdminHandler);
router["delete"]('/admin/delete/:adminId', _jwt_auth_instance.verifyTokenSuperAdmin, deleteAdminHandler); // =============================
// cart
// =============================

router.post('/cart/add', [_jwt_auth_instance.verifyToken, _validators.addCart], addToCartHandler);
router.get('/cart/user', _jwt_auth_instance.verifyToken, getCartHandler);
router.put('/cart/remove/:itemId', _jwt_auth_instance.verifyToken, removeFromCartHandler); // =============================
// transaction
// =============================

router.post('/transaction/checkout', [_jwt_auth_instance.verifyToken, _validators.checkoutTr], checkoutTransctionHandler);
router.put('/transaction/upload/:transactionId', [_jwt_auth_instance.verifyToken, _validators.uploadPayment], uploadPaymentHandler);
router.put('/transaction/accept/:transactionId', _jwt_auth_instance.verifyTokenAdmin, accTransactionHandler);
router.put('/transaction/reject/:transactionId', [_jwt_auth_instance.verifyTokenAdmin, _validators.rejectTr], rejectTransactionHandler);
router.get('/transaction/list/admin', _jwt_auth_instance.verifyTokenAdmin, listTransactionAdminHandler);
router.get('/transaction/list/user', _jwt_auth_instance.verifyToken, listTransactionUserHandler);
router.get('/transaction/detail/:transactionId', _jwt_auth_instance.verifyTokenAdmin, detailTransactionHandler);
router["delete"]('/transaction/delete/:transactionId', _jwt_auth_instance.verifyTokenAdmin, deleteTransactionHandler); // =============================
// gameplay
// =============================

router.post('/gameplay/join', [_jwt_auth_instance.verifyToken, _validators.jGame], joinGameHandler);
router.post('/gameplay/save', [_jwt_auth_instance.verifyToken, _validators.sGame], saveGameHandler);
router.get('/gameplay/leaderboard/game/:gameId/sort/:sort', _jwt_auth_instance.verifyToken, getLeaderboardUserHandler);
router.get('/gameplay/leaderboard/list/sort/:sort', _jwt_auth_instance.verifyTokenAdmin, getLeaderboardAdminHandler);
router["delete"]('/gameplay/leaderboard/delete/:leaderboardId', _jwt_auth_instance.verifyTokenAdmin, deleteLeaderboardHandler); // =============================
// codes
// =============================

router.get('/code/list', _jwt_auth_instance.verifyTokenAdmin, listCodeHandler);
router.put('/code/generate/:codeId', [_jwt_auth_instance.verifyTokenAdmin, _validators.newCode], generateCodeHandler); // =============================
// dashboard
// =============================

router.get('/dashboard/admin', _jwt_auth_instance.verifyTokenAdmin, getStatisticHandler);