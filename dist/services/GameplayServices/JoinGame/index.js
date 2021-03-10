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

var _uuid = require("uuid");

var _moment = _interopRequireDefault(require("moment"));

var JoinGame = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(uCode, userId) {
    var code, members, uIndex, user, today, date, h, playDt, pDate, pStart, pEnd, canPlay, game, mem, member, updateQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(uCode === 'INFINITE')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Join game success',
              data: {
                codeId: (0, _uuid.v4)(),
                gameId: (0, _uuid.v4)(),
                userId: userId,
                members: [],
                playDate: Date.now(),
                uniqueCode: 'INFINITE'
              }
            });

          case 5:
            _context.next = 7;
            return _Codes["default"].findOne({
              uniqueCode: uCode
            });

          case 7:
            code = _context.sent;
            members = code.codeMembers;
            uIndex = members.findIndex(function (x) {
              return x === userId;
            });

            if (!(uIndex < 0)) {
              _context.next = 14;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Code is only for members'
            };

          case 14:
            _context.next = 16;
            return _Users["default"].findOne({
              userId: members[uIndex]
            });

          case 16:
            user = _context.sent;

            if (user) {
              _context.next = 21;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 21:
            today = new Date();
            date = today.getDate();
            h = today.getHours() * 60;
            playDt = new Date(code.playingDate);
            pDate = playDt.getDate();
            pStart = code.timeStart * 60;
            pEnd = code.timeEnd * 60;

            if (!(date !== pDate)) {
              _context.next = 32;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: "Code only can be played at ".concat((0, _moment["default"])(pDate).format('ll'))
            };

          case 32:
            canPlay = pStart <= h && h <= pEnd;

            if (!canPlay) {
              _context.next = 55;
              break;
            }

            _context.next = 36;
            return _Game["default"].findOne({
              gameId: code.gameId
            });

          case 36:
            game = _context.sent;

            if (!(!game || !game.gameReady)) {
              _context.next = 41;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Game is unavailable'
            };

          case 41:
            _context.next = 43;
            return _Users["default"].find({
              userId: {
                $in: members
              }
            });

          case 43:
            mem = _context.sent;
            member = mem.map(function (item) {
              return {
                userId: item.userId,
                username: item.username,
                name: item.name,
                email: item.email,
                image: item.userImage.secure_url
              };
            });
            _context.next = 47;
            return _MyGames["default"].updateOne({
              codeId: code.codeId
            }, {
              isPlayed: true,
              lastPlayedDate: Date.now(),
              lastPlayer: user.userId
            });

          case 47:
            updateQuery = _context.sent;

            if (updateQuery) {
              _context.next = 52;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 52:
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Join game success',
              data: {
                codeId: code.codeId,
                gameId: game.gameId,
                userId: user.userId,
                members: member,
                playDate: code.playingDate,
                uniqueCode: code.uniqueCode
              }
            });

          case 53:
            _context.next = 56;
            break;

          case 55:
            throw {
              success: false,
              statusCode: 400,
              message: "Code only can be played at ".concat(pStart / 60 === 9 ? '09' : pStart / 60, ".00 - ").concat(pEnd / 60, ".00")
            };

          case 56:
            _context.next = 61;
            break;

          case 58:
            _context.prev = 58;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 58]]);
  }));

  return function JoinGame(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = JoinGame;
exports["default"] = _default;