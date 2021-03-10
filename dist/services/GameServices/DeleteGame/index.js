"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _UploadImage = require("../../../middlewares/UploadImage");

var DeleteGame = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(gameId) {
    var game, deleteImage, deletePoster, deleteQuery;
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
              message: 'Game id not found'
            };

          case 8:
            _context.next = 10;
            return (0, _UploadImage.DeleteImage)(game.gameImage.public_id);

          case 10:
            deleteImage = _context.sent;
            _context.next = 13;
            return (0, _UploadImage.DeleteImage)(game.posterImage.public_id);

          case 13:
            deletePoster = _context.sent;
            _context.next = 16;
            return _Game["default"].deleteOne({
              gameId: gameId
            });

          case 16:
            deleteQuery = _context.sent;

            if (!(!deleteQuery || !deleteImage || !deletePoster)) {
              _context.next = 21;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 21:
            return _context.abrupt("return", {
              success: true,
              message: 'Game is deleted',
              statusCode: 200
            });

          case 22:
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
  }));

  return function DeleteGame(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DeleteGame;
exports["default"] = _default;