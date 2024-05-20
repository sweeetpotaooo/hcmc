"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "income":
      return;

    case "espense":
      return;

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;