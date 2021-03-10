"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConfigureApp;

var bodyParser = _interopRequireWildcard(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _winston = _interopRequireDefault(require("winston"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = require("../routes");

function ConfigureApp(app) {
  var logger = _winston["default"].createLogger({
    level: 'info',
    format: _winston["default"].format.json(),
    defaultMeta: {
      service: 'user-service'
    },
    exitOnError: false,
    transports: [new _winston["default"].transports.Console()]
  });

  logger.stream = {
    write: function write(message) {
      logger.info(message.replace(/\n$/, ''));
    }
  };
  app.use((0, _cors["default"])());
  app.use(bodyParser.json({
    limit: '50mb'
  }));
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 500000
  }));
  app.use((0, _morgan["default"])('combined', {
    stream: logger.stream
  }));
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
  app.use('/', _routes.router);
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({
      message: req.method + ' ' + req.url + ' not found',
      error: 'NoEndpointExist',
      code: 404
    });
    next();
  });
}