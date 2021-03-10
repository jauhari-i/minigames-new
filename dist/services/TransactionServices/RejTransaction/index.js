"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Transaction = _interopRequireDefault(require("../../../models/Transaction"));

var _transactionStatus = require("../../../constants/transactionStatus");

var RejectTransaction = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, adminId) {
    var transactionId, reason, tr, updateTransaction;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transactionId = data.transactionId, reason = data.reason;
            _context.prev = 1;
            _context.next = 4;
            return _Transaction["default"].findOne({
              transactionId: transactionId
            });

          case 4:
            tr = _context.sent;

            if (tr) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Transaction not found'
            };

          case 9:
            if (tr.transactionImage) {
              _context.next = 13;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Transaction Payment not uploaded'
            };

          case 13:
            if (!(tr.transactionStatus === _transactionStatus.status.success)) {
              _context.next = 17;
              break;
            }

            throw {
              success: true,
              statusCode: 200,
              message: 'Transaction already accepted'
            };

          case 17:
            _context.next = 19;
            return _Transaction["default"].updateOne({
              transactionId: transactionId
            }, {
              transactionStatus: _transactionStatus.status.rejected,
              isRejected: true,
              rejectedReason: reason,
              adminId: adminId
            });

          case 19:
            updateTransaction = _context.sent;

            if (!updateTransaction) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", {
              statusCode: 200,
              success: true,
              message: 'Transaction rejected'
            });

          case 24:
            throw {
              statusCode: 500,
              message: 'Internal server error',
              success: false
            };

          case 25:
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 27]]);
  }));

  return function RejectTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = RejectTransaction;
exports["default"] = _default;