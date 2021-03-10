"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var ActivateGame = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(gameId) {
    var game, updateQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Game["default"].findOne({
              gameId: gameId
            });

          case 3:
            game = _context.sent;

            if (game) {
              _context.next = 8;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Game not found'
            };

          case 8:
            _context.next = 10;
            return _Game["default"].updateOne({
              gameId: gameId
            }, {
              gameReady: true
            });

          case 10:
            updateQuery = _context.sent;

            if (updateQuery) {
              _context.next = 15;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 15:
            return _context.abrupt("return", {
              success: true,
              message: 'Game is activated',
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

  return function ActivateGame(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = ActivateGame;
exports["default"] = _default;