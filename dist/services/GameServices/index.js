"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddGame = _interopRequireDefault(require("./AddGame"));

var _DeleteGame = _interopRequireDefault(require("./DeleteGame"));

var _ListGameAdmin = _interopRequireDefault(require("./ListGameAdmin"));

var _ListGameWeb = _interopRequireDefault(require("./ListGameWeb"));

var _ListUserGame = _interopRequireDefault(require("./ListUserGame"));

var _UpdateGame = _interopRequireDefault(require("./UpdateGame"));

var _ActivateGame = _interopRequireDefault(require("./ActivateGame"));

var _DetailGame = _interopRequireDefault(require("./DetailGame"));

var _DisableGame = _interopRequireDefault(require("./DisableGame"));

var _DetailGameWeb = _interopRequireDefault(require("./DetailGameWeb"));

var GameServices = {
  AddGame: _AddGame["default"],
  DeleteGame: _DeleteGame["default"],
  ListGameAdmin: _ListGameAdmin["default"],
  ListGameWeb: _ListGameWeb["default"],
  ListGameUser: _ListUserGame["default"],
  UpdateGame: _UpdateGame["default"],
  ActivateGame: _ActivateGame["default"],
  DetailGame: _DetailGame["default"],
  DisableGame: _DisableGame["default"],
  DetailGameWeb: _DetailGameWeb["default"]
};
var _default = GameServices;
exports["default"] = _default;