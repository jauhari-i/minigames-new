"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var leaderboardSchema = new _mongoose["default"].Schema({
  leaderboardId: {
    type: String,
    "default": '',
    required: true
  },
  teamLeaderName: {
    type: String,
    "default": '',
    required: true
  },
  teamName: {
    type: String,
    "default": '',
    required: true
  },
  teamIcon: {
    type: String,
    "default": '',
    required: true
  },
  myGameId: {
    type: String,
    "default": '',
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    "default": 0,
    required: true
  },
  score: {
    type: Number,
    "default": 0,
    required: true
  }
});
leaderboardSchema.plugin(_mongooseTimestamp["default"]);

var Leaderboard = _mongoose["default"].model('leaderboard', leaderboardSchema);

var _default = Leaderboard;
exports["default"] = _default;