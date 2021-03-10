"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteImage = exports.Uploader = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cloudinary = require("cloudinary");

var _global_config = require("../config/global_config");

var cloudinaryConfig = (0, _global_config.getConfig)('/cloudinaryConfig');

_cloudinary.v2.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret
});

var Uploader = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(imgstr) {
    var img;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _cloudinary.v2.uploader.upload(imgstr, {
              overwrite: true,
              invalidate: true
            });

          case 2:
            img = _context.sent;
            return _context.abrupt("return", img);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Uploader(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.Uploader = Uploader;

var DeleteImage = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(img) {
    var del;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _cloudinary.v2.uploader.destroy(img);

          case 2:
            del = _context2.sent;
            return _context2.abrupt("return", del);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function DeleteImage(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.DeleteImage = DeleteImage;