import connection from "../database/index.js";
import Author from "./Author.js";
import Book from "./Book.js";
import Library from "./Library.js";
import LibraryBook from "./LibraryBook.js";

const models = [Author, Book, Library, LibraryBook];

models.forEach((model) => model.init(connection));

models.forEach((model) => {
  if (model.associate) {
    model.associate(connection.model);
  }
});

export default connection;
