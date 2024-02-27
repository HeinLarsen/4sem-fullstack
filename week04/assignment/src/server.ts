import { Library, LibraryModel } from "./model/Library";
import { Book, BookModel } from "./model/Book";
import { Author, AuthorModel } from "./model/Author";
import { Genre } from "./enum/Genre";
import { connect } from "mongoose";
import "dotenv/config";

async function main() {
  try {
    await connect(process.env.MONGO_URI as string);

    await BookModel.deleteMany({});
    await AuthorModel.deleteMany({});
    await LibraryModel.deleteMany({});

    const newLibrary: Library = {
      name: "The Library",
      books: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await LibraryModel.create(newLibrary);

    await AuthorModel.create({
      name: "Anders",
      age: 25,
      books: [],
    });

    const author = await AuthorModel.findOne({ name: "Anders" });
    const library = await LibraryModel.findOne({ name: "The Library" });

    if (!author || !library) {
      console.error("Author or Library not found");
      process.exit(1);
    }

    const newBookData: Partial<Book> = {
      name: "The Book",
      author: author._id,
      library: library._id,
      pages: 100,
      genre: Genre.fantasy,
    };

    const newBook = await BookModel.create(newBookData);

    if (!newBook) {
      console.error("Error creating book");
      process.exit(1);
    }

    const bookId = newBook._id;

    // Call the addBook method
    try {
      if (author && bookId) {
        await author.addBook(bookId);
        console.log("Book added successfully");
      } else {
        console.error("Author or BookId not found");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }

    BookModel.findOne({ name: "The Book" })
      .populate("author")
      .exec()
      .then((doc) => {
        if (doc) {
          console.log(doc);
          return doc._id;
        }
      });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);
