import { Schema, model, Document, Types } from "mongoose";

interface IAuthor extends Document {
  _id: Types.ObjectId;
  name: string;
  age: number;
  books: Types.ObjectId[];
  addBook: (bookId: Types.ObjectId) => Promise<void>;
}

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    books: {
      type: [{ type: Schema.Types.ObjectId, ref: "Book" }],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

authorSchema.methods.addBook = async function (
  this: IAuthor,
  bookId: Types.ObjectId
) {
  if (!this.books.includes(bookId)) {
    this.books.push(bookId);
    await this.save();
  }
};

export type Author = IAuthor; // Export the interface
export const AuthorModel = model<Author>("Author", authorSchema);
