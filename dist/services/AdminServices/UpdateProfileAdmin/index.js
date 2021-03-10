"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var _UploadImage = require("../../../middlewares/UploadImage");

var _validateUrl = require("../../../helpers/validateUrl");

var UpdateAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, data) {
    var name, image, admin, img, deleteImage, updateQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = data.name, image = data.image;
            _context.prev = 1;
            _context.next = 4;
            return _Admin["default"].findOne({
              adminId: id
            });

          case 4:
            admin = _context.sent;

            if (admin) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'Id admin not found'
            };

          case 9:
            if (!(0, _validateUrl.isValidURL)(image)) {
              _context.next = 13;
              break;
            }

            img = admin.adminImage;
            _context.next = 23;
            break;

          case 13:
            _context.next = 15;
            return (0, _UploadImage.DeleteImage)(admin.adminImage.public_id);

          case 15:
            deleteImage = _context.sent;

            if (!deleteImage.result) {
              _context.next = 22;
              break;
            }

            _context.next = 19;
            return (0, _UploadImage.Uploader)(image);

          case 19:
            img = _context.sent;
            _context.next = 23;
            break;

          case 22:
            img = admin.adminImage;

          case 23:
            _context.next = 25;
            return _Admin["default"].updateOne({
              adminId: admin.adminId
            }, {
              adminName: name,
              adminImage: img
            });

          case 25:
            updateQuery = _context.sent;

            if (!updateQuery) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Update profile success'
            });

          case 30:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to update admin'
            };

          case 31:
            _context.next = 36;
            break;

          case 33:
            _context.prev = 33;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 33]]);
  }));

  return function UpdateAdmin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = UpdateAdmin;
exports["default"] = _default;