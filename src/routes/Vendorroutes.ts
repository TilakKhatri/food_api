import express from "express";
import {
  GetVendorProfile,
  UpdateVendorProfile,
  VendorLogin,
} from "../controllers/Vendorcontrollers";
import { checkAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", VendorLogin);

router.use(checkAuth);

// @DESC vendor's responsibilities

// router.post("/food",)

router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);

export { router as Vendorroutes };
