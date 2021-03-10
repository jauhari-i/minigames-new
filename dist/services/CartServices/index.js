"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddToCart = _interopRequireDefault(require("./AddToCart"));

var _GetCart = _interopRequireDefault(require("./GetCart"));

var _RemoveFromCart = _interopRequireDefault(require("./RemoveFromCart"));

var cartServices = {
  AddToCart: _AddToCart["default"],
  GetCart: _GetCart["default"],
  RemoveFromCart: _RemoveFromCart["default"]
};
var _default = cartServices;
exports["default"] = _default;