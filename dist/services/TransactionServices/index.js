"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AccTransaction = _interopRequireDefault(require("./AccTransaction"));

var _CheckoutTransaction = _interopRequireDefault(require("./CheckoutTransaction"));

var _DeleteTransaction = _interopRequireDefault(require("./DeleteTransaction"));

var _DetailTransaction = _interopRequireDefault(require("./DetailTransaction"));

var _ListTransactionAdmin = _interopRequireDefault(require("./ListTransactionAdmin"));

var _ListTransactionUser = _interopRequireDefault(require("./ListTransactionUser"));

var _RejTransaction = _interopRequireDefault(require("./RejTransaction"));

var _UploadPayment = _interopRequireDefault(require("./UploadPayment"));

var transactionServices = {
  AccTransaction: _AccTransaction["default"],
  CheckoutTransaction: _CheckoutTransaction["default"],
  DeleteTransaction: _DeleteTransaction["default"],
  DetailTransaction: _DetailTransaction["default"],
  ListTransactionAdmin: _ListTransactionAdmin["default"],
  ListTransactionUser: _ListTransactionUser["default"],
  RejectTransaction: _RejTransaction["default"],
  UploadPayment: _UploadPayment["default"]
};
var _default = transactionServices;
exports["default"] = _default;