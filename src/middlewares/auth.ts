import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/password.utils";
// Augment the Request type
declare module "express" {
  interface Request {
    user?: any; // Change 'any' to the actual type of your user object
  }
}

/**
 * @DESC Verify JWT from authorization header Middleware
 */
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];

  if (!header && !header?.startsWith("Bearer")) {
    return res.end("empty token please enter token");
  }

  // bearer token
  try {
    const token = header.split(" ")[1];
    const signature = jwt.verify(token, APP_SECRET);
    // console.log("signature", signature);
    if (signature !== null) {
      req.user = signature;
      next();
    }
  } catch (error) {
    return res.json({
      message: "Unauthorized user",
    });
  }
};
