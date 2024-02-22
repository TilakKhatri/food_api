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
