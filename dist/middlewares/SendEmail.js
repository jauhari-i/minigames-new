"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendVerificationEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _configureNodeMailer = require("../config/configureNodeMailer");

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _path = _interopRequireDefault(require("path"));

var _global_config = require("../config/global_config");

var readHtmlFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
    var html;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            html = _fs["default"].readFileSync(path, 'utf-8');

            if (html) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", false);

          case 3:
            return _context.abrupt("return", html);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readHtmlFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

var mode = (0, _global_config.getConfig)('/mode');

var sendVerificationEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, token) {
    var file, template, data, localData, htmlToSend, mailOptions, send;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readHtmlFile(_path["default"].join(__dirname, '../public/verificationEmail.html'));

          case 2:
            file = _context2.sent;

            if (file) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", false);

          case 7:
            template = _handlebars["default"].compile(file);
            data = {
              token: token,
              email: email,
              link: 'https://minigames.tranceformasiindonesia.com/verification?token=' + token,
              linkRequest: 'https://minigames.tranceformasiindonesia.com/verification?token=' + token + '&request=true'
            };
            localData = {
              token: token,
              email: email,
              link: 'http://localhost:9000/api/user/verify/' + token,
              linkRequest: 'http://localhost:9000/api/user/request' + token
            };
            htmlToSend = template(mode === 'dev' ? localData : data);
            mailOptions = {
              from: "\"Minigames Infiniteroom\" <minigames@tranceformasiindonesia.com>",
              to: email,
              subject: 'Account Verification',
              html: htmlToSend
            };
            _context2.next = 14;
            return _configureNodeMailer.transporter.sendMail(mailOptions);

          case 14:
            send = _context2.sent;

            if (!send) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt("return", send);

          case 19:
            return _context2.abrupt("return", false);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendVerificationEmail(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendVerificationEmail = sendVerificationEmail;