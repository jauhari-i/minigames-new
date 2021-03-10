"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidURL = void 0;

/* eslint-disable no-useless-escape */
var isValidURL = function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return res !== null;
};

exports.isValidURL = isValidURL;