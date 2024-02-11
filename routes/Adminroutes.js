"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adminroutes = void 0;
const express_1 = __importDefault(require("express"));
const Admincontroller_1 = require("../controllers/Admincontroller");
const router = express_1.default.Router();
exports.Adminroutes = router;
router.post("/vendor", Admincontroller_1.CreateVendor);
router.get("/vendor", Admincontroller_1.GetVendors);
router.get("/vendor/:id", Admincontroller_1.GetVendorById);
