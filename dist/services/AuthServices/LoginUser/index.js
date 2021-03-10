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

var _jwt_auth_instance = require("../../../auth/jwt_auth_instance");

var LoginUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var email, password, user, passwordIsMatch, payload, token, updateLastLogin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = data.email, password = data.password;
            _context.prev = 1;
            _context.next = 4;
            return _Users["default"].findOne({
              email: email,
              isVerified: true
            });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'User not found or not verified yet'
            };

          case 9:
            _context.next = 11;
            return _bcryptjs["default"].compare(password, user.password);

          case 11:
            passwordIsMatch = _context.sent;

            if (!passwordIsMatch) {
              _context.next = 29;
              break;
            }

            payload = {
              role: 0,
              sub: user.userId,
              email: user.email
            };
            _context.next = 16;
            return (0, _jwt_auth_instance.generateToken)(payload);

          case 16:
            token = _context.sent;

            if (!token) {
              _context.next = 26;
              break;
            }

            _context.next = 20;
            return _Users["default"].findOneAndUpdate({
              userId: user.userId
            }, {
              lastLogin: Date.now()
            });

          case 20:
            updateLastLogin = _context.sent;

            if (updateLastLogin) {
              _context.next = 23;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal Server Error, Failed to login users'
            };

          case 23:
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Login Success!',
              data: {
                accessToken: token
              }
            });

          case 26:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal Server Error, Failed to generate token'
            };

          case 27:
            _context.next = 30;
            break;

          case 29:
            throw {
              success: false,
              statusCode: 400,
              message: 'Password is not match'
            };

          case 30:
            _context.next = 35;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 32]]);
  }));

  return function LoginUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = LoginUser;
exports["default"] = _default;