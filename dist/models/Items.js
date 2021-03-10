"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var itemSchema = new _mongoose["default"].Schema({
  itemId: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  datePlay: {
    type: Date,
    required: true
  },
  timeStart: {
    type: Number,
    required: true
  },
  timeEnd: {
    type: Number,
    required: true
  },
  itemMembers: {
    type: Array,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  }
});
itemSchema.plugin(_mongooseTimestamp["default"]);

var Items = _mongoose["default"].model('item', itemSchema);

var _default = Items;
exports["default"] = _default;