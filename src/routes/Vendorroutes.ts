import express from "express";
import multer from "multer";

import {
  GetVendorProfile,
  UpdateVendorProfile,
  VendorLogin,
  AddFood,
  getFoods,
} from "../controllers/Vendorcontrollers";
import { checkAuth } from "../middlewares/auth";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.post("/login", VendorLogin);

router.use(checkAuth);

// @DESC vendor's responsibilities

// router.post("/food",)

router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.post("/addfood", images, AddFood);
router.get("/food", getFoods);

export { router as Vendorroutes };
