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
exports.GetVendorById = exports.GetVendors = exports.CreateVendor = void 0;
const vendor_1 = require("../models/vendor");
const utils_1 = require("../utils");
const CreateVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, ownerName, pincode, phone, email, password } = req.body;
        //  console.log(req.body);
        if (!name || !ownerName || !pincode || !phone || !email || !password) {
            return new Error("Required all inputs.");
        }
        const userExists = yield vendor_1.Vendor.findOne({ email });
        // console.log("useexists", userExists);
        if (userExists !== null) {
            return res.status(400).json({
                message: "Failed to create account,Account already exists.",
            });
        }
        const hash = yield (0, utils_1.generatePassword)(password);
        const createVendor = yield vendor_1.Vendor.create(Object.assign(Object.assign({}, req.body), { password: hash }));
        return res.status(201).json({
            success: true,
            message: "Successfully created vendor",
            createVendor,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.CreateVendor = CreateVendor;
const GetVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_1.Vendor.find({});
        if (vendors !== null) {
            return res.status(200).json({
                success: true,
                data: vendors,
            });
        }
        return res.json({ message: "Vendors data not available" });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
exports.GetVendors = GetVendors;
const GetVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_1.Vendor.findById(req.params.id);
        if (vendor !== null) {
            return res.status(200).json({
                success: true,
                vendor,
            });
        }
        return res.json({
            message: "Invalid id",
        });
    }
    catch (err) {
        return res.status(411).json({
            message: err.message,
            err,
        });
    }
});
exports.GetVendorById = GetVendorById;
