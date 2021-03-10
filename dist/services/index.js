"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthServices = _interopRequireDefault(require("./AuthServices"));

var _UserServices = _interopRequireDefault(require("./UserServices"));

var _AdminServices = _interopRequireDefault(require("./AdminServices"));

var _GameServices = _interopRequireDefault(require("./GameServices"));

var _CartServices = _interopRequireDefault(require("./CartServices"));

var _TransactionServices = _interopRequireDefault(require("./TransactionServices"));

var _CodeServices = _interopRequireDefault(require("./CodeServices"));

var _DashboardServices = _interopRequireDefault(require("./DashboardServices"));

var _GameplayServices = _interopRequireDefault(require("./GameplayServices"));

var services = {
  AuthServices: _AuthServices["default"],
  UserServices: _UserServices["default"],
  AdminServices: _AdminServices["default"],
  GameServices: _GameServices["default"],
  CartServices: _CartServices["default"],
  TransactionServices: _TransactionServices["default"],
  CodeServices: _CodeServices["default"],
  DashboardServices: _DashboardServices["default"],
  LeaderboardServices: _GameplayServices["default"]
};
var _default = services;
exports["default"] = _default;