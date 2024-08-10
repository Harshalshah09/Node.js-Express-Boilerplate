import express from "express";
import * as userAuthController from "../controllers/userAuth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  verifyOTPSchema,
} from "../validations/user.validation.js";

const router = express.Router();

// Route for user registration
router.post("/register", validate(registerSchema), userAuthController.register);

// Route for OTP verification
router.post(
  "/verifyotp",
  validate(verifyOTPSchema),
  userAuthController.verifyOTP
);

// Route for user login
router.post("/login", validate(registerSchema), userAuthController.login);

export default router;
