"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Cart = _interopRequireDefault(require("../../../models/Cart"));

var _uuid = require("uuid");

var _Items = _interopRequireDefault(require("../../../models/Items"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _Transaction = _interopRequireDefault(require("../../../models/Transaction"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var CheckoutTransaction = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data, userId) {
    var cartId, userCart, items, transactionItems, tItem, total, newTransaction, paymentToken, updatePaymentToken, updateCart, deleteItems;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cartId = data.cartId;
            _context3.prev = 1;
            _context3.next = 4;
            return _Cart["default"].findOne({
              cartId: cartId,
              userId: userId
            });

          case 4:
            userCart = _context3.sent;

            if (userCart) {
              _context3.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Cart not found'
            };

          case 9:
            items = userCart.items;

            if (!items.length) {
              _context3.next = 56;
              break;
            }

            _context3.next = 13;
            return Promise.all(items.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(itemId) {
                var itemData, game, members;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Items["default"].findOne({
                          itemId: itemId
                        });

                      case 2:
                        itemData = _context.sent;
                        _context.next = 5;
                        return _Game["default"].findOne({
                          gameId: itemData.gameId
                        });

                      case 5:
                        game = _context.sent;
                        members = itemData.itemMembers;

                        if (game) {
                          _context.next = 11;
                          break;
                        }

                        return _context.abrupt("return", null);

                      case 11:
                        return _context.abrupt("return", {
                          itemId: itemData.itemId,
                          gameId: game.gameId,
                          playingDate: itemData.datePlay,
                          timeStart: itemData.timeStart,
                          timeEnd: itemData.timeEnd,
                          itemPrice: itemData.itemPrice,
                          members: members
                        });

                      case 12:
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

          case 13:
            transactionItems = _context3.sent;
            tItem = transactionItems.filter(function (el) {
              return el != null;
            });
            total = tItem.map(function (item) {
              return item.itemPrice;
            }).reduce(function (p, c) {
              return p + c;
            }, 0);
            _context3.next = 18;
            return _Transaction["default"].create({
              transactionId: (0, _uuid.v4)(),
              transactionItems: tItem,
              transactionTotal: total,
              userId: userId
            });

          case 18:
            newTransaction = _context3.sent;

            if (newTransaction) {
              _context3.next = 23;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to checkout cart'
            };

          case 23:
            _context3.next = 25;
            return _jsonwebtoken["default"].sign({
              transactionId: newTransaction.transactionId,
              sub: userId
            }, 'minigames-payment-token', {
              expiresIn: '48h'
            });

          case 25:
            paymentToken = _context3.sent;
            _context3.next = 28;
            return _Transaction["default"].updateOne({
              transactionId: newTransaction.transactionId
            }, {
              paymentToken: paymentToken
            });

          case 28:
            updatePaymentToken = _context3.sent;

            if (!updatePaymentToken) {
              _context3.next = 51;
              break;
            }

            _context3.next = 32;
            return _Cart["default"].updateOne({
              cartId: userCart.cartId
            }, {
              items: [],
              total: 0
            });

          case 32:
            updateCart = _context3.sent;

            if (updateCart) {
              _context3.next = 39;
              break;
            }

            _context3.next = 36;
            return _Transaction["default"].deleteOne({
              transactionId: newTransaction.transactionId
            });

          case 36:
            throw {
              success: false,
              statusCode: 500,
              message: 'Failed to empty cart, Internal server error'
            };

          case 39:
            _context3.next = 41;
            return Promise.all(items.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(itemId) {
                var query;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _Items["default"].deleteOne({
                          itemId: itemId
                        });

                      case 2:
                        query = _context2.sent;
                        return _context2.abrupt("return", query);

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 41:
            deleteItems = _context3.sent;

            if (deleteItems) {
              _context3.next = 48;
              break;
            }

            _context3.next = 45;
            return _Transaction["default"].deleteOne({
              transactionId: newTransaction.transactionId
            });

          case 45:
            throw {
              success: false,
              statusCode: 500,
              message: 'Failed to clear, Internal server error'
            };

          case 48:
            return _context3.abrupt("return", {
              success: true,
              statusCode: 201,
              message: 'Transaction Success',
              data: {
                transactionId: newTransaction.transactionId,
                paymentToken: paymentToken
              }
            });

          case 49:
            _context3.next = 54;
            break;

          case 51:
            _context3.next = 53;
            return _Transaction["default"].deleteOne({
              transactionId: newTransaction.transactionId
            });

          case 53:
            throw {
              success: false,
              statusCode: 500,
              message: 'Failed to generate payment token, Internal server error'
            };

          case 54:
            _context3.next = 57;
            break;

          case 56:
            throw {
              success: false,
              message: 'Cart is empty',
              statusCode: 400
            };

          case 57:
            _context3.next = 62;
            break;

          case 59:
            _context3.prev = 59;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", _context3.t0);

          case 62:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 59]]);
  }));

  return function CheckoutTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = CheckoutTransaction;
exports["default"] = _default;