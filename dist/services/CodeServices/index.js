"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _GenerateNewCode = _interopRequireDefault(require("./GenerateNewCode"));

var _ListCodes = _interopRequireDefault(require("./ListCodes"));

var CodeServices = {
  GenerateNewCode: _GenerateNewCode["default"],
  ListCodes: _ListCodes["default"]
};
var _default = CodeServices;
exports["default"] = _default;