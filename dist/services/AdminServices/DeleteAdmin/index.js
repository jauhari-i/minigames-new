"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var _UploadImage = require("../../../middlewares/UploadImage");

var DeleteAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var admin, deleteImg, deleteQuery;
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
              message: 'Admin not found'
            };

          case 8:
            _context.next = 10;
            return (0, _UploadImage.DeleteImage)(admin.adminImage.public_id);

          case 10:
            deleteImg = _context.sent;
            _context.next = 13;
            return _Admin["default"].deleteOne({
              adminId: admin.adminId
            });

          case 13:
            deleteQuery = _context.sent;

            if (!(deleteQuery && deleteImg.result)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Delete Admin Success!'
            });

          case 18:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to delete admin'
            };

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function DeleteAdmin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DeleteAdmin;
exports["default"] = _default;