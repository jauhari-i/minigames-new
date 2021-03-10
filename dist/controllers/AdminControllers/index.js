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

var _services$AdminServic = _services["default"].AdminServices,
    AddAdmin = _services$AdminServic.AddAdmin,
    DeleteAdmin = _services$AdminServic.DeleteAdmin,
    GetListAdmin = _services$AdminServic.GetListAdmin,
    GetProfileAdmin = _services$AdminServic.GetProfileAdmin,
    UpdatePassword = _services$AdminServic.UpdatePassword,
    UpdateProfile = _services$AdminServic.UpdateProfile;
var controller = {
  addAdminHandler: function () {
    var _addAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var validationError, _req$body, name, email, password, data, query;

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
              _context.next = 11;
              break;

            case 5:
              _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
              data = {
                name: name,
                email: email,
                password: password
              };
              _context.next = 9;
              return AddAdmin(data);

            case 9:
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

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function addAdminHandler(_x, _x2) {
      return _addAdminHandler.apply(this, arguments);
    }

    return addAdminHandler;
  }(),
  deleteAdminHandler: function () {
    var _deleteAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var adminId, query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adminId = req.params.adminId;

              if (adminId) {
                _context2.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Id is not valid',
                success: false
              }, res);
              _context2.next = 9;
              break;

            case 5:
              _context2.next = 7;
              return DeleteAdmin(adminId);

            case 7:
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

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function deleteAdminHandler(_x3, _x4) {
      return _deleteAdminHandler.apply(this, arguments);
    }

    return deleteAdminHandler;
  }(),
  listAdminHandler: function () {
    var _listAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return GetListAdmin();

            case 2:
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

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function listAdminHandler(_x5, _x6) {
      return _listAdminHandler.apply(this, arguments);
    }

    return listAdminHandler;
  }(),
  profileAdminHandler: function () {
    var _profileAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var adminId, query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adminId = req.adminId;

              if (adminId) {
                _context4.next = 5;
                break;
              }

              (0, _error.handleError)({
                success: false,
                statusCode: 401,
                message: 'Unauhtorized'
              }, res);
              _context4.next = 9;
              break;

            case 5:
              _context4.next = 7;
              return GetProfileAdmin(adminId);

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

    function profileAdminHandler(_x7, _x8) {
      return _profileAdminHandler.apply(this, arguments);
    }

    return profileAdminHandler;
  }(),
  detailAdminHandler: function () {
    var _detailAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var adminId, query;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              adminId = req.params.adminId;

              if (adminId) {
                _context5.next = 5;
                break;
              }

              (0, _error.handleError)({
                success: false,
                statusCode: 400,
                message: 'Invalid id provided'
              }, res);
              _context5.next = 9;
              break;

            case 5:
              _context5.next = 7;
              return GetProfileAdmin(adminId);

            case 7:
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

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function detailAdminHandler(_x9, _x10) {
      return _detailAdminHandler.apply(this, arguments);
    }

    return detailAdminHandler;
  }(),
  updatePasswordHandler: function () {
    var _updatePasswordHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var validationError, _req$body2, oldPassword, newPassword, confirmPassword, adminId, data, query;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context6.next = 5;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context6.next = 13;
              break;

            case 5:
              _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword, confirmPassword = _req$body2.confirmPassword;
              adminId = req.adminId;

              if (newPassword !== confirmPassword) {
                (0, _error.handleError)({
                  statusCode: 400,
                  message: 'Password confirmation not same'
                }, res);
              }

              data = {
                oldPassword: oldPassword,
                password: newPassword
              };
              _context6.next = 11;
              return UpdatePassword(adminId, data);

            case 11:
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

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function updatePasswordHandler(_x11, _x12) {
      return _updatePasswordHandler.apply(this, arguments);
    }

    return updatePasswordHandler;
  }(),
  updateProfileHandler: function () {
    var _updateProfileHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var validationError, _req$body3, name, image, data, adminId, query;

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
              _context7.next = 12;
              break;

            case 5:
              _req$body3 = req.body, name = _req$body3.name, image = _req$body3.image;
              data = {
                name: name,
                image: image
              };
              adminId = req.adminId;
              _context7.next = 10;
              return UpdateProfile(adminId, data);

            case 10:
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

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function updateProfileHandler(_x13, _x14) {
      return _updateProfileHandler.apply(this, arguments);
    }

    return updateProfileHandler;
  }(),
  updateAdminHandler: function () {
    var _updateAdminHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var validationError, _req$body4, name, image, data, adminId, query;

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
              _context8.next = 12;
              break;

            case 5:
              _req$body4 = req.body, name = _req$body4.name, image = _req$body4.image;
              data = {
                name: name,
                image: image
              };
              adminId = req.params.adminId;
              _context8.next = 10;
              return UpdateProfile(adminId, data);

            case 10:
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

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function updateAdminHandler(_x15, _x16) {
      return _updateAdminHandler.apply(this, arguments);
    }

    return updateAdminHandler;
  }()
};
exports.controller = controller;