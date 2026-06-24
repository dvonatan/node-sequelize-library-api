import Author from "../models/Author.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import LibraryBook from "../models/LibraryBook.js";
import { Op } from "sequelize";

class LibraryBookController {
  async index(req, res) {
    const totalCopies = await Book.count(id);
  }
}
