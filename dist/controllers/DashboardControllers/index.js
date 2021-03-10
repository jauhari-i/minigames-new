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

var GetStatistic = _services["default"].DashboardServices.GetStatistic;
var controller = {
  getStatisticHandler: function () {
    var _getStatisticHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var adminId, roles, query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adminId = req.adminId, roles = req.roles;
              _context.next = 3;
              return GetStatistic(adminId, roles);

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

    function getStatisticHandler(_x, _x2) {
      return _getStatisticHandler.apply(this, arguments);
    }

    return getStatisticHandler;
  }()
};
exports.controller = controller;