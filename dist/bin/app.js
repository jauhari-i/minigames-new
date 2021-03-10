"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _configureApp = _interopRequireDefault(require("../config/configureApp"));

var _global_config = require("../config/global_config");

var _mongoConnection = _interopRequireDefault(require("../db/mongoConnection"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var port = (0, _global_config.getConfig)('/port');
var app = (0, _express["default"])();
(0, _configureApp["default"])(app);
(0, _mongoConnection["default"])(_mongoose["default"]);
app.listen(port, function () {
  console.log('Server is running on port ' + port);
});