"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var adminSchema = new _mongoose["default"].Schema({
  adminId: {
    type: String,
    required: true
  },
  adminName: {
    type: String,
    required: true
  },
  adminEmail: {
    type: String,
    unique: true,
    required: true
  },
  adminPassword: {
    type: String,
    required: true
  },
  adminImage: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    "default": 0
  },
  lastLogin: {
    type: Date
  }
});
adminSchema.plugin(_mongooseTimestamp["default"]);

var Admin = _mongoose["default"].model('admin', adminSchema);

var _default = Admin;
exports["default"] = _default;