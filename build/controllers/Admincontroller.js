"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVendorById = exports.GetVendors = exports.CreateVendor = void 0;
var vendor_1 = require("../models/vendor");
var utils_1 = require("../utils");
var CreateVendor = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, ownerName, pincode, phone, email, password, userExists, hash, createVendor, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name = _a.name, ownerName = _a.ownerName, pincode = _a.pincode, phone = _a.phone, email = _a.email, password = _a.password;
                //  console.log(req.body);
                if (!name || !ownerName || !pincode || !phone || !email || !password) {
                    return [2 /*return*/, new Error("Required all inputs.")];
                }
                return [4 /*yield*/, vendor_1.Vendor.findOne({ email: email })];
            case 1:
                userExists = _b.sent();
                // console.log("useexists", userExists);
                if (userExists !== null) {
                    return [2 /*return*/, res.status(400).json({
                            message: "Failed to create account,Account already exists.",
                        })];
                }
                return [4 /*yield*/, (0, utils_1.generatePassword)(password)];
            case 2:
                hash = _b.sent();
                return [4 /*yield*/, vendor_1.Vendor.create(__assign(__assign({}, req.body), { password: hash }))];
            case 3:
                createVendor = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Successfully created vendor",
                        createVendor: createVendor,
                    })];
            case 4:
                error_1 = _b.sent();
                res.status(500).json({
                    success: false,
                    message: error_1.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.CreateVendor = CreateVendor;
var GetVendors = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendors, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vendor_1.Vendor.find({})];
            case 1:
                vendors = _a.sent();
                if (vendors !== null) {
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            data: vendors,
                        })];
                }
                return [2 /*return*/, res.json({ message: "Vendors data not available" })];
            case 2:
                err_1 = _a.sent();
                res.status(404).json({
                    success: false,
                    message: err_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetVendors = GetVendors;
var GetVendorById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendor, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vendor_1.Vendor.findById(req.params.id)];
            case 1:
                vendor = _a.sent();
                if (vendor !== null) {
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            vendor: vendor,
                        })];
                }
                return [2 /*return*/, res.json({
                        message: "Invalid id",
                    })];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(411).json({
                        message: err_2.message,
                        err: err_2,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetVendorById = GetVendorById;
