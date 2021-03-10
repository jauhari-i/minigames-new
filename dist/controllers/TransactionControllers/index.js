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

var _services$Transaction = _services["default"].TransactionServices,
    AccTransaction = _services$Transaction.AccTransaction,
    CheckoutTransaction = _services$Transaction.CheckoutTransaction,
    DeleteTransaction = _services$Transaction.DeleteTransaction,
    DetailTransaction = _services$Transaction.DetailTransaction,
    ListTransactionAdmin = _services$Transaction.ListTransactionAdmin,
    ListTransactionUser = _services$Transaction.ListTransactionUser,
    RejectTransaction = _services$Transaction.RejectTransaction,
    UploadPayment = _services$Transaction.UploadPayment;
var controller = {
  accTransactionHandler: function () {
    var _accTransactionHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var adminId, transactionId, query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adminId = req.adminId, transactionId = req.params.transactionId;
              _context.next = 3;
              return AccTransaction(transactionId, adminId);

            case 3:
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

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function accTransactionHandler(_x, _x2) {
      return _accTransactionHandler.apply(this, arguments);
    }

    return accTransactionHandler;
  }(),
  checkoutTransctionHandler: function () {
    var _checkoutTransctionHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var validationError, data, userId, query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context2.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context2.next = 11;
              break;

            case 5:
              data = {
                cartId: req.body.cartId
              };
              userId = req.userId;
              _context2.next = 9;
              return CheckoutTransaction(data, userId);

            case 9:
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

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function checkoutTransctionHandler(_x3, _x4) {
      return _checkoutTransctionHandler.apply(this, arguments);
    }

    return checkoutTransctionHandler;
  }(),
  deleteTransactionHandler: function () {
    var _deleteTransactionHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var transactionId, query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              transactionId = req.params.transactionId;
              _context3.next = 3;
              return DeleteTransaction(transactionId);

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

    function deleteTransactionHandler(_x5, _x6) {
      return _deleteTransactionHandler.apply(this, arguments);
    }

    return deleteTransactionHandler;
  }(),
  detailTransactionHandler: function () {
    var _detailTransactionHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var transactionId, query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              transactionId = req.params.transactionId;
              _context4.next = 3;
              return DetailTransaction(transactionId);

            case 3:
              query = _context4.sent;

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
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function detailTransactionHandler(_x7, _x8) {
      return _detailTransactionHandler.apply(this, arguments);
    }

    return detailTransactionHandler;
  }(),
  listTransactionAdminHandler: function () {
    var _listTransactionAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var query;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return ListTransactionAdmin();

            case 2:
              query = _context5.sent;

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

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function listTransactionAdminHandler(_x9, _x10) {
      return _listTransactionAdminHandler.apply(this, arguments);
    }

    return listTransactionAdminHandler;
  }(),
  listTransactionUserHandler: function () {
    var _listTransactionUserHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var userId, query;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = req.userId;
              _context6.next = 3;
              return ListTransactionUser(userId);

            case 3:
              query = _context6.sent;

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
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function listTransactionUserHandler(_x11, _x12) {
      return _listTransactionUserHandler.apply(this, arguments);
    }

    return listTransactionUserHandler;
  }(),
  rejectTransactionHandler: function () {
    var _rejectTransactionHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var validationError, transactionId, reason, adminId, data, query;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context7.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context7.next = 11;
              break;

            case 5:
              transactionId = req.params.transactionId, reason = req.body.reason, adminId = req.adminId;
              data = {
                transactionId: transactionId,
                reason: reason
              };
              _context7.next = 9;
              return RejectTransaction(data, adminId);

            case 9:
              query = _context7.sent;

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

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function rejectTransactionHandler(_x13, _x14) {
      return _rejectTransactionHandler.apply(this, arguments);
    }

    return rejectTransactionHandler;
  }(),
  uploadPaymentHandler: function () {
    var _uploadPaymentHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var validationError, transactionId, image, data, query;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context8.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context8.next = 11;
              break;

            case 5:
              transactionId = req.params.transactionId, image = req.body.image;
              data = {
                image: image
              };
              _context8.next = 9;
              return UploadPayment(data, transactionId);

            case 9:
              query = _context8.sent;

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

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function uploadPaymentHandler(_x15, _x16) {
      return _uploadPaymentHandler.apply(this, arguments);
    }

    return uploadPaymentHandler;
  }()
};
exports.controller = controller;