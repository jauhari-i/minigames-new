"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RegisterUser = _interopRequireDefault(require("./RegisterUser"));

var _LoginUser = _interopRequireDefault(require("./LoginUser"));

var _VerifyUser = _interopRequireDefault(require("./VerifyUser"));

var _RequestEmailVerification = _interopRequireDefault(require("./RequestEmailVerification"));

var _LoginAdmin = _interopRequireDefault(require("./LoginAdmin"));

var AuthServices = {
  RegisterUser: _RegisterUser["default"],
  LoginUser: _LoginUser["default"],
  VerifyUser: _VerifyUser["default"],
  RequestEmaillVerification: _RequestEmailVerification["default"],
  LoginAdmin: _LoginAdmin["default"]
};
var _default = AuthServices;
exports["default"] = _default;