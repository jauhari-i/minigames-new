"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var UpdatePassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, data) {
    var oldPassword, password, admin, isMatch, encryptedPassword, updateQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            oldPassword = data.oldPassword, password = data.password;
            _context.prev = 1;
            _context.next = 4;
            return _Admin["default"].findOne({
              adminId: id
            });

          case 4:
            admin = _context.sent;

            if (admin) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Admin not found'
            };

          case 9:
            _context.next = 11;
            return _bcryptjs["default"].compareSync(oldPassword, admin.adminPassword);

          case 11:
            isMatch = _context.sent;

            if (isMatch) {
              _context.next = 16;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Old password not match'
            };

          case 16:
            if (!(oldPassword === password)) {
              _context.next = 20;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'New password cannot be same with old password'
            };

          case 20:
            _context.next = 22;
            return _bcryptjs["default"].hashSync(password, 10);

          case 22:
            encryptedPassword = _context.sent;

            if (encryptedPassword) {
              _context.next = 27;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to secure password'
            };

          case 27:
            _context.next = 29;
            return _Admin["default"].updateOne({
              adminId: admin.adminId
            }, {
              adminPassword: encryptedPassword
            });

          case 29:
            updateQuery = _context.sent;

            if (updateQuery) {
              _context.next = 34;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to update password'
            };

          case 34:
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Password updated successful'
            });

          case 35:
            _context.next = 40;
            break;

          case 37:
            _context.prev = 37;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 37]]);
  }));

  return function UpdatePassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = UpdatePassword;
exports["default"] = _default;