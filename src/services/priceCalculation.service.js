"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.averagePriceByDeals = exports.priceByRapSheet = void 0;
var rapSheet_model_js_1 = require("../models/rapSheet.model.js");
var diamond_model_js_1 = require("../models/diamond.model.js");
var ApiError_1 = require("../utils/ApiError");
var lodash_1 = require("lodash");
var http_status_codes_1 = require("http-status-codes");
var WEIGHT_GROUPS = [
    [0.01, 0.03], [0.04, 0.07], [0.08, 0.14], [0.15, 0.17], [0.18, 0.22], [0.23, 0.29],
    [0.30, 0.39], [0.40, 0.49], [0.50, 0.69], [0.70, 0.89], [0.90, 0.99], [1.00, 1.49],
    [1.50, 1.99], [2.00, 2.99], [3.00, 3.99], [4.00, 4.99], [5.00, 6.99], [7.00, 7.99],
    [8.00, 8.99], [9.00, 9.99], [10.00, 10.99]
];
var COLOR_GROUPS = [['D', 'E', 'F'], ['G', 'H'], ['I', 'J'], ['K', 'L'], ['M', 'N']];
var CLARITY_GROUPS = [['IF', 'VVS1', 'VVS2'], ['VS1', 'VS2'], ['SI1', 'SI2', 'SI3'], ['I1', 'I2', 'I3']];
/**
 * TODO
 *  Need to handle cases with weight bigger than 11 carats
 *  Diamonds large 3-10ct+ sizes may trade at significant different price!
 */
var priceByRapSheet = function (shape, weight, color, clarity) { return __awaiter(void 0, void 0, void 0, function () {
    var rapSheet, rate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, rapSheet_model_js_1["default"]
                    .findOne({ shape: shape, weightFrom: { $lte: weight }, weightTo: { $gte: weight } })
                    .sort({ createdAt: -1 })];
            case 1:
                rapSheet = _a.sent();
                if (rapSheet === null) {
                    throw new ApiError_1["default"](404, "Appropriate RapSheet not found. (shape: ".concat(shape, ", weight: ").concat(weight, ")"));
                }
                rate = findRate(rapSheet, color, clarity);
                // To get price in USD from RapSheet need to multiplication rate to 100
                return [2 /*return*/, rate * 100 * weight];
        }
    });
}); };
exports.priceByRapSheet = priceByRapSheet;
var findRate = function (rapSheet, color, clarity) {
    var normalizedRapSheet = rapSheet.normalizedPriceMatrix();
    var colorPosition = diamond_model_js_1.COLORS[color];
    var clarityPosition = diamond_model_js_1.CLARITY_GRADES[clarity];
    var rate = normalizedRapSheet[colorPosition][clarityPosition];
    return rate;
};
var averagePriceByDeals = function (shape, weight, color, clarity) { return __awaiter(void 0, void 0, void 0, function () {
    var weightFrom, weightTo, colors, clarityGrades, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                weightFrom = 0.1;
                weightTo = 1.1;
                colors = ['E', 'I', 'J', 'D', 'E', 'F', 'G', 'H'];
                clarityGrades = ['SI1', 'I1', 'IF', 'FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1'];
                return [4 /*yield*/, diamond_model_js_1.Diamond.aggregate([
                        {
                            $match: {
                                shape: shape,
                                weight: { '$gte': similarWeight(weight).from, '$lte': similarWeight(weight).to },
                                color: { '$in': similarCharacteristic(color, weight, COLOR_GROUPS) },
                                clarity: { '$in': similarCharacteristic(color, weight, CLARITY_GROUPS) }
                            }
                        }, {
                            $addFields: {
                                rate: { $divide: ["$estimatePrice", "$weight"] }
                            }
                        }, {
                            $group: {
                                _id: null,
                                avgRate: { $avg: '$rate' }
                            }
                        }
                    ])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result ? (0, lodash_1.round)(result[0].avgRate * weight, 2) : null];
        }
    });
}); };
exports.averagePriceByDeals = averagePriceByDeals;
var similarWeight = function (weight) {
    var basicGroup = WEIGHT_GROUPS.find(function (x) {
        return x[0] <= weight && weight <= x[1];
    });
    if (!basicGroup) {
        throw new ApiError_1["default"](http_status_codes_1.StatusCodes.BAD_REQUEST, 'Weight range not found');
    }
    return { from: basicGroup[0], to: basicGroup[1] };
};
var similarCharacteristic = function (color, weight, groups) {
    var group = [];
    if (weight < 0.3) {
        var result = groups.find(function (x) { return x.includes(color); });
        group = result ? result : group;
    }
    else {
        group.push(color);
    }
    return group;
};
