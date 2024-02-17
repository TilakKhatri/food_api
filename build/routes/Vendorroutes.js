"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendorroutes = void 0;
var express_1 = __importDefault(require("express"));
var Vendorcontrollers_1 = require("../controllers/Vendorcontrollers");
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
exports.Vendorroutes = router;
router.post("/login", Vendorcontrollers_1.VendorLogin);
router.use(auth_1.checkAuth);
// @DESC vendor's responsibilities
// router.post("/food",)
router.get("/profile", Vendorcontrollers_1.GetVendorProfile);
router.patch("/profile", Vendorcontrollers_1.UpdateVendorProfile);
