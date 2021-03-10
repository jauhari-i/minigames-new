"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../../../models/Users"));

var _UploadImage = require("../../../middlewares/UploadImage");

var _validateUrl = require("../../../helpers/validateUrl");

var UpdateProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, data) {
    var name, userImage, city, province, birthday, phoneNumber, user, img, deleteImage, updateQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = data.name, userImage = data.userImage, city = data.city, province = data.province, birthday = data.birthday, phoneNumber = data.phoneNumber;
            _context.prev = 1;
            _context.next = 4;
            return _Users["default"].findOne({
              userId: id
            });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 404,
              message: 'User not found'
            };

          case 9:
            if (!(0, _validateUrl.isValidURL)(userImage)) {
              _context.next = 13;
              break;
            }

            img = user.userImage;
            _context.next = 23;
            break;

          case 13:
            _context.next = 15;
            return (0, _UploadImage.DeleteImage)(user.userImage.public_id);

          case 15:
            deleteImage = _context.sent;

            if (!deleteImage.result) {
              _context.next = 22;
              break;
            }

            _context.next = 19;
            return (0, _UploadImage.Uploader)(userImage);

          case 19:
            img = _context.sent;
            _context.next = 23;
            break;

          case 22:
            img = user.userImage;

          case 23:
            _context.next = 25;
            return _Users["default"].updateOne({
              userId: user.userId
            }, {
              name: name,
              userImage: img,
              city: city,
              province: province,
              birthday: birthday,
              phoneNumber: phoneNumber
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
              message: 'Update user success'
            });

          case 30:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to update user'
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

  return function UpdateProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = UpdateProfile;
exports["default"] = _default;