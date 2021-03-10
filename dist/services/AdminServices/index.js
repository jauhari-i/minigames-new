"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddAdmin = _interopRequireDefault(require("./AddAdmin"));

var _DeleteAdmin = _interopRequireDefault(require("./DeleteAdmin"));

var _GetListAdmin = _interopRequireDefault(require("./GetListAdmin"));

var _GetProfileAdmin = _interopRequireDefault(require("./GetProfileAdmin"));

var _UpdatePasswordAdmin = _interopRequireDefault(require("./UpdatePasswordAdmin"));

var _UpdateProfileAdmin = _interopRequireDefault(require("./UpdateProfileAdmin"));

var AdminServices = {
  AddAdmin: _AddAdmin["default"],
  DeleteAdmin: _DeleteAdmin["default"],
  GetListAdmin: _GetListAdmin["default"],
  GetProfileAdmin: _GetProfileAdmin["default"],
  UpdatePassword: _UpdatePasswordAdmin["default"],
  UpdateProfile: _UpdateProfileAdmin["default"]
};
var _default = AdminServices;
exports["default"] = _default;