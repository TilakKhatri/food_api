import express, { Express, Request, Response } from "express";
import {
  CreateVendor,
  GetVendorById,
  GetVendors,
} from "../controllers/Admincontroller";

const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendor", GetVendors);
router.get("/vendor/:id", GetVendorById);

export { router as Adminroutes };
