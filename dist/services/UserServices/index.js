"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DeleteUser = _interopRequireDefault(require("./DeleteUser"));

var _GetProfile = _interopRequireDefault(require("./GetProfile"));

var _ListUserAdmin = _interopRequireDefault(require("./ListUserAdmin"));

var _ListUserWeb = _interopRequireDefault(require("./ListUserWeb"));

var _UpdatePassword = _interopRequireDefault(require("./UpdatePassword"));

var _UpdateProfile = _interopRequireDefault(require("./UpdateProfile"));

var UserServices = {
  DeleteUser: _DeleteUser["default"],
  GetProfile: _GetProfile["default"],
  ListUser: _ListUserAdmin["default"],
  ListUserWeb: _ListUserWeb["default"],
  UpdatePassword: _UpdatePassword["default"],
  UpdateProfile: _UpdateProfile["default"]
};
var _default = UserServices;
exports["default"] = _default;