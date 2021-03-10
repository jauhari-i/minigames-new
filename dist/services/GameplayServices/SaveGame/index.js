"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Codes = _interopRequireDefault(require("../../../models/Codes"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _MyGames = _interopRequireDefault(require("../../../models/MyGames"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _Leaderboard = _interopRequireDefault(require("../../../models/Leaderboard"));

var _uuid = require("uuid");

var SaveGame = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(codeId, uniqueCode, time, teamName, teamIcon, userId) {
    var code, game, user, myGame, doc, leader;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(uniqueCode === 'INFINITE')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Save game success'
            });

          case 5:
            _context.next = 7;
            return _Codes["default"].findOne({
              codeId: codeId
            });

          case 7:
            code = _context.sent;
            _context.next = 10;
            return _Game["default"].findOne({
              gameId: code.gameId
            });

          case 10:
            game = _context.sent;
            _context.next = 13;
            return _Users["default"].findOne({
              userId: userId
            });

          case 13:
            user = _context.sent;
            _context.next = 16;
            return _MyGames["default"].findOneAndUpdate({
              codeId: code.codeId
            }, {
              isPlayed: false
            });

          case 16:
            myGame = _context.sent;

            if (game) {
              _context.next = 21;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Game is unavailable'
            };

          case 21:
            if (game.gameReady) {
              _context.next = 25;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Game is unavailable'
            };

          case 25:
            doc = {
              leaderboardId: (0, _uuid.v4)(),
              teamLeaderName: user.name,
              teamName: teamName,
              teamIcon: teamIcon,
              myGameId: myGame.myGameId,
              gameId: game.gameId,
              score: time
            };
            _context.next = 28;
            return _Leaderboard["default"].create(doc);

          case 28:
            leader = _context.sent;

            if (!leader) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 201,
              message: 'Save game success',
              data: {
                leaderboardId: leader.leaderboardId
              }
            });

          case 33:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 34:
            _context.next = 39;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 36]]);
  }));

  return function SaveGame(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var _default = SaveGame;
exports["default"] = _default;