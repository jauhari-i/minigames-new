"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _Admin = _interopRequireDefault(require("../../../models/Admin"));

var _uuid = require("uuid");

var _UploadImage = require("../../../middlewares/UploadImage");

var AddGame = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, adminId) {
    var title, poster, image, genre, price, discount, rating, description, difficulty, capacity, duration, url, ready, admin, discountPrice, disc, img, posterImg, doc, newGame;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            title = data.title, poster = data.poster, image = data.image, genre = data.genre, price = data.price, discount = data.discount, rating = data.rating, description = data.description, difficulty = data.difficulty, capacity = data.capacity, duration = data.duration, url = data.url, ready = data.ready;
            _context.next = 4;
            return _Admin["default"].findOne({
              adminId: adminId
            });

          case 4:
            admin = _context.sent;

            if (admin) {
              _context.next = 9;
              break;
            }

            throw {
              success: false,
              statusCode: 403,
              message: 'This action is restricted'
            };

          case 9:
            if (discount > 0) {
              disc = price * (discount / 100);
              discountPrice = price - disc;
            } else {
              discountPrice = price;
            }

            _context.next = 12;
            return (0, _UploadImage.Uploader)(image);

          case 12:
            img = _context.sent;
            _context.next = 15;
            return (0, _UploadImage.Uploader)(poster);

          case 15:
            posterImg = _context.sent;
            doc = {
              gameId: (0, _uuid.v4)(),
              gameTitle: title,
              posterImage: posterImg,
              gameImage: img,
              gameDescription: description,
              gamePrice: price,
              gameDiscount: discount ? discount : 0,
              gamePriceAfterDiscount: discountPrice,
              gameDifficulty: difficulty,
              gameRating: rating,
              gameGenre: genre,
              gameDuration: duration,
              gameUrl: url,
              gameCapacity: capacity,
              gameReady: ready,
              createdBy: {
                name: admin.adminName,
                adminId: admin.adminId
              }
            };
            _context.next = 19;
            return _Game["default"].create(doc);

          case 19:
            newGame = _context.sent;

            if (!newGame) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              message: 'Create game success',
              statusCode: 201,
              data: {
                gameId: newGame.gameId
              }
            });

          case 24:
            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to create game'
            };

          case 25:
            _context.next = 32;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](0);

            if (_context.t0.statusCode) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", {
              success: false,
              statusCode: 500,
              message: _context.t0.message
            });

          case 31:
            return _context.abrupt("return", _context.t0);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 27]]);
  }));

  return function AddGame(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = AddGame;
exports["default"] = _default;