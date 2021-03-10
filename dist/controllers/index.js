"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthController = require("./AuthControllers/AuthController");

var _UserController = require("./UserControllers/UserController");

var _GameControllers = require("./GameControllers");

var _AdminControllers = require("./AdminControllers");

var _CartControllers = require("./CartControllers");

var _TransactionControllers = require("./TransactionControllers");

var _CodeControllers = require("./CodeControllers");

var _DashboardControllers = require("./DashboardControllers");

var _LeaderboardControllers = require("./LeaderboardControllers");

var controllers = {
  AuthController: _AuthController.controller,
  UserController: _UserController.controller,
  GameController: _GameControllers.controller,
  AdminController: _AdminControllers.controller,
  CartController: _CartControllers.controller,
  TransactionController: _TransactionControllers.controller,
  CodeController: _CodeControllers.controller,
  DashboardController: _DashboardControllers.controller,
  LeaderboardController: _LeaderboardControllers.controller
};
var _default = controllers;
exports["default"] = _default;