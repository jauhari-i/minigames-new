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

var _services$GameService = _services["default"].GameServices,
    AddGame = _services$GameService.AddGame,
    DeleteGame = _services$GameService.DeleteGame,
    ListGameAdmin = _services$GameService.ListGameAdmin,
    DetailGame = _services$GameService.DetailGame,
    ActivateGame = _services$GameService.ActivateGame,
    UpdateGame = _services$GameService.UpdateGame,
    DisableGame = _services$GameService.DisableGame,
    ListGameUser = _services$GameService.ListGameUser,
    ListGameWeb = _services$GameService.ListGameWeb,
    DetailGameWeb = _services$GameService.DetailGameWeb;
var controller = {
  addGameHandler: function () {
    var _addGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var validationError, _req$body, title, poster, image, genre, price, discount, rating, description, difficulty, capacity, duration, url, ready, data, adminId, query;

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
              _req$body = req.body, title = _req$body.title, poster = _req$body.poster, image = _req$body.image, genre = _req$body.genre, price = _req$body.price, discount = _req$body.discount, rating = _req$body.rating, description = _req$body.description, difficulty = _req$body.difficulty, capacity = _req$body.capacity, duration = _req$body.duration, url = _req$body.url, ready = _req$body.ready;
              data = {
                title: title,
                poster: poster,
                image: image,
                genre: genre,
                price: price,
                discount: discount,
                rating: rating,
                description: description,
                difficulty: difficulty,
                capacity: capacity,
                duration: duration,
                url: url,
                ready: ready
              };
              adminId = req.adminId;
              _context.next = 10;
              return AddGame(data, adminId);

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

    function addGameHandler(_x, _x2) {
      return _addGameHandler.apply(this, arguments);
    }

    return addGameHandler;
  }(),
  deleteGameHandler: function () {
    var _deleteGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var gameId, query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              gameId = req.params.gameId;
              _context2.next = 3;
              return DeleteGame(gameId);

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

    function deleteGameHandler(_x3, _x4) {
      return _deleteGameHandler.apply(this, arguments);
    }

    return deleteGameHandler;
  }(),
  updateGameHandler: function () {
    var _updateGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var validationError, _req$body2, title, poster, image, genre, price, discount, rating, description, difficulty, capacity, duration, url, ready, data, gameId, query;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context3.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context3.next = 12;
              break;

            case 5:
              _req$body2 = req.body, title = _req$body2.title, poster = _req$body2.poster, image = _req$body2.image, genre = _req$body2.genre, price = _req$body2.price, discount = _req$body2.discount, rating = _req$body2.rating, description = _req$body2.description, difficulty = _req$body2.difficulty, capacity = _req$body2.capacity, duration = _req$body2.duration, url = _req$body2.url, ready = _req$body2.ready;
              data = {
                title: title,
                poster: poster,
                image: image,
                genre: genre,
                price: price,
                discount: discount,
                rating: rating,
                description: description,
                difficulty: difficulty,
                capacity: capacity,
                duration: duration,
                url: url,
                ready: ready
              };
              gameId = req.params.gameId;
              _context3.next = 10;
              return UpdateGame(data, gameId);

            case 10:
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

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function updateGameHandler(_x5, _x6) {
      return _updateGameHandler.apply(this, arguments);
    }

    return updateGameHandler;
  }(),
  detailGameHandler: function () {
    var _detailGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var gameId, query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              gameId = req.params.gameId;
              _context4.next = 3;
              return DetailGame(gameId);

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

    function detailGameHandler(_x7, _x8) {
      return _detailGameHandler.apply(this, arguments);
    }

    return detailGameHandler;
  }(),
  listGameAdminHandler: function () {
    var _listGameAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var query;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return ListGameAdmin();

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

    function listGameAdminHandler(_x9, _x10) {
      return _listGameAdminHandler.apply(this, arguments);
    }

    return listGameAdminHandler;
  }(),
  activateGameHandler: function () {
    var _activateGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var gameId, query;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              gameId = req.params.gameId;
              _context6.next = 3;
              return ActivateGame(gameId);

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

    function activateGameHandler(_x11, _x12) {
      return _activateGameHandler.apply(this, arguments);
    }

    return activateGameHandler;
  }(),
  disableGameHandler: function () {
    var _disableGameHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var gameId, query;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              gameId = req.params.gameId;
              _context7.next = 3;
              return DisableGame(gameId);

            case 3:
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

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function disableGameHandler(_x13, _x14) {
      return _disableGameHandler.apply(this, arguments);
    }

    return disableGameHandler;
  }(),
  listGameWebHandler: function () {
    var _listGameWebHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var userId, query;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = req.userId;
              _context8.next = 3;
              return ListGameWeb(userId);

            case 3:
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

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function listGameWebHandler(_x15, _x16) {
      return _listGameWebHandler.apply(this, arguments);
    }

    return listGameWebHandler;
  }(),
  listGameUserHandler: function () {
    var _listGameUserHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var userId, query;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              userId = req.userId;
              _context9.next = 3;
              return ListGameUser(userId);

            case 3:
              query = _context9.sent;

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
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function listGameUserHandler(_x17, _x18) {
      return _listGameUserHandler.apply(this, arguments);
    }

    return listGameUserHandler;
  }(),
  detailGameWebHandler: function () {
    var _detailGameWebHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var gameId, userId, query;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              gameId = req.params.gameId;
              userId = req.userId;
              _context10.next = 4;
              return DetailGameWeb(gameId, userId);

            case 4:
              query = _context10.sent;

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

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    function detailGameWebHandler(_x19, _x20) {
      return _detailGameWebHandler.apply(this, arguments);
    }

    return detailGameWebHandler;
  }()
};
exports.controller = controller;