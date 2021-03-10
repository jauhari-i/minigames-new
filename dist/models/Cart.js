"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var cartSchema = new _mongoose["default"].Schema({
  cartId: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    "default": []
  },
  total: {
    type: Number,
    "default": 0
  },
  userId: {
    type: String,
    required: true
  }
});
cartSchema.plugin(_mongooseTimestamp["default"]);

var Cart = _mongoose["default"].model('cart', cartSchema);

var _default = Cart;
exports["default"] = _default;