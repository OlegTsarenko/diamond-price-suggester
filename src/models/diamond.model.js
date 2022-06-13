"use strict";
exports.__esModule = true;
exports.CHARACTERISTIC_LIST = exports.CLARITY_GRADES = exports.COLORS = exports.SHAPES = exports.Diamond = void 0;
var mongoose_1 = require("mongoose");
// Name, Position in RapSheet Matrix
var SHAPES = {
    round: 0,
    princess: 1,
    cushion: 2,
    marquise: 3,
    emerald: 4,
    other: 5
};
exports.SHAPES = SHAPES;
var COLORS = {
    D: 0, E: 1, F: 2, G: 3, H: 4, I: 5, J: 6, K: 7, L: 8, 'M-Z': 9
};
exports.COLORS = COLORS;
var CLARITY_GRADES = {
    IF: 0, VVS1: 1, VVS2: 2, VS1: 3, VS2: 4, SI1: 5, SI2: 6, SI3: 7, I1: 8, I2: 9, I3: 10
};
exports.CLARITY_GRADES = CLARITY_GRADES;
var CHARACTERISTIC_LIST = ['shape', 'weight', 'color', 'clarity'];
exports.CHARACTERISTIC_LIST = CHARACTERISTIC_LIST;
var diamondSchema = new mongoose_1["default"].Schema({
    shape: {
        type: mongoose_1["default"].Schema.Types.String,
        "enum": Object.keys(SHAPES),
        required: true,
        index: true
    },
    weight: {
        type: mongoose_1["default"].Schema.Types.Number,
        min: [0.01, 'Too small'],
        max: [10.99, 'Too big'],
        required: true,
        index: true
    },
    color: {
        type: mongoose_1["default"].Schema.Types.String,
        "enum": Object.keys(COLORS),
        required: true,
        index: true
    },
    clarity: {
        type: mongoose_1["default"].Schema.Types.String,
        "enum": Object.keys(CLARITY_GRADES),
        required: true,
        index: true
    },
    basicPrice: {
        type: mongoose_1["default"].Schema.Types.Number,
        min: [0.01, 'Too small'],
        max: [999999999, 'Too big']
    },
    estimatePrice: {
        type: mongoose_1["default"].Schema.Types.Number,
        min: [0.01, 'Too small'],
        max: [999999999, 'Too big']
    },
    soldPrice: {
        type: mongoose_1["default"].Schema.Types.Number,
        min: [0.01, 'Too small'],
        max: [999999999, 'Too big']
    }
}, {
    timestamps: true
});
var Diamond = mongoose_1["default"].model('Diamond', diamondSchema);
exports.Diamond = Diamond;
