"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = void 0;

var _confidence = _interopRequireDefault(require("confidence"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var config = {
  port: process.env.PORT,
  basicAuthApi: [{
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD
  }],
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  mongoDbUrl: process.env.MONGO_DATABASE_URL,
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  emailConfig: {
    email: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD
  },
  cloudinaryConfig: {
    apiKey: process.env.CLOUD_API_KEY,
    apiSecret: process.env.CLOUD_API_SECRET,
    cloudName: process.env.CLOUD_NAME
  },
  mode: process.env.MODE
};
var store = new _confidence["default"].Store(config);

var getConfig = function getConfig(key) {
  return store.get(key);
};

exports.getConfig = getConfig;