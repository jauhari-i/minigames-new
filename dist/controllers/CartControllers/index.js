"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _services = _interopRequireDefault(require("../../services"));

var _error = require("../../helpers/error");

var _expressValidator = require("express-validator");

var _services$CartService = _services["default"].CartServices,
    AddToCart = _services$CartService.AddToCart,
    GetCart = _services$CartService.GetCart,
    RemoveFromCart = _services$CartService.RemoveFromCart;
var controller = {
  addToCartHandler: function () {
    var _addToCartHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var validationError, _req$body, gameId, playDate, members, time, data, userId, query;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context.next = 12;
              break;

            case 5:
              _req$body = req.body, gameId = _req$body.gameId, playDate = _req$body.playDate, members = _req$body.members, time = _req$body.time;
              data = {
                gameId: gameId,
                playDate: playDate,
                members: members,
                time: time
              };
              userId = req.userId;
              _context.next = 10;
              return AddToCart(userId, data);

            case 10:
              query = _context.sent;

              if (query) {
                if (!query.success) {
                  (0, _error.handleError)(query, res);
                } else {
                  res.status(query.statusCode).json(query);
                }
              } else {
                (0, _error.handleError)({
                  statusCode: 500,
                  message: 'Internal server error'
                }, res);
              }

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function addToCartHandler(_x, _x2) {
      return _addToCartHandler.apply(this, arguments);
    }

    return addToCartHandler;
  }(),
  getCartHandler: function () {
    var _getCartHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var userId, query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = req.userId;
              _context2.next = 3;
              return GetCart(userId);

            case 3:
              query = _context2.sent;

              if (query) {
                if (!query.success) {
                  (0, _error.handleError)(query, res);
                } else {
                  res.status(query.statusCode).json(query);
                }
              } else {
                (0, _error.handleError)({
                  statusCode: 500,
                  message: 'Internal server error'
                }, res);
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getCartHandler(_x3, _x4) {
      return _getCartHandler.apply(this, arguments);
    }

    return getCartHandler;
  }(),
  removeFromCartHandler: function () {
    var _removeFromCartHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var userId, itemId, query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = req.userId, itemId = req.params.itemId;
              _context3.next = 3;
              return RemoveFromCart(itemId, userId);

            case 3:
              query = _context3.sent;

              if (query) {
                if (!query.success) {
                  (0, _error.handleError)(query, res);
                } else {
                  res.status(query.statusCode).json(query);
                }
              } else {
                (0, _error.handleError)({
                  statusCode: 500,
                  message: 'Internal server error'
                }, res);
              }

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function removeFromCartHandler(_x5, _x6) {
      return _removeFromCartHandler.apply(this, arguments);
    }

    return removeFromCartHandler;
  }()
};
exports.controller = controller;