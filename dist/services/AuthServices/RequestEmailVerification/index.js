"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _SendEmail = require("../../../middlewares/SendEmail");

var RequestEmailValidation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var decoded, sub, user, newToken, sendEmail;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _jsonwebtoken["default"].decode(token, 'minigames-verification');

          case 3:
            decoded = _context.sent;

            if (decoded) {
              _context.next = 8;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Token is invalid'
            };

          case 8:
            sub = decoded.sub;
            _context.next = 11;
            return _Users["default"].findOne({
              userId: sub
            });

          case 11:
            user = _context.sent;

            if (user) {
              _context.next = 16;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'User not found'
            };

          case 16:
            _context.next = 18;
            return _jsonwebtoken["default"].sign({
              sub: user.userId
            }, 'minigames-verification', {
              expiresIn: '30m'
            });

          case 18:
            newToken = _context.sent;

            if (!user.isVerified) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'User already verified'
            });

          case 23:
            _context.next = 25;
            return (0, _SendEmail.sendVerificationEmail)(user.email, newToken);

          case 25:
            sendEmail = _context.sent;

            if (!sendEmail) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Email verification has been send'
            });

          case 30:
            throw {
              success: false,
              statusCode: 400,
              message: 'Failed to send verification email. please try again'
            };

          case 31:
            _context.next = 38;
            break;

          case 33:
            _context.prev = 33;
            _context.t0 = _context["catch"](0);

            if (_context.t0.statusCode) {
              _context.next = 37;
              break;
            }

            return _context.abrupt("return", {
              success: false,
              statusCode: 500,
              message: _context.t0.message
            });

          case 37:
            return _context.abrupt("return", _context.t0);

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 33]]);
  }));

  return function RequestEmailValidation(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = RequestEmailValidation;
exports["default"] = _default;