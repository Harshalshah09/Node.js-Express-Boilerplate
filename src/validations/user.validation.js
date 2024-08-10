import Joi from "joi";

// Define the password schema with typical validation rules
const passwordSchema = Joi.string()
  .min(8) // Minimum length of 8 characters
  .max(128) // Maximum length of 128 characters
  .pattern(/^[a-zA-Z0-9!@#$%^&*()_+]{8,128}$/) // Custom pattern for allowed characters
  .required();

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordSchema,
});

export const verifyOTPSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(parseInt(process.env.OTP_LENGTH)).required(),
});
