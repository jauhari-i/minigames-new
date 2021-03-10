"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressBasicAuth = _interopRequireDefault(require("express-basic-auth"));

var _global_config = require("../config/global_config");

var app = (0, _express["default"])();
exports.app = app;
var basicAuthInstance = (0, _global_config.getConfig)('/basicAuthApi');
app.use((0, _expressBasicAuth["default"])({
  authorizer: function authorizer(username, password) {
    var userMatches = _expressBasicAuth["default"].safeCompare(username, basicAuthInstance[0].username);

    var passwordMatches = _expressBasicAuth["default"].safeCompare(password, basicAuthInstance[0].password);

    return userMatches & passwordMatches;
  },
  challenge: true
}));