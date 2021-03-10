"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sGame = exports.jGame = exports.newCode = exports.uploadPayment = exports.rejectTr = exports.checkoutTr = exports.addCart = exports.editGame = exports.addGame = exports.addAdmin = exports.updateAdmin = exports.changePassword = exports.updateUser = exports.loginCheck = exports.registerCheck = void 0;

var _Users = _interopRequireDefault(require("../../models/Users"));

var _Admin = _interopRequireDefault(require("../../models/Admin"));

var _Game = _interopRequireDefault(require("../../models/Game"));

var _expressValidator = require("express-validator");

var registerCheck = [(0, _expressValidator.check)('name').not().isEmpty().withMessage('Name cannot be empty'), (0, _expressValidator.check)('email').custom(function (val) {
  if (!val) {
    return Promise.reject('Email cannot be empty');
  }

  return _Users["default"].findOne({
    email: val
  }).then(function (u) {
    if (u) {
      return Promise.reject('User with this email already exist');
    }
  });
}), (0, _expressValidator.check)('username').custom(function (val) {
  if (!val) {
    return Promise.reject('Username cannot be empty');
  }

  return _Users["default"].findOne({
    username: val
  }).then(function (u) {
    if (u) {
      return Promise.reject('Username already used');
    }
  });
}), (0, _expressValidator.check)('password').not().isEmpty().withMessage('Password cannot be empty'), (0, _expressValidator.check)('confirmPassword').not().isEmpty().withMessage('Please confirm your password!')];
exports.registerCheck = registerCheck;
var loginCheck = [(0, _expressValidator.check)('email').not().isEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Email is invalid'), (0, _expressValidator.check)('password').not().isEmpty().withMessage('Password cannot be empty')];
exports.loginCheck = loginCheck;
var updateUser = [(0, _expressValidator.check)('name').not().isEmpty().withMessage('Name cannot be empty'), (0, _expressValidator.check)('userImage').not().isEmpty().withMessage('User image cannot be empty'), (0, _expressValidator.check)('city').not().isEmpty().withMessage('City cannot be empty'), (0, _expressValidator.check)('province').not().isEmpty().withMessage('Province cannot be empty'), (0, _expressValidator.check)('birthday').not().isEmpty().withMessage('Birthday cannot be empty'), (0, _expressValidator.check)('phoneNumber').not().isEmpty().withMessage('Phone number cannot be empty')];
exports.updateUser = updateUser;
var changePassword = [(0, _expressValidator.check)('oldPassword').not().isEmpty().withMessage('Old password cannot be empty'), (0, _expressValidator.check)('newPassword').not().isEmpty().withMessage('New password cannot be empty'), (0, _expressValidator.check)('confirmPassword').not().isEmpty().withMessage('Password confirmation cannot be empty')];
exports.changePassword = changePassword;
var updateAdmin = [(0, _expressValidator.check)('name').not().isEmpty().withMessage('Name cannot be empty'), (0, _expressValidator.check)('image').not().isEmpty().withMessage('Image cannot be empty')];
exports.updateAdmin = updateAdmin;
var addAdmin = [(0, _expressValidator.check)('name').not().isEmpty().withMessage('Name cannot be empty'), (0, _expressValidator.check)('email').custom(function (val) {
  if (!val) {
    return Promise.reject('Email cannot be empty');
  }

  return _Admin["default"].findOne({
    adminEmail: val
  }).then(function (u) {
    if (u) {
      return Promise.reject('Email already used');
    }
  });
}), (0, _expressValidator.check)('password').not().isEmpty().withMessage('Password cannot be empty'), (0, _expressValidator.check)('confirmPassword').not().isEmpty().withMessage('Please confirm your password!')];
exports.addAdmin = addAdmin;
var addGame = [(0, _expressValidator.check)('title').not().isEmpty().withMessage('Title cannot be empty'), (0, _expressValidator.check)('price').not().isEmpty().withMessage('Price cannot be empty'), (0, _expressValidator.check)('poster').not().isEmpty().withMessage('Poster cannot be empty'), (0, _expressValidator.check)('image').not().isEmpty().withMessage('Image cannot be empty'), (0, _expressValidator.check)('rating').not().isEmpty().withMessage('Rating cannot be empty'), (0, _expressValidator.check)('discount').not().isEmpty().withMessage('Discount cannot be empty'), (0, _expressValidator.check)('difficulty').not().isEmpty().withMessage('Difficulty cannot be empty'), (0, _expressValidator.check)('capacity').not().isEmpty().withMessage('Capacity cannot be empty'), (0, _expressValidator.check)('duration').not().isEmpty().withMessage('Duration cannot be empty'), (0, _expressValidator.check)('ready').not().isEmpty().withMessage('Game status cannot be empty'), (0, _expressValidator.check)('url').custom(function (val) {
  if (!val) {
    return Promise.reject('Url cannot be empty');
  }

  return _Game["default"].findOne({
    gameUrl: val
  }).then(function (u) {
    if (u) {
      return Promise.reject('Url already used');
    }
  });
})];
exports.addGame = addGame;
var editGame = [(0, _expressValidator.check)('title').not().isEmpty().withMessage('Title cannot be empty'), (0, _expressValidator.check)('price').not().isEmpty().withMessage('Price cannot be empty'), (0, _expressValidator.check)('poster').not().isEmpty().withMessage('Poster cannot be empty'), (0, _expressValidator.check)('image').not().isEmpty().withMessage('Image cannot be empty'), (0, _expressValidator.check)('rating').not().isEmpty().withMessage('Rating cannot be empty'), (0, _expressValidator.check)('discount').not().isEmpty().withMessage('Discount cannot be empty'), (0, _expressValidator.check)('difficulty').not().isEmpty().withMessage('Difficulty cannot be empty'), (0, _expressValidator.check)('capacity').not().isEmpty().withMessage('Capacity cannot be empty'), (0, _expressValidator.check)('duration').not().isEmpty().withMessage('Duration cannot be empty'), (0, _expressValidator.check)('ready').not().isEmpty().withMessage('Game status cannot be empty'), (0, _expressValidator.check)('url').not().isEmpty().withMessage('Url cannot be empty')]; // const { gameId, playDate, members, time } = data

exports.editGame = editGame;
var addCart = [(0, _expressValidator.check)('gameId').not().isEmpty().withMessage('Game id cannot be empty'), (0, _expressValidator.check)('playDate').not().isEmpty().withMessage('Playing Date cannot be empty'), (0, _expressValidator.check)('members').not().isEmpty().withMessage('Members cannot be empty'), (0, _expressValidator.check)('time').not().isEmpty().withMessage('Time Cannot be empty')];
exports.addCart = addCart;
var checkoutTr = [(0, _expressValidator.check)('cartId').not().isEmpty().withMessage('Cart id cannot be empty')];
exports.checkoutTr = checkoutTr;
var rejectTr = [(0, _expressValidator.check)('reason').not().isEmpty().withMessage('Reason cannot be empty')];
exports.rejectTr = rejectTr;
var uploadPayment = [(0, _expressValidator.check)('image').not().isEmpty().withMessage('Image cannot be empty')];
exports.uploadPayment = uploadPayment;
var newCode = [(0, _expressValidator.check)('playDate').not().isEmpty().withMessage('Playing Date cannot be empty'), (0, _expressValidator.check)('time').not().isEmpty().withMessage('Time cannot be epty')];
exports.newCode = newCode;
var jGame = [(0, _expressValidator.check)('code').not().isEmpty().withMessage('Code is required')];
exports.jGame = jGame;
var sGame = [(0, _expressValidator.check)('codeId').not().isEmpty().withMessage('Code id is required'), (0, _expressValidator.check)('time').not().isEmpty().withMessage('Time is required'), (0, _expressValidator.check)('teamName').not().isEmpty().withMessage('Team Name is required'), (0, _expressValidator.check)('teamIcon').not().isEmpty().withMessage('Team icon is required'), (0, _expressValidator.check)('uniqueCode').not().isEmpty().withMessage('Code is required')];
exports.sGame = sGame;