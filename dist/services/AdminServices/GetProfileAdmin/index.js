"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var ProfileAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var admin, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Admin["default"].findOne({
              adminId: id
            });

          case 3:
            admin = _context.sent;

            if (admin) {
              _context.next = 8;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Profile admin not found'
            };

          case 8:
            data = {
              adminId: admin.adminId,
              adminName: admin.adminName,
              adminEmail: admin.adminEmail,
              adminImage: admin.adminImage.secure_url,
              createdAt: admin.createdAt
            };
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get profile success',
              data: data
            });

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function ProfileAdmin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = ProfileAdmin;
exports["default"] = _default;