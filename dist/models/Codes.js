"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var codeSchema = new _mongoose["default"].Schema({
  codeId: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  playingDate: {
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
  uniqueCode: {
    type: String,
    required: true,
    unique: true
  },
  codeMembers: {
    type: Array,
    required: true
  }
});
codeSchema.plugin(_mongooseTimestamp["default"]);

var Code = _mongoose["default"].model('code', codeSchema);

var _default = Code;
exports["default"] = _default;