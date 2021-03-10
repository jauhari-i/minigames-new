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

var _services$UserService = _services["default"].UserServices,
    DeleteUser = _services$UserService.DeleteUser,
    GetProfile = _services$UserService.GetProfile,
    ListUser = _services$UserService.ListUser,
    ListUserWeb = _services$UserService.ListUserWeb,
    UpdatePassword = _services$UserService.UpdatePassword,
    UpdateProfile = _services$UserService.UpdateProfile;
var controller = {
  deleteUser: function () {
    var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var id, query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = req.params.id;
              _context.next = 3;
              return DeleteUser(id);

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

    function deleteUser(_x, _x2) {
      return _deleteUser.apply(this, arguments);
    }

    return deleteUser;
  }(),
  getProfileUser: function () {
    var _getProfileUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var userId, query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = req.userId;
              _context2.next = 3;
              return GetProfile(userId);

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

    function getProfileUser(_x3, _x4) {
      return _getProfileUser.apply(this, arguments);
    }

    return getProfileUser;
  }(),
  listUserAdmin: function () {
    var _listUserAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return ListUser();

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

    function listUserAdmin(_x5, _x6) {
      return _listUserAdmin.apply(this, arguments);
    }

    return listUserAdmin;
  }(),
  listUserWeb: function () {
    var _listUserWeb = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return ListUserWeb();

            case 2:
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

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function listUserWeb(_x7, _x8) {
      return _listUserWeb.apply(this, arguments);
    }

    return listUserWeb;
  }(),
  updatePassword: function () {
    var _updatePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var userId, validationError, _req$body, oldPassword, newPassword, confirmPassword, payload, query;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = req.userId;
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context5.next = 6;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context5.next = 16;
              break;

            case 6:
              _req$body = req.body, oldPassword = _req$body.oldPassword, newPassword = _req$body.newPassword, confirmPassword = _req$body.confirmPassword;

              if (!(newPassword !== confirmPassword)) {
                _context5.next = 11;
                break;
              }

              (0, _error.handleError)({
                success: false,
                statusCode: 400,
                message: 'Password confirmation not match'
              }, res);
              _context5.next = 16;
              break;

            case 11:
              payload = {
                oldPassword: oldPassword,
                newPassword: newPassword
              };
              _context5.next = 14;
              return UpdatePassword(userId, payload);

            case 14:
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

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function updatePassword(_x9, _x10) {
      return _updatePassword.apply(this, arguments);
    }

    return updatePassword;
  }(),
  updateProfile: function () {
    var _updateProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var userId, validationError, _req$body2, name, userImage, city, province, birthday, phoneNumber, payload, query;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = req.userId;
              validationError = (0, _expressValidator.validationResult)(req);

              if (!validationError.errors.length) {
                _context6.next = 6;
                break;
              }

              (0, _error.handleError)({
                statusCode: 400,
                message: 'Input error',
                errors: validationError.errors
              }, res);
              _context6.next = 12;
              break;

            case 6:
              _req$body2 = req.body, name = _req$body2.name, userImage = _req$body2.userImage, city = _req$body2.city, province = _req$body2.province, birthday = _req$body2.birthday, phoneNumber = _req$body2.phoneNumber;
              payload = {
                name: name,
                userImage: userImage,
                city: city,
                province: province,
                birthday: birthday,
                phoneNumber: phoneNumber
              };
              _context6.next = 10;
              return UpdateProfile(userId, payload);

            case 10:
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

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function updateProfile(_x11, _x12) {
      return _updateProfile.apply(this, arguments);
    }

    return updateProfile;
  }()
};
exports.controller = controller;