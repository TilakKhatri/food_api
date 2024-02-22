import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tokenPayload } from "../dto/token.dto";

// dotenv.config();
export const APP_SECRET = "HELLO ";
export const generatePassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const passwordValidation = async (
  password: string,
  oldPassword: string
) => {
  return await bcrypt.compare(password, oldPassword);
};

export const generateToken = async (payload: tokenPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "90d" });
};

export const tokenValidation = async (token: string) => {
  const signature = token;

  if (signature) {
    try {
      const payload = jwt.verify(
        signature.split(" ")[1],
        APP_SECRET
      ) as tokenPayload;

      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};
