"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var myGameSchema = new _mongoose["default"].Schema({
  myGameId: {
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
  isExpired: {
    type: Boolean,
    required: true,
    "default": false
  },
  isPlayed: {
    type: Boolean,
    "default": false,
    required: true
  },
  lastPlayedDate: {
    type: Date
  },
  lastPlayer: {
    type: String
  },
  codeId: {
    type: String,
    required: true
  }
});
myGameSchema.plugin(_mongooseTimestamp["default"]);

var MyGame = _mongoose["default"].model('mygame', myGameSchema);

var _default = MyGame;
exports["default"] = _default;