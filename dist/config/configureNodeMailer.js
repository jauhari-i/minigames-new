"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;

var nodemailer = _interopRequireWildcard(require("nodemailer"));

var _global_config = require("../config/global_config");

var emailConfig = (0, _global_config.getConfig)('/emailConfig');
var transporter = nodemailer.createTransport({
  host: 'mail.tranceformasiindonesia.com',
  port: 465,
  secure: true,
  // use SSL
  auth: {
    user: emailConfig.email,
    // generated ethereal user
    pass: emailConfig.password // generated ethereal password

  }
});
exports.transporter = transporter;