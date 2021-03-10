"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Leaderboard = _interopRequireDefault(require("../../../models/Leaderboard"));

var DeleteLeaderboard = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(leaderboardId) {
    var lb, query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Leaderboard["default"].findOne({
              leaderboardId: leaderboardId
            });

          case 3:
            lb = _context.sent;

            if (lb) {
              _context.next = 8;
              break;
            }

            throw {
              success: false,
              message: 'Leaderboard not found',
              statusCode: 404
            };

          case 8:
            _context.next = 10;
            return _Leaderboard["default"].deleteOne({
              leaderboardId: lb.leaderboardId
            });

          case 10:
            query = _context.sent;

            if (query) {
              _context.next = 15;
              break;
            }

            throw {
              success: false,
              message: 'Internal server error',
              statusCode: 500
            };

          case 15:
            return _context.abrupt("return", {
              success: true,
              message: 'Delete game success',
              statusCode: 200
            });

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function DeleteLeaderboard(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DeleteLeaderboard;
exports["default"] = _default;