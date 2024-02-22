import express from "express";
import {
  CustomerLogin,
  CustomerRegistration,
  CustomerVerification,
  EditCustomerProfile,
  GetCustomerProfile,
} from "../controllers";
import { checkAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/register", CustomerRegistration);
router.post("/login", CustomerLogin);
// middleware for authentication
router.use(checkAuth);

router.post("/verify", CustomerVerification);
router.get("/profile", GetCustomerProfile);
router.patch("/profile", EditCustomerProfile);
export { router as Customerroutes };
