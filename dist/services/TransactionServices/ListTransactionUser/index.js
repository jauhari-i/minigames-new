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

var ListTransactionUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    var tr, trData, sortNewest;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Transaction["default"].find({
              userId: userId
            });

          case 3:
            tr = _context3.sent;

            if (!tr.length) {
              _context3.next = 16;
              break;
            }

            _context3.next = 7;
            return Promise.all(tr.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(trItem) {
                var user, admin, adminData, trItemDetail, trItems, decoded, isExpired, expTr;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _Users["default"].findOne({
                          userId: trItem.userId
                        });

                      case 2:
                        user = _context2.sent;

                        if (!trItem.adminId) {
                          _context2.next = 10;
                          break;
                        }

                        _context2.next = 6;
                        return _Admin["default"].findOne({
                          adminId: trItem.adminId
                        });

                      case 6:
                        adminData = _context2.sent;
                        admin = {
                          adminId: adminData.adminId,
                          adminName: adminData.adminName,
                          adminEmail: adminData.adminEmail,
                          adminImage: adminData.adminImage.secure_url
                        };
                        _context2.next = 11;
                        break;

                      case 10:
                        admin = {};

                      case 11:
                        _context2.next = 13;
                        return Promise.all(trItem.transactionItems.map( /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(tItem) {
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

                          return function (_x3) {
                            return _ref3.apply(this, arguments);
                          };
                        }()));

                      case 13:
                        trItemDetail = _context2.sent;
                        trItems = trItemDetail.filter(function (el) {
                          return el != null;
                        });
                        _context2.next = 17;
                        return _jsonwebtoken["default"].decode(trItem.paymentToken, 'minigames-payment-token');

                      case 17:
                        decoded = _context2.sent;
                        isExpired = Date.now() > decoded.exp * 1000;

                        if (!(isExpired && trItem.transactionStatus === _transactionStatus.status.notUploaded)) {
                          _context2.next = 26;
                          break;
                        }

                        _context2.next = 22;
                        return _Transaction["default"].findOneAndUpdate({
                          transactionId: trItem.transactionId
                        }, {
                          transactionStatus: _transactionStatus.status.expired,
                          isExpired: true
                        });

                      case 22:
                        expTr = _context2.sent;
                        return _context2.abrupt("return", {
                          transactionId: expTr.transactionId,
                          transactionItems: trItems,
                          transactionStatus: _transactionStatus.status.expired,
                          transactionTotal: expTr.transactionTotal,
                          transactionImage: expTr.transactionImage,
                          isRejected: expTr.isRejected,
                          rejectedReason: expTr.isRejected && trItem.rejectedReason,
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
                        });

                      case 26:
                        return _context2.abrupt("return", {
                          transactionId: trItem.transactionId,
                          transactionItems: trItems,
                          transactionStatus: trItem.transactionStatus,
                          transactionTotal: trItem.transactionTotal,
                          transactionImage: trItem.transactionImage,
                          isRejected: trItem.isRejected,
                          rejectedReason: trItem.isRejected && trItem.rejectedReason,
                          isExpired: trItem.isExpired,
                          createdAt: trItem.createdAt,
                          userData: {
                            userId: user.userId,
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            image: user.userImage.secure_url
                          },
                          adminData: admin
                        });

                      case 27:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 7:
            trData = _context3.sent;

            if (!trData) {
              _context3.next = 13;
              break;
            }

            sortNewest = trData.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            return _context3.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get transaction success',
              data: sortNewest
            });

          case 13:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 14:
            _context3.next = 17;
            break;

          case 16:
            return _context3.abrupt("return", {
              success: true,
              message: 'Get transaction success',
              data: [],
              statusCode: 200
            });

          case 17:
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", _context3.t0);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function ListTransactionUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = ListTransactionUser;
exports["default"] = _default;