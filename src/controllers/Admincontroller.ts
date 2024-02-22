import express, { Express, NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dto/vendor.dto";
import { Vendor } from "../models/vendor";
import { generatePassword } from "../utils";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, ownerName, pincode, phone, email, password } = <
      CreateVendorInput
    >req.body;
    //  console.log(req.body);
    if (!name || !ownerName || !pincode || !phone || !email || !password) {
      return new Error("Required all inputs.");
    }
    const userExists = await Vendor.findOne({ email });
    // console.log("useexists", userExists);

    if (userExists !== null) {
      return res.status(400).json({
        message: "Failed to create account,Account already exists.",
      });
    }
    const hash = await generatePassword(password);
    const createVendor = await Vendor.create({
      ...req.body,
      password: hash,
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
    console.log("vendors", vendors);
    if (vendors !== null) {
      return res.status(200).json({
        success: true,
        data: vendors,
      });
    }

    return res.json({ message: "Vendors data not available" });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const GetVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (vendor !== null) {
      return res.status(200).json({
        success: true,
        vendor,
      });
    }
    return res.json({
      message: "Invalid id",
    });
  } catch (err: any) {
    return res.status(411).json({
      message: err.message,
      err,
    });
  }
};

/*
@ Desc Remaining functionalities
1. Get transactions
2. Get transactions by id
3. Verify delivery users
4. Get delivery users
*/
