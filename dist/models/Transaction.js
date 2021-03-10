"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var transactionSchema = new _mongoose["default"].Schema({
  transactionId: {
    type: String,
    required: true
  },
  transactionItems: {
    type: Array
  },
  transactionTotal: {
    type: Number,
    "default": 0
  },
  transactionStatus: {
    type: Number,
    "default": 0
  },
  transactionImage: {
    type: Object,
    "default": {}
  },
  paymentToken: {
    type: String
  },
  isExpired: {
    type: Boolean,
    "default": false
  },
  isRejected: {
    type: Boolean,
    "default": false
  },
  rejectedReason: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  adminId: {
    type: String
  }
});
transactionSchema.plugin(_mongooseTimestamp["default"]);

var Transaction = _mongoose["default"].model('transaction', transactionSchema);

var _default = Transaction;
exports["default"] = _default;