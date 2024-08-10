import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import * as bookController from "../controllers/book.controller.js";
import { createBookSchema } from "../validations/book.validation.js";

const router = express.Router();

// Create a new book
router.post(
  "/createbook",
  authMiddleware,
  validate(createBookSchema),
  bookController.createBook
);

// Update an existing book by ID
router.put(
  "/updatebook/:id",
  authMiddleware,
  validate(createBookSchema),
  bookController.updateBook
);

// Retrieve all books
router.get("/getbooks", authMiddleware, bookController.getBooks);

// Retrieve a specific book by ID
router.get("/getbook/:id", authMiddleware, bookController.getBook);

// Delete a book by ID
router.delete("/deletebook/:id", authMiddleware, bookController.deleteBook);

export default router;
