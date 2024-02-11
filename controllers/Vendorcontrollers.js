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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorProfile = exports.GetVendorProfile = exports.VendorLogin = void 0;
const vendor_1 = require("../models/vendor");
const utils_1 = require("../utils");
// import { passwordValidation } from "../utils";
const VendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(404).json({
                message: "Input required",
            });
        const vendorExists = yield vendor_1.Vendor.findOne({ email });
        // console.log(vendorExists);
        if (vendorExists !== null) {
            const validation = yield (0, utils_1.passwordValidation)(password, vendorExists.password);
            if (!validation)
                return res.json({ message: "Incorrect password" });
            const token = yield (0, utils_1.generateToken)({
                _id: vendorExists._id,
                email: vendorExists.email,
                name: vendorExists.name,
            });
            return res.status(200).json({
                message: "successfully logged in.",
                token,
            });
        }
        return res.json({ message: "Login credential is not valid" });
    }
    catch (err) {
        return res.status(411).json({
            message: err.message,
            err,
        });
    }
});
exports.VendorLogin = VendorLogin;
const GetVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log("user from profile", req.user);
    if (user !== null) {
        const existingVendor = yield vendor_1.Vendor.findById(user._id);
        return res.json(existingVendor);
    }
    return res.json({ message: "vendor Information Not Found" });
});
exports.GetVendorProfile = GetVendorProfile;
const UpdateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { foodType, name, address, phone } = req.body;
        // console.log(req.body);
        if (user) {
            // const updateResult = await Vendor.findByIdAndUpdate(
            //   { _id: user._id },
            //   {
            //     name,
            //     address,
            //     phone,
            //     foodType,
            //   }
            // );
            const existingVendor = yield vendor_1.Vendor.findOne({ _id: user._id });
            if (existingVendor !== null) {
                existingVendor.name = name;
                existingVendor.address;
                existingVendor.phone = phone;
                existingVendor.foodType = foodType;
                const saveResult = yield existingVendor.save();
                return res.json(saveResult);
            }
        }
        return res.json({ message: "Unable to Update vendor profile " });
    }
    catch (error) {
        return res.status(411).json({ message: error.message });
    }
});
exports.UpdateVendorProfile = UpdateVendorProfile;
