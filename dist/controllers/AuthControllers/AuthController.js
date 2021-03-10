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

var _services$AuthService = _services["default"].AuthServices,
    RegisterUser = _services$AuthService.RegisterUser,
    LoginUser = _services$AuthService.LoginUser,
    VerifyUser = _services$AuthService.VerifyUser,
    RequestEmaillVerification = _services$AuthService.RequestEmaillVerification,
    LoginAdmin = _services$AuthService.LoginAdmin;
var controller = {
  registerUser: function () {
    var _registerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var validationError, _req$body, name, email, username, password, confirmPassword, query;

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
              _context.next = 14;
              break;

            case 5:
              _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password, confirmPassword = _req$body.confirmPassword;

              if (!(password !== confirmPassword)) {
                _context.next = 10;
                break;
              }

              (0, _error.handleError)({
                success: false,
                statusCode: 400,
                message: 'Password confirmation not match'
              }, res);
              _context.next = 14;
              break;

            case 10:
              _context.next = 12;
              return RegisterUser({
                name: name,
                email: email,
                username: username,
                password: password
              });

            case 12:
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

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function registerUser(_x, _x2) {
      return _registerUser.apply(this, arguments);
    }

    return registerUser;
  }(),
  loginUser: function () {
    var _loginUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var validationError, _req$body2, email, password, query;

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
              _context2.next = 10;
              break;

            case 5:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.next = 8;
              return LoginUser({
                email: email,
                password: password
              });

            case 8:
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

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function loginUser(_x3, _x4) {
      return _loginUser.apply(this, arguments);
    }

    return loginUser;
  }(),
  verifyUser: function () {
    var _verifyUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var token, query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              token = req.params.token;

              if (token) {
                _context3.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Token is missing'
              }, res);
              _context3.next = 9;
              break;

            case 5:
              _context3.next = 7;
              return VerifyUser(token);

            case 7:
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

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function verifyUser(_x5, _x6) {
      return _verifyUser.apply(this, arguments);
    }

    return verifyUser;
  }(),
  requestEmailVerification: function () {
    var _requestEmailVerification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var token, query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              token = req.params.token;

              if (token) {
                _context4.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Token is missing'
              }, res);
              _context4.next = 9;
              break;

            case 5:
              _context4.next = 7;
              return RequestEmaillVerification(token);

            case 7:
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

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function requestEmailVerification(_x7, _x8) {
      return _requestEmailVerification.apply(this, arguments);
    }

    return requestEmailVerification;
  }(),
  loginAdmin: function () {
    var _loginAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var validationError, _req$body3, email, password, query;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context5.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context5.next = 10;
              break;

            case 5:
              _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
              _context5.next = 8;
              return LoginAdmin({
                email: email,
                password: password
              });

            case 8:
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

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function loginAdmin(_x9, _x10) {
      return _loginAdmin.apply(this, arguments);
    }

    return loginAdmin;
  }()
};
exports.controller = controller;