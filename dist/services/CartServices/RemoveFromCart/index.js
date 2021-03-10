"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Cart = _interopRequireDefault(require("../../../models/Cart"));

var _Items = _interopRequireDefault(require("../../../models/Items"));

var RemoveFromCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(itemId, userId) {
    var userCart, items, newItems, updateCart, deleteItems, updateTotal;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Cart["default"].findOne({
              userId: userId
            });

          case 3:
            userCart = _context.sent;
            items = userCart.items;
            newItems = items.filter(function (i) {
              return i !== itemId;
            });
            _context.next = 8;
            return _Cart["default"].updateOne({
              cartId: userCart.cartId
            }, {
              items: newItems
            });

          case 8:
            updateCart = _context.sent;

            if (!updateCart) {
              _context.next = 27;
              break;
            }

            _context.next = 12;
            return _Items["default"].findOneAndDelete({
              itemId: itemId
            });

          case 12:
            deleteItems = _context.sent;

            if (!deleteItems) {
              _context.next = 24;
              break;
            }

            _context.next = 16;
            return _Cart["default"].updateOne({
              cartId: userCart.cartId
            }, {
              total: userCart.total - deleteItems.itemPrice
            });

          case 16:
            updateTotal = _context.sent;

            if (!updateTotal) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              message: 'Game removed from cart',
              statusCode: 200
            });

          case 21:
            throw {
              success: false,
              message: 'Internal server error',
              statusCode: 500
            };

          case 22:
            _context.next = 25;
            break;

          case 24:
            throw {
              success: false,
              message: 'Internal server error',
              statusCode: 500
            };

          case 25:
            _context.next = 28;
            break;

          case 27:
            throw {
              success: false,
              statusCode: 500,
              message: 'Failed to update cart, internal server error'
            };

          case 28:
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 30]]);
  }));

  return function RemoveFromCart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = RemoveFromCart;
exports["default"] = _default;