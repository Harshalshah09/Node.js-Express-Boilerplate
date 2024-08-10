import express from "express";
import cors from "cors";
import userAuthRoutes from "./src/routes/userAuth.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";
const app = express();

//Enable CORS
app.use(cors());
app.options("*", cors());

//parse JSON request body
app.use(express.json());

//use routes
app.use("/api/auth", userAuthRoutes);
app.use("/api/books", bookRoutes);

// Error handling middleware
app.use(errorHandler);
export default app;
