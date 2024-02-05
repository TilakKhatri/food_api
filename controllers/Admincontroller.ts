import express, { Express, NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dto/vendor.dto";
import { Vendor } from "../models/vendor";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, ownerName, pincode, phone, email, password } = <
      CreateVendorInput
    >req.body;
    console.log(req.body);
    if (!name || !ownerName || !pincode || !phone || !email || !password) {
      return new Error("Required all inputs.");
    }

    const createVendor = await Vendor.create({
      ...req.body,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created vendor",
      createVendor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendors = await Vendor.find({});
    if (vendors !== null) {
      return res.status(200).json({
        success: true,
        data: vendors,
      });
    }

    return res.json({ message: "Vendors data not available" });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const GetVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
