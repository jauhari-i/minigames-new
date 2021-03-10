"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _Transaction = _interopRequireDefault(require("../../../models/Transaction"));

var _Codes = _interopRequireDefault(require("../../../models/Codes"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var _transactionStatus = require("../../../constants/transactionStatus");

var GetStatistic = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(adminId, roles) {
    var adminCount, codeCount, transactionCount, accTransCount, rejTransCount, pendTransCount, noUploadTransCount, expiredTransCount, userCount, gameCount;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Admin["default"].countDocuments();

          case 2:
            adminCount = _context.sent;
            _context.next = 5;
            return _Codes["default"].countDocuments();

          case 5:
            codeCount = _context.sent;
            _context.next = 8;
            return _Transaction["default"].countDocuments();

          case 8:
            transactionCount = _context.sent;
            _context.next = 11;
            return _Transaction["default"].countDocuments({
              transactionStatus: _transactionStatus.status.success
            });

          case 11:
            accTransCount = _context.sent;
            _context.next = 14;
            return _Transaction["default"].countDocuments({
              transactionStatus: _transactionStatus.status.rejected
            });

          case 14:
            rejTransCount = _context.sent;
            _context.next = 17;
            return _Transaction["default"].countDocuments({
              transactionStatus: _transactionStatus.status.pending
            });

          case 17:
            pendTransCount = _context.sent;
            _context.next = 20;
            return _Transaction["default"].countDocuments({
              transactionStatus: _transactionStatus.status.notUploaded,
              isExpired: false
            });

          case 20:
            noUploadTransCount = _context.sent;
            _context.next = 23;
            return _Transaction["default"].countDocuments({
              transactionStatus: _transactionStatus.status.expired,
              isExpired: true
            });

          case 23:
            expiredTransCount = _context.sent;
            _context.next = 26;
            return _Users["default"].countDocuments();

          case 26:
            userCount = _context.sent;
            _context.next = 29;
            return _Game["default"].countDocuments();

          case 29:
            gameCount = _context.sent;
            return _context.abrupt("return", {
              success: true,
              message: 'Get statistic success',
              statusCode: 200,
              data: {
                adminCount: roles !== 2 ? null : adminCount,
                userCount: userCount,
                gameCount: gameCount,
                expiredTransCount: expiredTransCount,
                noUploadTransCount: noUploadTransCount,
                pendTransCount: pendTransCount,
                rejTransCount: rejTransCount,
                accTransCount: accTransCount,
                transactionCount: transactionCount,
                codeCount: codeCount
              }
            });

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function GetStatistic(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = GetStatistic;
exports["default"] = _default;