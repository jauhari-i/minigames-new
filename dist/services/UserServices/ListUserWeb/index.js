"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var ListWeb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user, dataUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Users["default"].find();

          case 3:
            user = _context.sent;

            if (!(user.length === 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get user web success',
              data: user
            });

          case 8:
            dataUser = user.map(function (item) {
              return {
                userId: item.userId,
                name: item.name,
                username: item.username,
                userImage: item.userImage.secure_url
              };
            });
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Get user web success',
              data: dataUser
            });

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function ListWeb() {
    return _ref.apply(this, arguments);
  };
}();

var _default = ListWeb;
exports["default"] = _default;