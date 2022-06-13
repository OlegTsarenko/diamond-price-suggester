"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var diamond_model_1 = require("./diamond.model");
var rapSheetSchema = new mongoose_1["default"].Schema({
    reportIdentifier: {
        type: mongoose_1["default"].Schema.Types.String,
        required: false
    },
    shape: {
        type: mongoose_1["default"].Schema.Types.String,
        "enum": Object.keys(diamond_model_1.SHAPES),
        required: true,
        index: true
    },
    weightFrom: {
        type: mongoose_1["default"].Schema.Types.Number,
        required: true,
        index: true
    },
    weightTo: {
        type: mongoose_1["default"].Schema.Types.Number,
        required: true,
        index: true
    },
    priceMatrix: {
        type: mongoose_1["default"].Schema.Types.Array,
        required: true
    }
}, {
    timestamps: true
});
rapSheetSchema.index({ createdAt: 1, type: -1 });
var SMALL_COLOR_PATTERN = [3, 2, 2, 2, 1];
var SMALL_CLARITY_PATTERN = [3, 2, 1, 1, 1, 1, 1, 1];
rapSheetSchema.methods.normalizedPriceMatrix = function () {
    if (this.priceMatrix.length > 5) {
        return this.priceMatrix;
    }
    var normalizedMatrix = this.priceMatrix.reduce(function (acc, value, index) {
        var fullRow = value.reduce(function (rAcc, rValue, rIndex) {
            for (var j = 0; j < SMALL_CLARITY_PATTERN[rIndex]; j++) {
                rAcc.push(rValue);
            }
            return rAcc;
        }, []);
        for (var i = 0; i < SMALL_COLOR_PATTERN[index]; i++) {
            acc.push(fullRow);
        }
        return acc;
    }, []);
    return normalizedMatrix;
};
exports["default"] = mongoose_1["default"].model('RapSheet', rapSheetSchema);
