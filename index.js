import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import { connectToDatabase } from "./src/config/mongodb.config.js";
import app from "./server.js";

const port = process.env.PORT || 3001; // Fallback to a default port if not set

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to start server due to database connection error:",
      error.message
    );
  });
