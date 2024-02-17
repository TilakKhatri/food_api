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
exports.UpdateVendorProfile = exports.GetVendorProfile = exports.VendorLogin = void 0;
var vendor_1 = require("../models/vendor");
var utils_1 = require("../utils");
// import { passwordValidation } from "../utils";
var VendorLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, vendorExists, validation, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password)
                    return [2 /*return*/, res.status(404).json({
                            message: "Input required",
                        })];
                return [4 /*yield*/, vendor_1.Vendor.findOne({ email: email })];
            case 1:
                vendorExists = _b.sent();
                if (!(vendorExists !== null)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, utils_1.passwordValidation)(password, vendorExists.password)];
            case 2:
                validation = _b.sent();
                if (!validation)
                    return [2 /*return*/, res.json({ message: "Incorrect password" })];
                return [4 /*yield*/, (0, utils_1.generateToken)({
                        _id: vendorExists._id,
                        email: vendorExists.email,
                        name: vendorExists.name,
                    })];
            case 3:
                token = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "successfully logged in.",
                        token: token,
                    })];
            case 4: return [2 /*return*/, res.json({ message: "Login credential is not valid" })];
            case 5:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(411).json({
                        message: err_1.message,
                        err: err_1,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.VendorLogin = VendorLogin;
var GetVendorProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, existingVendor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                console.log("user from profile", req.user);
                if (!(user !== null)) return [3 /*break*/, 2];
                return [4 /*yield*/, vendor_1.Vendor.findById(user._id)];
            case 1:
                existingVendor = _a.sent();
                return [2 /*return*/, res.json(existingVendor)];
            case 2: return [2 /*return*/, res.json({ message: "vendor Information Not Found" })];
        }
    });
}); };
exports.GetVendorProfile = GetVendorProfile;
var UpdateVendorProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, foodType, name, address, phone, existingVendor, saveResult, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                user = req.user;
                _a = req.body, foodType = _a.foodType, name = _a.name, address = _a.address, phone = _a.phone;
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, vendor_1.Vendor.findOne({ _id: user._id })];
            case 1:
                existingVendor = _b.sent();
                if (!(existingVendor !== null)) return [3 /*break*/, 3];
                existingVendor.name = name;
                existingVendor.address;
                existingVendor.phone = phone;
                existingVendor.foodType = foodType;
                return [4 /*yield*/, existingVendor.save()];
            case 2:
                saveResult = _b.sent();
                return [2 /*return*/, res.json(saveResult)];
            case 3: return [2 /*return*/, res.json({ message: "Unable to Update vendor profile " })];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(411).json({ message: error_1.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.UpdateVendorProfile = UpdateVendorProfile;
