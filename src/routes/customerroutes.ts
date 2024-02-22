import express from "express";
import { CustomerLogin, CustomerRegistration } from "../controllers";

const router = express.Router();

router.post("/register", CustomerRegistration);
router.post("/login", CustomerLogin);

export { router as Customerroutes };
