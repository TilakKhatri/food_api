import { Request, Response, NextFunction } from "express";
import { IUserRequest, LoginInput } from "../dto/auth.dto";
import { Vendor } from "../models/vendor";
import { generateToken, passwordValidation } from "../utils";
import { CreateFoodInput, EditVendorInput } from "../dto";
import { Food } from "../models/food";

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
  // console.log("user from profile", req.user);
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

export const updateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user) {
      const existingVendor = await Vendor.findById(user._id);
      if (existingVendor !== null) {
        // toggling serviceAvailable of vendor
        existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
        const saveResult = await existingVendor.save();
        return res.json(saveResult);
      }
      return res.json({ message: "Unable to Update available  service  " });
    }
  } catch (err: any) {
    res.json({
      message: "Internal Error",
      error: err?.message,
    });
  }
};

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const { name, description, category, foodType, readyTime, price } = <
    CreateFoodInput
  >req.body;
  try {
    if (user !== null) {
      const vendor = await Vendor.findById(user._id);
      if (vendor !== null) {
        const files = req.files as [Express.Multer.File];
        const images = files.map((file: Express.Multer.File) => file.filename);

        const food = await Food.create({
          vendorId: vendor._id,
          name,
          category,
          description,
          price,
          rating: 0,
          readyTime,
          foodType,
          images,
        });
        vendor.foods.push(food._id);
        const data = await vendor.save();
        return res.status(201).json({
          message: "successfully added",
          status: 201,
          data,
        });
      }
    }
  } catch (err: any) {
    res.json({
      message: "Internal Error",
      error: err.message,
    });
  }
};

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check user is present or not
    const user = req.user;
    if (user !== null) {
      const foods = await Food.find({ vendorId: user._id });
      if (foods !== null) {
        return res.json(foods);
      }
      return res.status(404).json({ message: "Foods not found" });
    }
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal error",
      error: err.message,
    });
  }
};

/*
@Remaining controllers
1. getcurrentorders
2. getorderdetails
3. process order
4. get offers
5. create new offers of customer
6. edit offers
*/
