"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _api = require("./api");

var router = _express["default"].Router();

exports.router = router;
router.get('/', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../public/index.html'));
});
router.use('/api', _api.router);