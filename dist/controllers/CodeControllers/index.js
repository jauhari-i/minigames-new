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

var _services$CodeService = _services["default"].CodeServices,
    GenerateNewCode = _services$CodeService.GenerateNewCode,
    ListCodes = _services$CodeService.ListCodes;
var controller = {
  generateCodeHandler: function () {
    var _generateCodeHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var codeId, validationError, _req$body, playDate, time, payload, query;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              codeId = req.params.codeId;
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context.next = 6;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context.next = 12;
              break;

            case 6:
              _req$body = req.body, playDate = _req$body.playDate, time = _req$body.time;
              payload = {
                playDate: playDate,
                time: time
              };
              _context.next = 10;
              return GenerateNewCode(codeId, payload);

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

    function generateCodeHandler(_x, _x2) {
      return _generateCodeHandler.apply(this, arguments);
    }

    return generateCodeHandler;
  }(),
  listCodeHandler: function () {
    var _listCodeHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return ListCodes();

            case 2:
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

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function listCodeHandler(_x3, _x4) {
      return _listCodeHandler.apply(this, arguments);
    }

    return listCodeHandler;
  }()
};
exports.controller = controller;