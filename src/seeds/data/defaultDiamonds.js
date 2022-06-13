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
var diamond_model_1 = require("../../models/diamond.model");
var priceCalculation_service_1 = require("../../services/priceCalculation.service");
var lodash_1 = require("lodash");
var TEST_DIAMOND_COUNT = 1000;
var maxValueFor = function (source) {
    return Object.keys(source).length - 1;
};
var randomKeyFor = function (source) {
    var random_index = (0, lodash_1.random)(0, maxValueFor(source));
    return Object.keys(source)[random_index];
};
var generateDiamonds = function () { return __awaiter(void 0, void 0, void 0, function () {
    var diamonds, i, shape, weight, color, clarity, basicPrice, estimatePrice, diamond;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                diamonds = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < TEST_DIAMOND_COUNT)) return [3 /*break*/, 4];
                shape = randomKeyFor(diamond_model_1.SHAPES);
                weight = (0, lodash_1.round)((0, lodash_1.random)(0.01, 10.99, true), 2);
                color = randomKeyFor(diamond_model_1.COLORS);
                clarity = randomKeyFor(diamond_model_1.CLARITY_GRADES);
                return [4 /*yield*/, (0, priceCalculation_service_1.priceByRapSheet)(shape, weight, color, clarity)];
            case 2:
                basicPrice = _a.sent();
                estimatePrice = basicPrice + basicPrice * (0, lodash_1.random)(-0.3, 0.3, true);
                diamond = {
                    shape: shape,
                    weight: weight,
                    color: color,
                    clarity: clarity,
                    basicPrice: (0, lodash_1.round)(basicPrice, 2),
                    estimatePrice: (0, lodash_1.round)(estimatePrice, 2),
                    soldPrice: (0, lodash_1.round)(estimatePrice + estimatePrice * (0, lodash_1.random)(-0.3, 0.3, true), 2)
                };
                diamonds.push(diamond);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, diamonds];
        }
    });
}); };
exports["default"] = generateDiamonds;
