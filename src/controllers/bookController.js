import Author from "../models/Author.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import LibraryBook from "../models/LibraryBook.js";
import { Op } from "sequelize";

class BookController {
  async index(req, res) {
    const books = await Book.findAndCountAll();
    return res.status(200).json(books);
  }
  async show(req, res) {
    const { title, genre, publication_year } = req.query;

    let page = req.params || 1;
    let limit = req.params || 20;

    let where = [];

    if (title) {
      where = {
        ...where,
        [Op.iLike]: `$%{title}%`,
      };
    }
    if (genre) {
      where = {
        ...where,
        [Op.iLike]: `$%{genre}%`,
      };
    }

    if (publication_year) {
      where = {
        ...where,
        [Op.eq]: `$%{publication_year}%`,
      };
    }

    const data = await Book.findAll({
      where,
      include: [
        { model: "Author", as: "authors", attributes: { name, nationality } },
      ],
      order: [["title", "ASC"]],
      limit,
      offset: limit * page - limit,
    });
    if (!data.length) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json(data);
  }
  async store(req, res) {
    const { title, genre, publication_year } = req.body;
    try {
      const newBook = await Book.create({ title, genre, publication_year });
      return res.status(201).json(newBook);
    } catch {
      return res.status(400).json({ error: "Bad Request" });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(400).json({ error: "Not content" });
    }

    await book.update(req.body);
    return res.status(200).json(book);
  }
  async destroy(req, res) {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(400).json({ error: "Not content" });
    }
    return res.status(204).json({ Message: "Deleted successfully" });
  }
}

export default new BookController();
