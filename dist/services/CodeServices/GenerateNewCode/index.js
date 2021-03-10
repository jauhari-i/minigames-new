"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Codes = _interopRequireDefault(require("../../../models/Codes"));

var _MyGames = _interopRequireDefault(require("../../../models/MyGames"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _timePlay = require("../../../constants/timePlay");

var _generateCode = require("../../../constants/generateCode");

var GenerateNewCode = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(codeId, data) {
    var time, playDate, code, isExpired, game, newCode, updateQuery, updateMyGame;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            time = data.time, playDate = data.playDate;
            _context.prev = 1;
            _context.next = 4;
            return _Codes["default"].findOne({
              codeId: codeId
            });

          case 4:
            code = _context.sent;

            if (code) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Code not found'
            };

          case 9:
            isExpired = Date.now() > playDate;
            _context.next = 12;
            return _Game["default"].findOne({
              gameId: code.gameId
            });

          case 12:
            game = _context.sent;
            newCode = (0, _generateCode.generate)(8);
            _context.next = 16;
            return _Codes["default"].updateOne({
              codeId: codeId
            }, {
              playingDate: playDate,
              timeStart: (0, _timePlay.getTimeStart)(time),
              timeEnd: (0, _timePlay.getTimeEnd)(time, game.gameDuration),
              uniqueCode: newCode
            });

          case 16:
            updateQuery = _context.sent;

            if (!updateQuery) {
              _context.next = 28;
              break;
            }

            _context.next = 20;
            return _MyGames["default"].updateOne({
              codeId: code.codeId
            }, {
              isExpired: isExpired,
              isPlayed: false,
              lastPlayer: '',
              lastPlayedDate: null
            });

          case 20:
            updateMyGame = _context.sent;

            if (!updateMyGame) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Code generated success',
              data: {
                uniqueCode: newCode
              }
            });

          case 25:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 26:
            _context.next = 29;
            break;

          case 28:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 29:
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 31]]);
  }));

  return function GenerateNewCode(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = GenerateNewCode;
exports["default"] = _default;