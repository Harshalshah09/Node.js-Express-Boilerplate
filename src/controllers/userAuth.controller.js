import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  registerSchema,
  verifyOTPSchema,
} from "../validations/user.validation.js";
import { generateOTP } from "../utils/generateOTP.utils.js";
import { sendEmail } from "../helpers/sendEmail.helper.js";

// Register a new user
export const register = async (req, res) => {
  // Validate the registration input
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email already in use.");
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword });

  // Generate OTP for email verification
  const otp = generateOTP(parseInt(process.env.OTP_LENGTH));
  user.otp = otp;

  try {
    // Save the user in the database
    await user.save();

    // Send OTP to the user's email
    await sendEmail(email, "Verify your account", `Your OTP code is ${otp}`);

    res.status(201).send({
      message: "User registered. Please check your email for the OTP.",
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// Verify the OTP for user registration
export const verifyOTP = async (req, res) => {
  // Validate the OTP input
  const { error } = verifyOTPSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, otp } = req.body;

  // Find the user with the provided email and OTP
  const user = await User.findOne({ email, otp });
  if (!user) return res.status(400).send("Invalid OTP.");

  // Mark the user as verified and clear the OTP
  user.isVerified = true;
  user.otp = undefined;

  await user.save();

  res.send({ message: "Account verified." });
};

// Log in a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");
  if (!user.isVerified) return res.status(400).send("Account not verified.");

  // Check if the password is valid
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // Generate a JWT token for the user
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.send({ token });
};
