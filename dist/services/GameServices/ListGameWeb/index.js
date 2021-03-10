"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _MyGames = _interopRequireDefault(require("../../../models/MyGames"));

var ListGameWeb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var game, gameWeb;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Game["default"].find({});

          case 3:
            game = _context2.sent;

            if (!(game.length === 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", {
              success: true,
              message: 'Get game success',
              data: [],
              statusCode: 200
            });

          case 8:
            _context2.next = 10;
            return Promise.all(game.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                var usergame;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _MyGames["default"].findOne({
                          gameId: item.gameId,
                          userId: userId
                        });

                      case 2:
                        usergame = _context.sent;
                        return _context.abrupt("return", {
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
                          canPlay: usergame && usergame.myGameId ? true : false,
                          createdAt: item.createdAt,
                          createdBy: item.createdBy
                        });

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 10:
            gameWeb = _context2.sent;
            return _context2.abrupt("return", {
              success: true,
              message: 'Get game success',
              data: gameWeb,
              statusCode: 200
            });

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function ListGameWeb(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = ListGameWeb;
exports["default"] = _default;