"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTokenSuperAdmin = exports.verifyTokenAdmin = exports.verifyToken = exports.getToken = exports.generateToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _global_config = require("../config/global_config");

var _error = require("../helpers/error");

var jwt = _jsonwebtoken["default"];

var getKey = function getKey(keyPath) {
  return _fs["default"].readFileSync(keyPath, 'utf-8');
};

var generateToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var privateKey, verifyOptions, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            privateKey = getKey((0, _global_config.getConfig)('/privateKey'));
            verifyOptions = {
              algorithm: 'RS256',
              expiresIn: '24h'
            };
            _context.next = 4;
            return jwt.sign(payload, privateKey, verifyOptions);

          case 4:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;

var getToken = function getToken(headers) {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    var parted = headers.authorization.split(' ');

    if (parted.length === 2) {
      return parted[1];
    }
  }

  return undefined;
};

exports.getToken = getToken;

var verifyToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var publicKey, verifyOptions, token, decodedToken, userId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            publicKey = _fs["default"].readFileSync((0, _global_config.getConfig)('/publicKey'), 'utf8');
            verifyOptions = {
              algorithm: 'RS256'
            };
            token = getToken(req.headers);

            if (token) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }, res));

          case 5:
            _context2.prev = 5;
            _context2.next = 8;
            return jwt.verify(token, publicKey, verifyOptions);

          case 8:
            decodedToken = _context2.sent;
            _context2.next = 16;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](5);

            if (!(_context2.t0 instanceof jwt.TokenExpiredError)) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Access token expired!'
            }, res));

          case 15:
            return _context2.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }, res));

          case 16:
            if (!(decodedToken.role !== 0)) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", (0, _error.handleError)({
              statusCode: 403,
              message: 'Access Denied!'
            }, res));

          case 20:
            userId = decodedToken.sub;
            req.userId = userId;
            next();

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 11]]);
  }));

  return function verifyToken(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var verifyTokenAdmin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var publicKey, verifyOptions, token, decodedToken, adminId;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            publicKey = _fs["default"].readFileSync((0, _global_config.getConfig)('/publicKey'), 'utf8');
            verifyOptions = {
              algorithm: 'RS256'
            };
            token = getToken(req.headers);

            if (token) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }, res));

          case 5:
            _context3.prev = 5;
            _context3.next = 8;
            return jwt.verify(token, publicKey, verifyOptions);

          case 8:
            decodedToken = _context3.sent;
            _context3.next = 16;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](5);

            if (!(_context3.t0 instanceof jwt.TokenExpiredError)) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Access token expired!'
            }, res));

          case 15:
            return _context3.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }, res));

          case 16:
            if (!(decodedToken.role === 0)) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt("return", (0, _error.handleError)({
              statusCode: 403,
              message: 'Access Denied!'
            }, res));

          case 20:
            adminId = decodedToken.sub;
            req.adminId = adminId;
            next();

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 11]]);
  }));

  return function verifyTokenAdmin(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verifyTokenAdmin = verifyTokenAdmin;

var verifyTokenSuperAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var publicKey, verifyOptions, token, decodedToken, adminId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            publicKey = _fs["default"].readFileSync((0, _global_config.getConfig)('/publicKey'), 'utf8');
            verifyOptions = {
              algorithm: 'RS256'
            };
            token = getToken(req.headers);

            if (token) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }, res));

          case 5:
            _context4.prev = 5;
            _context4.next = 8;
            return jwt.verify(token, publicKey, verifyOptions);

          case 8:
            decodedToken = _context4.sent;
            _context4.next = 16;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](5);

            if (!(_context4.t0 instanceof jwt.TokenExpiredError)) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Access token expired!'
            }, res));

          case 15:
            return _context4.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }, res));

          case 16:
            if (!(decodedToken.role !== 2)) {
              _context4.next = 20;
              break;
            }

            return _context4.abrupt("return", (0, _error.handleError)({
              statusCode: 403,
              message: 'Access Denied!'
            }, res));

          case 20:
            adminId = decodedToken.sub;
            req.adminId = adminId;
            next();

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 11]]);
  }));

  return function verifyTokenSuperAdmin(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.verifyTokenSuperAdmin = verifyTokenSuperAdmin;