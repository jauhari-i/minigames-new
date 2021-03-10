"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Transaction = _interopRequireDefault(require("../../../models/Transaction"));

var _UploadImage = require("../../../middlewares/UploadImage");

var DeleteTransaction = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(transactionId) {
    var tr, deleteQuery, deleteImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Transaction["default"].findOne({
              transactionId: transactionId
            });

          case 3:
            tr = _context.sent;

            if (tr) {
              _context.next = 8;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Transaction not found'
            };

          case 8:
            _context.next = 10;
            return _Transaction["default"].deleteOne({
              transactionId: tr.transactionId
            });

          case 10:
            deleteQuery = _context.sent;
            _context.next = 13;
            return (0, _UploadImage.DeleteImage)(tr.transactionImage.public_id);

          case 13:
            deleteImage = _context.sent;

            if (!(deleteQuery && deleteImage.result)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Delete Transaction success'
            });

          case 18:
            return _context.abrupt("return", {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
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

  return function DeleteTransaction(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DeleteTransaction;
exports["default"] = _default;