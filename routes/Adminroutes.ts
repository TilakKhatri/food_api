import express, { Express, Request, Response } from "express";
import { CreateVendor, GetVendors } from "../controllers/Admincontroller";

const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendor", GetVendors);

export { router as Adminroutes };
