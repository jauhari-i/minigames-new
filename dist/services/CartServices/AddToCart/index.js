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

var _MyGames = _interopRequireDefault(require("../../../models/MyGames"));

var _timePlay = require("../../../constants/timePlay");

var AddToCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId, data) {
    var gameId, playDate, members, time, purcashed, game, doc, newItem, userCart, newCart, oldItems, oldData, duplicated, deleteItems, allItems, updateCart, _updateCart;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            gameId = data.gameId, playDate = data.playDate, members = data.members, time = data.time;
            _context2.prev = 1;

            if (!(members.length < 0)) {
              _context2.next = 6;
              break;
            }

            throw {
              success: false,
              message: 'Members is invalid',
              statusCode: 400
            };

          case 6:
            _context2.next = 8;
            return _MyGames["default"].findOne({
              userId: userId,
              gameId: gameId
            });

          case 8:
            purcashed = _context2.sent;

            if (!purcashed) {
              _context2.next = 13;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Game already purchased'
            };

          case 13:
            _context2.next = 15;
            return _Game["default"].findOne({
              gameId: gameId
            });

          case 15:
            game = _context2.sent;

            if (game) {
              _context2.next = 20;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Game not found'
            };

          case 20:
            if (game.gameReady) {
              _context2.next = 24;
              break;
            }

            throw {
              success: false,
              statusCode: 400,
              message: 'Game is under maintenance'
            };

          case 24:
            doc = {
              itemId: (0, _uuid.v4)(),
              gameId: game.gameId,
              datePlay: playDate,
              timeStart: (0, _timePlay.getTimeStart)(time),
              timeEnd: (0, _timePlay.getTimeEnd)(time, game.gameDuration),
              itemMembers: members,
              itemPrice: game.gamePriceAfterDiscount
            };
            _context2.next = 27;
            return _Items["default"].create(doc);

          case 27:
            newItem = _context2.sent;

            if (!newItem) {
              _context2.next = 78;
              break;
            }

            _context2.next = 31;
            return _Cart["default"].findOne({
              userId: userId
            });

          case 31:
            userCart = _context2.sent;

            if (userCart) {
              _context2.next = 43;
              break;
            }

            _context2.next = 35;
            return _Cart["default"].create({
              cartId: (0, _uuid.v4)(),
              items: [newItem.itemId],
              total: newItem.itemPrice,
              userId: userId
            });

          case 35:
            newCart = _context2.sent;

            if (newCart) {
              _context2.next = 40;
              break;
            }

            return _context2.abrupt("return", {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to add item to cart'
            });

          case 40:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 201,
              message: 'Item added to cart'
            });

          case 41:
            _context2.next = 78;
            break;

          case 43:
            oldItems = userCart.items;

            if (!(oldItems.length > 0)) {
              _context2.next = 70;
              break;
            }

            _context2.next = 47;
            return Promise.all(oldItems.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(itemId) {
                var itemData;
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
                        return _context.abrupt("return", itemData);

                      case 4:
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

          case 47:
            oldData = _context2.sent;
            duplicated = oldData.find(function (g) {
              return g.gameId === newItem.gameId;
            });

            if (!duplicated) {
              _context2.next = 57;
              break;
            }

            _context2.next = 52;
            return _Items["default"].deleteOne({
              itemId: newItem.itemId
            });

          case 52:
            deleteItems = _context2.sent;

            if (!deleteItems) {
              _context2.next = 55;
              break;
            }

            throw {
              success: false,
              statusCode: 409,
              message: 'Game already added to cart'
            };

          case 55:
            _context2.next = 68;
            break;

          case 57:
            allItems = oldItems;
            allItems.push(newItem.itemId);
            _context2.next = 61;
            return _Cart["default"].updateOne({
              cartId: userCart.cartId
            }, {
              items: allItems,
              total: userCart.total + newItem.itemPrice
            });

          case 61:
            updateCart = _context2.sent;
            console.log(allItems);

            if (updateCart) {
              _context2.next = 67;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to update cart'
            };

          case 67:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 201,
              message: 'Item added to cart'
            });

          case 68:
            _context2.next = 78;
            break;

          case 70:
            _context2.next = 72;
            return _Cart["default"].updateOne({
              cartId: userCart.cartId
            }, {
              items: [newItem.itemId],
              total: userCart.total + newItem.itemPrice
            });

          case 72:
            _updateCart = _context2.sent;

            if (_updateCart) {
              _context2.next = 77;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to update cart'
            };

          case 77:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 201,
              message: 'Item added to cart'
            });

          case 78:
            _context2.next = 83;
            break;

          case 80:
            _context2.prev = 80;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", _context2.t0);

          case 83:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 80]]);
  }));

  return function AddToCart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = AddToCart;
exports["default"] = _default;