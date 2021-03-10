"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Leaderboard = _interopRequireDefault(require("../../../models/Leaderboard"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _MyGames = _interopRequireDefault(require("../../../models/MyGames"));

var GetLeaderboardUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(sort) {
    var lb, lbData, data, sorted;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Leaderboard["default"].find();

          case 3:
            lb = _context2.sent;

            if (!lb.length) {
              _context2.next = 13;
              break;
            }

            _context2.next = 7;
            return Promise.all(lb.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                var game, userGame, user;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Game["default"].findOne({
                          gameId: item.gameId
                        });

                      case 2:
                        game = _context.sent;

                        if (game) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt("return", null);

                      case 7:
                        _context.next = 9;
                        return _MyGames["default"].findOne({
                          myGameId: item.myGameId
                        });

                      case 9:
                        userGame = _context.sent;
                        _context.next = 12;
                        return _Users["default"].findOne({
                          userId: userGame.userId
                        });

                      case 12:
                        user = _context.sent;
                        return _context.abrupt("return", {
                          leaderboardId: item.leaderboardId,
                          leaderName: item.teamLeaderName,
                          teamName: item.teamName,
                          teamIcon: item.teamIcon,
                          gameId: game.gameId,
                          gameData: {
                            gameId: game.gameId,
                            gameTitle: game.gameTitle,
                            posterImage: game.posterImage.secure_url,
                            gameImage: game.gameImage.secure_url,
                            gameDescription: game.gameDescription,
                            gamePrice: game.gamePrice,
                            gameDiscount: game.gameDiscount,
                            gamePriceAfterDiscount: game.gamePriceAfterDiscount,
                            gameDifficulty: game.gameDifficulty,
                            gameRating: game.gameRating,
                            gameGenre: game.gameGenre,
                            gameDuration: game.gameDuration,
                            gameUrl: game.gameUrl,
                            gameCapacity: game.gameCapacity,
                            gameReady: game.gameReady,
                            createdAt: game.createdAt,
                            createdBy: game.createdBy
                          },
                          userId: user.userId,
                          score: item.score,
                          createdAt: item.createdAt
                        });

                      case 14:
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

          case 7:
            lbData = _context2.sent;
            data = lbData.filter(function (el) {
              return el != null;
            });

            if (sort === 'score') {
              sorted = data.sort(function (a, b) {
                if (a.score < b.score) return -1;
                if (a.score > b.score) return 1;
                return 0;
              });
            } else {
              sorted = data.sort(function (a, b) {
                if (new Date(a.createdAt) < new Date(b.createdAt)) return -1;
                if (new Date(a.createdAt) > new Date(b.createdAt)) return 1;
                return 0;
              });
            }

            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get leaderboard success',
              data: sorted
            });

          case 13:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get leaderboard success',
              data: []
            });

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function GetLeaderboardUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = GetLeaderboardUser;
exports["default"] = _default;