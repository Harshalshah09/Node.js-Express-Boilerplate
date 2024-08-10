import { Book } from "../models/book.model.js";
import { createBookSchema } from "../validations/book.validation.js";

export const createBook = async (req, res) => {
  const { error } = createBookSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book(req.body);
  await book.save();

  res.status(201).send(book);
};

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found.");
  res.send(book);
};

export const updateBook = async (req, res) => {
  const { error } = createBookSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) return res.status(404).send("Book not found.");

  res.send(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).send("Book not found.");

  res.send(book);
};
