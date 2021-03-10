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

var _services$Leaderboard = _services["default"].LeaderboardServices,
    DeleteLeaderboard = _services$Leaderboard.DeleteLeaderboard,
    GetLeaderboardAdmin = _services$Leaderboard.GetLeaderboardAdmin,
    GetLeaderboardUser = _services$Leaderboard.GetLeaderboardUser,
    JoinGame = _services$Leaderboard.JoinGame,
    SaveGame = _services$Leaderboard.SaveGame;
var controller = {
  deleteLeaderboardHandler: function () {
    var _deleteLeaderboardHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var leaderboardId, query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              leaderboardId = req.params.leaderboardId;
              _context.next = 3;
              return DeleteLeaderboard(leaderboardId);

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

    function deleteLeaderboardHandler(_x, _x2) {
      return _deleteLeaderboardHandler.apply(this, arguments);
    }

    return deleteLeaderboardHandler;
  }(),
  getLeaderboardAdminHandler: function () {
    var _getLeaderboardAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$params$sort, sort, query;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$params$sort = req.params.sort, sort = _req$params$sort === void 0 ? 'score' : _req$params$sort;
              _context2.next = 3;
              return GetLeaderboardAdmin(sort);

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

    function getLeaderboardAdminHandler(_x3, _x4) {
      return _getLeaderboardAdminHandler.apply(this, arguments);
    }

    return getLeaderboardAdminHandler;
  }(),
  getLeaderboardUserHandler: function () {
    var _getLeaderboardUserHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var _req$params, _req$params$sort2, sort, gameId, query;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$params = req.params, _req$params$sort2 = _req$params.sort, sort = _req$params$sort2 === void 0 ? 'score' : _req$params$sort2, gameId = _req$params.gameId;
              _context3.next = 3;
              return GetLeaderboardUser(gameId, sort);

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

    function getLeaderboardUserHandler(_x5, _x6) {
      return _getLeaderboardUserHandler.apply(this, arguments);
    }

    return getLeaderboardUserHandler;
  }(),
  joinGameHandler: function () {
    var _joinGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var validationError, code, userId, query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context4.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context4.next = 10;
              break;

            case 5:
              code = req.body.code, userId = req.userId;
              _context4.next = 8;
              return JoinGame(code, userId);

            case 8:
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

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function joinGameHandler(_x7, _x8) {
      return _joinGameHandler.apply(this, arguments);
    }

    return joinGameHandler;
  }(),
  saveGameHandler: function () {
    var _saveGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var validationError, _req$body, codeId, time, teamName, teamIcon, uniqueCode, userId, query;

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
              _req$body = req.body, codeId = _req$body.codeId, time = _req$body.time, teamName = _req$body.teamName, teamIcon = _req$body.teamIcon, uniqueCode = _req$body.uniqueCode, userId = req.userId;
              _context5.next = 8;
              return SaveGame(codeId, uniqueCode, time, teamName, teamIcon, userId);

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

    function saveGameHandler(_x9, _x10) {
      return _saveGameHandler.apply(this, arguments);
    }

    return saveGameHandler;
  }()
};
exports.controller = controller;