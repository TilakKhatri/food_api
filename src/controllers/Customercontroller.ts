import { Request, Response } from "express";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { CreateCustomerInput, UserLoginInput } from "../dto";
import { generatePassword, generateToken, passwordValidation } from "../utils";
import { Customer } from "../models/customer";

export const CustomerRegistration = async (req: Request, res: Response) => {
  try {
    const inputs = plainToClass(CreateCustomerInput, req.body);
    const validateError = await validate(inputs, {
      validationError: { target: true },
    });

    if (validateError.length > 0) {
      return res.status(400).json({
        message: validateError,
      });
    }
    const { email, phone, password } = inputs;
    const hash = await generatePassword(password);

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer !== null) {
      return res.status(404).json({
        message: "Email exits",
      });
    }

    const result = await Customer.create({
      email,
      password: hash,
      phone,
      otp: 3534,
      otp_expiry: new Date(),
      firstName: "Tilak",
      lastName: "khatri",
      address: "WRC",
      verified: false,
      lat: 0,
      lng: 0,
      orders: [],
    });
    if (result !== null) {
      // for verification send otp to customer
      // await sendOtpRequest(otp,phone)

      return res.status(201).json({
        message: "Account created successfully",
        result,
      });
    }
  } catch (err: any) {
    return res.status(411).json({
      message: err.message,
      err,
    });
  }
};

export const CustomerLogin = async (req: Request, res: Response) => {
  try {
    const inputs = plainToClass(UserLoginInput, req.body);
    const validateError = await validate(inputs, {
      validationError: { target: true },
    });
    // for error handling
    if (validateError.length > 0) {
      return res.status(400).json({
        message: validateError,
      });
    }
    const { email, password } = inputs;
    const customer = await Customer.findOne({ email });

    if (customer !== null) {
      const validation = await passwordValidation(password, customer.password);

      if (!validation) return res.json({ message: "Incorrect password" });

      const token = await generateToken({
        _id: customer._id,
        email: customer.email,
        verified: customer.verified,
      });

      return res.status(200).json({
        message: "login successfull",
        token,
        email: customer.email,
        verified: customer.verified,
      });
    }
    return res.json({
      message: "Error with Login",
    });
  } catch (err: any) {
    return res.status(411).json({
      message: err.message,
      err,
    });
  }
};

export const CustomerVerification = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const customer = req.user;

    if (customer) {
      const profile = await Customer.findById(customer._id);
      if (profile) {
        if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
          profile.verified = true;

          const updatedCustomerResponse = await profile.save();

          const signature = generateToken({
            _id: updatedCustomerResponse._id,
            email: updatedCustomerResponse.email,
            verified: updatedCustomerResponse.verified,
          });

          return res.status(200).json({
            signature,
            email: updatedCustomerResponse.email,
            verified: updatedCustomerResponse.verified,
          });
        }
      }
    }

    return res.status(400).json({ msg: "Unable to verify Customer" });
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal error",
      error: err.message,
    });
  }
};

export const GetCustomerProfile = async (req: Request, res: Response) => {
  try {
    const customer = req.user;

    if (customer) {
      const profile = await Customer.findById(customer._id);

      if (profile) {
        return res.status(201).json(profile);
      }
    }
    return res.status(400).json({ msg: "Error while Fetching Profile" });
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal error",
      error: err.message,
    });
  }
};

export const EditCustomerProfile = async (req: Request, res: Response) => {
  try {
    const customer = req.user;
    const { firstName, lastName, address } = req.body;
    if (customer) {
      const updatedResult = await Customer.findByIdAndUpdate(customer._id, {
        firstName: firstName,
        lastName: lastName,
        address: address,
      });
      return res.status(200).json({
        message: "successfully updated",
        updatedResult,
      });
    }
    return res.status(400).json({ msg: "Error while Updating Profile" });
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal error",
      error: err.message,
    });
  }
};
