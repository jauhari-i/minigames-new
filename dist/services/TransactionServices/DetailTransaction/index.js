"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var _Transaction = _interopRequireDefault(require("../../../models/Transaction"));

var _transactionStatus = require("../../../constants/transactionStatus");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var DetailTransaction = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(transactionId) {
    var tr, user, admin, data, adminData, trItemDetail, decoded, isExpired, expTr;
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
            _context2.next = 10;
            return _Users["default"].findOne({
              userId: tr.userId
            });

          case 10:
            user = _context2.sent;

            if (!tr.adminId) {
              _context2.next = 18;
              break;
            }

            _context2.next = 14;
            return _Admin["default"].findOne({
              adminId: tr.adminId
            });

          case 14:
            adminData = _context2.sent;
            admin = {
              adminId: adminData.adminId,
              adminName: adminData.adminName,
              adminEmail: adminData.adminEmail,
              adminImage: adminData.adminImage.secure_url
            };
            _context2.next = 19;
            break;

          case 18:
            admin = {};

          case 19:
            _context2.next = 21;
            return Promise.all(tr.transactionItems.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(tItem) {
                var game, members, member;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Game["default"].findOne({
                          gameId: tItem.gameId
                        });

                      case 2:
                        game = _context.sent;
                        _context.next = 5;
                        return _Users["default"].find({
                          userId: {
                            $in: tItem.members
                          }
                        });

                      case 5:
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
                          _context.next = 11;
                          break;
                        }

                        return _context.abrupt("return", {
                          gameId: tItem.gameId,
                          gameData: {
                            gameId: tItem.gameId,
                            gameTitle: 'Game is unavaliable',
                            posterImage: 'Game is unavaliable',
                            gameImage: 'Game is unavaliable',
                            gameDescription: 'Game is unavaliable',
                            gamePrice: 0,
                            gameDiscount: 0,
                            gamePriceAfterDiscount: 0,
                            gameDifficulty: 0,
                            gameRating: 0,
                            gameGenre: [''],
                            gameDuration: 0,
                            gameUrl: 'Game is unavaliable',
                            gameCapacity: 0,
                            gameReady: false,
                            createdAt: Date.now()
                          },
                          playingDate: tItem.datePlay,
                          timeStart: tItem.timeStart,
                          timeEnd: tItem.timeEnd,
                          itemPrice: tItem.itemPrice,
                          members: member
                        });

                      case 11:
                        return _context.abrupt("return", {
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
                          playingDate: tItem.datePlay,
                          timeStart: tItem.timeStart,
                          timeEnd: tItem.timeEnd,
                          itemPrice: tItem.itemPrice,
                          members: member
                        });

                      case 12:
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

          case 21:
            trItemDetail = _context2.sent;
            _context2.next = 24;
            return _jsonwebtoken["default"].decode(tr.paymentToken, 'minigames-payment-token');

          case 24:
            decoded = _context2.sent;
            isExpired = Date.now() > decoded.exp * 1000;

            if (!(isExpired && tr.transactionStatus === _transactionStatus.status.notUploaded)) {
              _context2.next = 33;
              break;
            }

            _context2.next = 29;
            return _Transaction["default"].findOneAndUpdate({
              transactionId: tr.transactionId
            }, {
              transactionStatus: _transactionStatus.status.expired,
              isExpired: true
            });

          case 29:
            expTr = _context2.sent;
            data = {
              transactionId: expTr.transactionId,
              transactionItems: trItemDetail,
              transactionStatus: _transactionStatus.status.expired,
              transactionTotal: expTr.transactionTotal,
              transactionImage: expTr.transactionImage,
              isRejected: expTr.isRejected,
              rejectedReason: expTr.isRejected && expTr.rejectedReason,
              isExpired: true,
              createdAt: expTr.createdAt,
              userData: {
                userId: user.userId,
                username: user.username,
                name: user.name,
                email: user.email,
                image: user.userImage.secure_url
              },
              adminData: admin
            };
            _context2.next = 34;
            break;

          case 33:
            data = {
              transactionId: tr.transactionId,
              transactionItems: trItemDetail,
              transactionStatus: tr.transactionStatus,
              transactionTotal: tr.transactionTotal,
              transactionImage: tr.transactionImage,
              isRejected: tr.isRejected,
              rejectedReason: tr.isRejected && tr.rejectedReason,
              isExpired: tr.isExpired,
              createdAt: tr.createdAt,
              userData: {
                userId: user.userId,
                username: user.username,
                name: user.name,
                email: user.email,
                image: user.userImage.secure_url
              },
              adminData: admin
            };

          case 34:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Detail transaction success',
              data: data
            });

          case 35:
            _context2.next = 40;
            break;

          case 37:
            _context2.prev = 37;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 40:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 37]]);
  }));

  return function DetailTransaction(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DetailTransaction;
exports["default"] = _default;