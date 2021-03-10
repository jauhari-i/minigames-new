"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Game = _interopRequireDefault(require("../../../models/Game"));

var _UploadImage = require("../../../middlewares/UploadImage");

var _validateUrl = require("../../../helpers/validateUrl");

var UpdateGame = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, id) {
    var title, poster, image, genre, price, discount, rating, description, difficulty, capacity, duration, url, ready, game, discountPrice, disc, posterImg, gameImg, deletePoster, deleteImg, doc, updateQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            title = data.title, poster = data.poster, image = data.image, genre = data.genre, price = data.price, discount = data.discount, rating = data.rating, description = data.description, difficulty = data.difficulty, capacity = data.capacity, duration = data.duration, url = data.url, ready = data.ready;
            _context.next = 4;
            return _Game["default"].findOne({
              gameId: id
            });

          case 4:
            game = _context.sent;

            if (game) {
              _context.next = 9;
              break;
            }

            throw {
              statusCode: 404,
              message: 'Game not found',
              success: false
            };

          case 9:
            if (discount > 0) {
              disc = price * (discount / 100);
              discountPrice = price - disc;
            } else {
              discountPrice = price;
            }

            if (!(0, _validateUrl.isValidURL)(poster)) {
              _context.next = 14;
              break;
            }

            posterImg = game.posterImage;
            _context.next = 24;
            break;

          case 14:
            _context.next = 16;
            return (0, _UploadImage.DeleteImage)(game.posterImage.public_id);

          case 16:
            deletePoster = _context.sent;

            if (!deletePoster) {
              _context.next = 23;
              break;
            }

            _context.next = 20;
            return (0, _UploadImage.Uploader)(poster);

          case 20:
            posterImg = _context.sent;
            _context.next = 24;
            break;

          case 23:
            posterImg = game.posterImage;

          case 24:
            if (!(0, _validateUrl.isValidURL)(image)) {
              _context.next = 28;
              break;
            }

            gameImg = game.gameImage;
            _context.next = 38;
            break;

          case 28:
            _context.next = 30;
            return (0, _UploadImage.DeleteImage)(game.gameImage.public_id);

          case 30:
            deleteImg = _context.sent;

            if (!deleteImg) {
              _context.next = 37;
              break;
            }

            _context.next = 34;
            return (0, _UploadImage.Uploader)(image);

          case 34:
            gameImg = _context.sent;
            _context.next = 38;
            break;

          case 37:
            gameImg = game.gameImage;

          case 38:
            doc = {
              gameTitle: title,
              posterImage: posterImg,
              gameImage: gameImg,
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
              gameReady: ready
            };
            _context.next = 41;
            return _Game["default"].updateOne({
              gameId: game.gameId
            }, doc);

          case 41:
            updateQuery = _context.sent;

            if (updateQuery) {
              _context.next = 46;
              break;
            }

            throw {
              success: false,
              statusCode: 500,
              message: 'Internal server error, failed to update game'
            };

          case 46:
            return _context.abrupt("return", {
              success: true,
              statusCode: 200,
              message: 'Update game success'
            });

          case 47:
            _context.next = 52;
            break;

          case 49:
            _context.prev = 49;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 49]]);
  }));

  return function UpdateGame(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = UpdateGame;
exports["default"] = _default;