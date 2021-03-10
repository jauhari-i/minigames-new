"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userImage: {
    type: Object,
    required: true
  },
  isVerified: {
    type: Boolean,
    "default": false
  },
  verifiedAt: {
    type: Date
  },
  city: {
    type: String,
    "default": ''
  },
  province: {
    type: String,
    "default": ''
  },
  birthday: {
    type: Date
  },
  online: {
    type: Boolean,
    "default": false
  },
  phoneNumber: {
    type: String,
    "default": ''
  },
  lastLogin: {
    type: Date
  }
});
userSchema.plugin(_mongooseTimestamp["default"]);

var Users = _mongoose["default"].model('user', userSchema);

var _default = Users;
exports["default"] = _default;