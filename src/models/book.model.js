import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: {
    type: Date,
    required: true,
  },
  summary: { type: String, required: true },
});

export const Book = mongoose.model("Book", bookSchema);
