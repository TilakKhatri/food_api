import { Request, Response, NextFunction } from "express";
import { IUserRequest, LoginInput } from "../dto/auth.dto";
import { Vendor } from "../models/vendor";
import { generateToken, passwordValidation } from "../utils";
import { EditVendorInput } from "../dto/vendor.dto";
// import { passwordValidation } from "../utils";

export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = <LoginInput>req.body;
    if (!email || !password)
      return res.status(404).json({
        message: "Input required",
      });

    const vendorExists = await Vendor.findOne({ email });
    // console.log(vendorExists);
    if (vendorExists !== null) {
      const validation = await passwordValidation(
        password,
        vendorExists.password
      );
      if (!validation) return res.json({ message: "Incorrect password" });
      const token = await generateToken({
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
  } catch (err: any) {
    return res.status(411).json({
      message: err.message,
      err,
    });
  }
};

export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  console.log("user from profile", req.user);
  if (user !== null) {
    const existingVendor = await Vendor.findById(user._id);
    return res.json(existingVendor);
  }

  return res.json({ message: "vendor Information Not Found" });
};

export const UpdateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { foodType, name, address, phone } = <EditVendorInput>req.body;
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
      const existingVendor = await Vendor.findOne({ _id: user._id });
      if (existingVendor !== null) {
        existingVendor.name = name;
        existingVendor.address;
        existingVendor.phone = phone;
        existingVendor.foodType = foodType;
        const saveResult = await existingVendor.save();

        return res.json(saveResult);
      }
    }
    return res.json({ message: "Unable to Update vendor profile " });
  } catch (error: any) {
    return res.status(411).json({ message: error.message });
  }
};
