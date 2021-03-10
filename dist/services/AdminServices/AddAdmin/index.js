"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uuid = require("uuid");

var _defaultImage = require("../../../constants/defaultImage");

var _UploadImage = require("../../../middlewares/UploadImage");

var AddAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var name, email, password, encryptedPassword, img, newAdmin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = data.name, email = data.email, password = data.password;
            _context.prev = 1;
            _context.next = 4;
            return _bcryptjs["default"].hash(password, 10);

          case 4:
            encryptedPassword = _context.sent;
            _context.next = 7;
            return (0, _UploadImage.Uploader)(_defaultImage.defaultImage);

          case 7:
            img = _context.sent;

            if (encryptedPassword) {
              _context.next = 12;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, Failed to secure password'
            };

          case 12:
            _context.next = 14;
            return _Admin["default"].create({
              adminId: (0, _uuid.v4)(),
              adminName: name,
              adminEmail: email,
              adminImage: img,
              adminPassword: encryptedPassword
            });

          case 14:
            newAdmin = _context.sent;

            if (!newAdmin) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 201,
              message: 'Register admin success!',
              data: {
                adminId: newAdmin.adminId,
                adminName: newAdmin.adminName,
                adminEmail: newAdmin.adminEmail,
                adminImage: newAdmin.adminImage.secure_url,
                createdAt: newAdmin.createdAt
              }
            });

          case 19:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, Failed to register admin'
            };

          case 20:
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 22]]);
  }));

  return function AddAdmin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = AddAdmin;
exports["default"] = _default;