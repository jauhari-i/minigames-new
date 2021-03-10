"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _UploadImage = require("../../../middlewares/UploadImage");

var DeleteUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var user, deleteImg, deleteQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Users["default"].findOne({
              userId: id
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'User not found'
            };

          case 8:
            _context.next = 10;
            return (0, _UploadImage.DeleteImage)(user.userImage.public_id);

          case 10:
            deleteImg = _context.sent;
            _context.next = 13;
            return _Users["default"].deleteOne({
              userId: user.userId
            });

          case 13:
            deleteQuery = _context.sent;

            if (!(!deleteQuery || !deleteImg)) {
              _context.next = 18;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to delete user'
            };

          case 18:
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Delete user success'
            });

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

  return function DeleteUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DeleteUser;
exports["default"] = _default;