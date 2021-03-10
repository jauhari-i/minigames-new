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

var DetailGameAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(gameId, userId) {
    var game, usergame, gameData, code, members, member;
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

            return _context.abrupt("return", {
              success: false,
              message: 'Game not found!',
              statusCode: 404
            });

          case 8:
            _context.next = 10;
            return _MyGames["default"].findOne({
              gameId: game.gameId,
              userId: userId
            });

          case 10:
            usergame = _context.sent;
            gameData = {
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
              canPlay: usergame && !usergame.isExpired && !usergame.isPlayed ? true : false,
              createdAt: game.createdAt,
              createdBy: game.createdBy
            };

            if (!usergame) {
              _context.next = 25;
              break;
            }

            _context.next = 15;
            return _Codes["default"].findOne({
              codeId: usergame.codeId
            });

          case 15:
            code = _context.sent;
            _context.next = 18;
            return _Users["default"].find({
              userId: {
                $in: code.codeMembers
              }
            });

          case 18:
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
            gameData.uniqueCode = code.uniqueCode;
            gameData.members = member;
            gameData.playingSchedule = code.playingDate;
            gameData.timeStart = code.timeStart;
            gameData.timeEnd = code.timeEnd;

          case 25:
            return _context.abrupt("return", {
              success: true,
              message: 'Get detail game success',
              data: gameData,
              statusCode: 200
            });

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 28]]);
  }));

  return function DetailGameAdmin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DetailGameAdmin;
exports["default"] = _default;