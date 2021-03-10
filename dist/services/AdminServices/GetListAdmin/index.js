"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var ListAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var list, dataAdmin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Admin["default"].find({
              level: 0
            });

          case 3:
            list = _context.sent;

            if (!(list.length === 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get admin success',
              data: list
            });

          case 8:
            dataAdmin = list.map(function (item) {
              return {
                adminId: item.adminId,
                adminName: item.adminName,
                adminEmail: item.adminEmail,
                adminImage: item.adminImage.secure_url,
                createdAt: item.createdAt
              };
            });
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get admin success',
              data: dataAdmin
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

  return function ListAdmin() {
    return _ref.apply(this, arguments);
  };
}();

var _default = ListAdmin;
exports["default"] = _default;