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

var _transactionStatus = require("../../../constants/transactionStatus");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var UploadPayment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, transactionId) {
    var image, transaction, img, decoded, isExpired, updateTransaction;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            image = data.image;
            _context.prev = 1;
            _context.next = 4;
            return _Transaction["default"].findOne({
              transactionId: transactionId
            });

          case 4:
            transaction = _context.sent;

            if (transaction) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Transaction not found'
            };

          case 9:
            _context.next = 11;
            return _jsonwebtoken["default"].decode(transaction.paymentToken);

          case 11:
            decoded = _context.sent;
            isExpired = Date.now() > decoded.exp * 1000;

            if (!isExpired) {
              _context.next = 17;
              break;
            }

            img = {};
            _context.next = 20;
            break;

          case 17:
            _context.next = 19;
            return (0, _UploadImage.Uploader)(image);

          case 19:
            img = _context.sent;

          case 20:
            _context.next = 22;
            return _Transaction["default"].updateOne({
              transactionId: transaction.transactionId
            }, {
              transactionImage: img,
              transactionStatus: isExpired ? _transactionStatus.status.expired : _transactionStatus.status.pending,
              isExpired: isExpired
            });

          case 22:
            updateTransaction = _context.sent;

            if (updateTransaction) {
              _context.next = 27;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 27:
            if (!isExpired) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", {
              success: false,
              statusCode: 400,
              message: 'Transaction is expired'
            });

          case 31:
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Transaction Image is uploaded'
            });

          case 32:
            _context.next = 37;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 34]]);
  }));

  return function UploadPayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = UploadPayment;
exports["default"] = _default;