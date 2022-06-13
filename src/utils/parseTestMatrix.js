"use strict";
exports.__esModule = true;
exports["default"] = (function (text) {
    return text.split('\n')
        .map(function (x) { return x.split(' ').map(function (x) { return Number(x); }); });
});
