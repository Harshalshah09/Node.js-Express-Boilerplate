import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.error("Error Connecting to Database", error.message);
    throw error; // Rethrow error to be handled by the calling function
  }
};
