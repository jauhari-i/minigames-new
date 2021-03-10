"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Transaction = _interopRequireDefault(require("../../../models/Transaction"));

var _MyGames = _interopRequireDefault(require("../../../models/MyGames"));

var _Codes = _interopRequireDefault(require("../../../models/Codes"));

var _transactionStatus = require("../../../constants/transactionStatus");

var _generateCode = require("../../../constants/generateCode");

var _uuid = require("uuid");

var AccTransaction = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(transactionId, adminId) {
    var tr, updateTransaction, addMyGame;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Transaction["default"].findOne({
              transactionId: transactionId
            });

          case 3:
            tr = _context2.sent;

            if (tr) {
              _context2.next = 8;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Transaction not found'
            };

          case 8:
            if (tr.transactionImage.public_id) {
              _context2.next = 12;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Transaction Payment not uploaded'
            };

          case 12:
            if (!(tr.transactionStatus === _transactionStatus.status.success)) {
              _context2.next = 16;
              break;
            }

            throw {
              success: true,
              statusCode: 200,
              message: 'Transaction already accepted'
            };

          case 16:
            _context2.next = 18;
            return _Transaction["default"].updateOne({
              transactionId: transactionId
            }, {
              transactionStatus: _transactionStatus.status.success,
              adminId: adminId
            });

          case 18:
            updateTransaction = _context2.sent;

            if (!updateTransaction) {
              _context2.next = 30;
              break;
            }

            _context2.next = 22;
            return Promise.all(tr.transactionItems.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                var code, isExpired, myGame;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Codes["default"].create({
                          codeId: (0, _uuid.v4)(),
                          gameId: item.gameId,
                          userId: tr.userId,
                          playingDate: item.playingDate,
                          timeStart: item.timeStart,
                          timeEnd: item.timeEnd,
                          uniqueCode: (0, _generateCode.generate)(8),
                          codeMembers: item.members
                        });

                      case 2:
                        code = _context.sent;
                        isExpired = Date.now() > item.playingDate;
                        _context.next = 6;
                        return _MyGames["default"].create({
                          myGameId: (0, _uuid.v4)(),
                          gameId: item.gameId,
                          userId: tr.userId,
                          isExpired: isExpired,
                          isPlayed: false,
                          lastPlayedDate: item.playingDate,
                          codeId: code.codeId
                        });

                      case 6:
                        myGame = _context.sent;
                        return _context.abrupt("return", myGame);

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 22:
            addMyGame = _context2.sent;

            if (!addMyGame) {
              _context2.next = 27;
              break;
            }

            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Transaction confirmed'
            });

          case 27:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 28:
            _context2.next = 31;
            break;

          case 30:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 31:
            _context2.next = 38;
            break;

          case 33:
            _context2.prev = 33;
            _context2.t0 = _context2["catch"](0);

            if (_context2.t0.statusCode) {
              _context2.next = 37;
              break;
            }

            return _context2.abrupt("return", {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            });

          case 37:
            return _context2.abrupt("return", _context2.t0);

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 33]]);
  }));

  return function AccTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = AccTransaction;
exports["default"] = _default;