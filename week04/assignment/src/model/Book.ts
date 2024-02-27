import { Schema, model, InferSchemaType } from "mongoose";
import { Genre } from "../enum/Genre";

const bookSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    library: { type: Schema.Types.ObjectId, ref: "Library", required: true },
    pages: { type: Number, required: true },
    genre: { type: String, enum: Object.values(Genre), required: true },
  },
  { timestamps: true }
);

export type Book = InferSchemaType<typeof bookSchema>;

export const BookModel = model("book", bookSchema);
