"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var ListGameAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var game, gameData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Game["default"].find({});

          case 3:
            game = _context.sent;

            if (!(game.length === 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              message: 'Get game success',
              data: [],
              statusCode: 200
            });

          case 8:
            gameData = game.map(function (item) {
              return {
                gameId: item.gameId,
                gameTitle: item.gameTitle,
                posterImage: item.posterImage.secure_url,
                gameImage: item.gameImage.secure_url,
                gameDescription: item.gameDescription,
                gamePrice: item.gamePrice,
                gameDiscount: item.gameDiscount,
                gamePriceAfterDiscount: item.gamePriceAfterDiscount,
                gameDifficulty: item.gameDifficulty,
                gameRating: item.gameRating,
                gameGenre: item.gameGenre,
                gameDuration: item.gameDuration,
                gameUrl: item.gameUrl,
                gameCapacity: item.gameCapacity,
                gameReady: item.gameReady,
                createdAt: item.createdAt,
                createdBy: item.createdBy
              };
            });
            return _context.abrupt("return", {
              success: true,
              message: 'Get game success',
              data: gameData,
              statusCode: 200
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

  return function ListGameAdmin() {
    return _ref.apply(this, arguments);
  };
}();

var _default = ListGameAdmin;
exports["default"] = _default;