"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DeleteLeaderBoard = _interopRequireDefault(require("./DeleteLeaderBoard"));

var _GetLeaderBoardAdmin = _interopRequireDefault(require("./GetLeaderBoardAdmin"));

var _GetLeaderBoardUser = _interopRequireDefault(require("./GetLeaderBoardUser"));

var _JoinGame = _interopRequireDefault(require("./JoinGame"));

var _SaveGame = _interopRequireDefault(require("./SaveGame"));

var leaderBoardService = {
  DeleteLeaderboard: _DeleteLeaderBoard["default"],
  GetLeaderboardAdmin: _GetLeaderBoardAdmin["default"],
  GetLeaderboardUser: _GetLeaderBoardUser["default"],
  JoinGame: _JoinGame["default"],
  SaveGame: _SaveGame["default"]
};
var _default = leaderBoardService;
exports["default"] = _default;