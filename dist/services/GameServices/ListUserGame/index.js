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

var _Codes = _interopRequireDefault(require("../../../models/Codes"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var ListGameUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var userGame, gameUser, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _MyGames["default"].find({
              userId: userId
            });

          case 3:
            userGame = _context2.sent;

            if (!(userGame.length === 0)) {
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
            return Promise.all(userGame.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                var code, isExpired, game, members, member, updateMygame, _updateMygame;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Codes["default"].findOne({
                          codeId: item.codeId
                        });

                      case 2:
                        code = _context.sent;
                        isExpired = Date.now() > code.playingDate;
                        _context.next = 6;
                        return _Game["default"].findOne({
                          gameId: item.gameId
                        });

                      case 6:
                        game = _context.sent;
                        _context.next = 9;
                        return _Users["default"].find({
                          userId: {
                            $in: code.codeMembers
                          }
                        });

                      case 9:
                        members = _context.sent;
                        member = members.map(function (item) {
                          return {
                            userId: item.userId,
                            username: item.username,
                            name: item.name,
                            email: item.email,
                            image: item.userImage.secure_url
                          };
                        });

                        if (game) {
                          _context.next = 15;
                          break;
                        }

                        return _context.abrupt("return", null);

                      case 15:
                        if (!isExpired) {
                          _context.next = 26;
                          break;
                        }

                        _context.next = 18;
                        return _MyGames["default"].updateOne({
                          myGameId: item.myGameId
                        }, {
                          isExpired: true
                        });

                      case 18:
                        updateMygame = _context.sent;

                        if (!updateMygame) {
                          _context.next = 23;
                          break;
                        }

                        return _context.abrupt("return", {
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
                          canPlay: !isExpired ? true : false,
                          uniqueCode: code.uniqueCode,
                          members: member,
                          playingSchedule: code.playingDate,
                          timeStart: code.timeStart,
                          timeEnd: code.timeEnd,
                          createdAt: game.createdAt,
                          createdBy: game.createdBy
                        });

                      case 23:
                        return _context.abrupt("return", {
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
                          canPlay: !isExpired ? true : false,
                          uniqueCode: code.uniqueCode,
                          members: member,
                          playingSchedule: code.playingDate,
                          timeStart: code.timeStart,
                          timeEnd: code.timeEnd,
                          createdAt: game.createdAt,
                          createdBy: game.createdBy
                        });

                      case 24:
                        _context.next = 34;
                        break;

                      case 26:
                        _context.next = 28;
                        return _MyGames["default"].updateOne({
                          myGameId: item.myGameId
                        }, {
                          isExpired: false
                        });

                      case 28:
                        _updateMygame = _context.sent;

                        if (!_updateMygame) {
                          _context.next = 33;
                          break;
                        }

                        return _context.abrupt("return", {
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
                          canPlay: item.isPlayed ? false : true,
                          uniqueCode: code.uniqueCode,
                          members: member,
                          playingSchedule: code.playingDate,
                          timeStart: code.timeStart,
                          timeEnd: code.timeEnd,
                          createdAt: game.createdAt,
                          createdBy: game.createdBy
                        });

                      case 33:
                        return _context.abrupt("return", {
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
                          canPlay: item.isPlayed ? false : true,
                          uniqueCode: code.uniqueCode,
                          members: member,
                          playingSchedule: code.playingDate,
                          timeStart: code.timeStart,
                          timeEnd: code.timeEnd,
                          createdAt: game.createdAt,
                          createdBy: game.createdBy
                        });

                      case 34:
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
            gameUser = _context2.sent;
            data = gameUser.filter(function (el) {
              return el != null;
            });
            return _context2.abrupt("return", {
              success: true,
              message: 'Get game success',
              data: data,
              statusCode: 200
            });

          case 13:
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function ListGameUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = ListGameUser;
exports["default"] = _default;