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

var _Users = _interopRequireDefault(require("../../../models/Users"));

var GetCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var userCart, newCart, items, itemsData, data, total, updateTotal;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Cart["default"].findOne({
              userId: userId
            });

          case 3:
            userCart = _context2.sent;

            if (userCart) {
              _context2.next = 15;
              break;
            }

            _context2.next = 7;
            return _Cart["default"].create({
              cartId: (0, _uuid.v4)(),
              items: [],
              total: 0,
              userId: userId
            });

          case 7:
            newCart = _context2.sent;

            if (!newCart) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", {
              statusCode: 200,
              message: 'Get Cart success',
              data: {
                cartId: newCart.cartId,
                items: newCart.items,
                total: newCart.total,
                userId: newCart.userId
              },
              success: true
            });

          case 12:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error'
            };

          case 13:
            _context2.next = 38;
            break;

          case 15:
            items = userCart.items;

            if (!items.length) {
              _context2.next = 37;
              break;
            }

            _context2.next = 19;
            return Promise.all(items.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(itemId) {
                var item, game, members, member, memberData;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Items["default"].findOne({
                          itemId: itemId
                        });

                      case 2:
                        item = _context.sent;
                        _context.next = 5;
                        return _Game["default"].findOne({
                          gameId: item.gameId
                        });

                      case 5:
                        game = _context.sent;
                        members = item.itemMembers;
                        _context.next = 9;
                        return _Users["default"].find({
                          userId: {
                            $in: members
                          }
                        });

                      case 9:
                        member = _context.sent;
                        memberData = member.map(function (item) {
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
                        return _context.abrupt("return", {
                          itemId: item.itemId,
                          gameId: game.gameId,
                          playingDate: item.datePlay,
                          timeStart: item.timeStart,
                          timeEnd: item.timeEnd,
                          itemPrice: item.itemPrice,
                          members: memberData
                        });

                      case 16:
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

          case 19:
            itemsData = _context2.sent;
            console.log(itemsData);

            if (!itemsData.length) {
              _context2.next = 34;
              break;
            }

            data = itemsData.filter(function (el) {
              return el != null;
            });
            total = data.map(function (item) {
              return item.itemPrice;
            }).reduce(function (p, c) {
              return p + c;
            }, 0);
            _context2.next = 26;
            return _Cart["default"].updateOne({
              cartId: userCart.cartId
            }, {
              total: total
            });

          case 26:
            updateTotal = _context2.sent;

            if (!updateTotal) {
              _context2.next = 31;
              break;
            }

            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get cart success',
              data: {
                cartId: userCart.cartId,
                items: data,
                total: total,
                userId: userCart.userId
              }
            });

          case 31:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get cart success',
              data: {
                cartId: userCart.cartId,
                items: data,
                total: userCart.total,
                userId: userCart.userId
              }
            });

          case 32:
            _context2.next = 35;
            break;

          case 34:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get cart success',
              data: {
                cartId: userCart.cartId,
                items: [],
                total: 0,
                userId: userCart.userId
              }
            });

          case 35:
            _context2.next = 38;
            break;

          case 37:
            return _context2.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get cart success',
              data: {
                cartId: userCart.cartId,
                items: [],
                total: 0,
                userId: userCart.userId
              }
            });

          case 38:
            _context2.next = 43;
            break;

          case 40:
            _context2.prev = 40;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 43:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 40]]);
  }));

  return function GetCart(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = GetCart;
exports["default"] = _default;