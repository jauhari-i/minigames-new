"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _global_config = require("../config/global_config");

var _mysql = require("mysql");

var mysqlConfig = (0, _global_config.getConfig)('/mysqlConfig');
var db = (0, _mysql.createPool)({
  connectionLimit: mysqlConfig.connectionLimit,
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
});
exports.db = db;