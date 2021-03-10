"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uuid = require("uuid");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _SendEmail = require("../../../middlewares/SendEmail");

var _defaultImage = require("../../../constants/defaultImage");

var _UploadImage = require("../../../middlewares/UploadImage");

var RegisterUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var name, email, username, password, encryptedPassword, img, newUser, verificationToken, sendEmail, deleteNewUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = data.name, email = data.email, username = data.username, password = data.password;
            _context.prev = 1;
            _context.next = 4;
            return _bcryptjs["default"].hash(password, 10);

          case 4:
            encryptedPassword = _context.sent;

            if (encryptedPassword) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, Failed to secure password'
            };

          case 9:
            _context.next = 11;
            return (0, _UploadImage.Uploader)(_defaultImage.defaultImage);

          case 11:
            img = _context.sent;
            _context.next = 14;
            return _Users["default"].create({
              userId: (0, _uuid.v4)(),
              name: name,
              email: email,
              username: username,
              password: encryptedPassword,
              userImage: img
            });

          case 14:
            newUser = _context.sent;

            if (newUser) {
              _context.next = 19;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, Failed to register user'
            };

          case 19:
            _context.next = 21;
            return _jsonwebtoken["default"].sign({
              sub: newUser.userId
            }, 'minigames-verification', {
              expiresIn: '30m'
            });

          case 21:
            verificationToken = _context.sent;
            _context.next = 24;
            return (0, _SendEmail.sendVerificationEmail)(newUser.email, verificationToken);

          case 24:
            sendEmail = _context.sent;

            if (!sendEmail) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 201,
              message: 'Success registering user',
              data: {
                userId: newUser.userId
              }
            });

          case 29:
            _context.next = 31;
            return _Users["default"].deleteOne({
              userId: newUser.userId
            });

          case 31:
            deleteNewUser = _context.sent;

            if (!deleteNewUser) {
              _context.next = 36;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Cant send verification email, please try again latter'
            };

          case 36:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to register user'
            };

          case 37:
            _context.next = 42;
            break;

          case 39:
            _context.prev = 39;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 39]]);
  }));

  return function RegisterUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = RegisterUser;
exports["default"] = _default;