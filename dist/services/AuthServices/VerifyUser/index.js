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

var VerifyUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var decoded, user, updateVerify;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _jsonwebtoken["default"].verify(token, 'minigames-verification');

          case 3:
            decoded = _context.sent;

            if (decoded) {
              _context.next = 8;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Verification Token is expired'
            };

          case 8:
            _context.next = 10;
            return _Users["default"].findOne({
              userId: decoded.sub
            });

          case 10:
            user = _context.sent;

            if (!user.isVerified) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'User is already verified'
            });

          case 15:
            _context.next = 17;
            return _Users["default"].updateOne({
              userId: user.userId
            }, {
              isVerified: true,
              verifiedAt: Date.now()
            });

          case 17:
            updateVerify = _context.sent;

            if (updateVerify) {
              _context.next = 22;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to verify user'
            };

          case 22:
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'User is verified'
            });

          case 23:
            _context.next = 30;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](0);

            if (_context.t0.statusCode) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", {
              success: false,
              statusCode: 500,
              message: _context.t0.message
            });

          case 29:
            return _context.abrupt("return", _context.t0);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 25]]);
  }));

  return function VerifyUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = VerifyUser;
exports["default"] = _default;