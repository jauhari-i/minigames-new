"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeEnd = exports.getTimeStart = exports.timeArray = void 0;
var timeArray = [9, 12, 15, 19];
exports.timeArray = timeArray;

var getTimeStart = function getTimeStart(t) {
  var tIndex = t - 1;
  return timeArray[tIndex];
};

exports.getTimeStart = getTimeStart;

var getTimeEnd = function getTimeEnd(t, d) {
  var tIndex = t - 1;
  var timeUser = timeArray[tIndex];
  var hDuration = d / 60;
  return timeUser + hDuration;
};

exports.getTimeEnd = getTimeEnd;