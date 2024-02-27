import { ObjectId } from "mongodb";
import { Schema, model, connect, InferSchemaType } from "mongoose";

const librarySchema = new Schema(
  {
    name: { type: String, required: true },
    books: {
      type: [{ type: ObjectId, ref: "Book" }],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

export type Library = InferSchemaType<typeof librarySchema>;

export const LibraryModel = model("Library", librarySchema);
