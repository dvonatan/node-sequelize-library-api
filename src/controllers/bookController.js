import Author from "../models/Author.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import LibraryBook from "../models/LibraryBook.js";

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
      order: [["id", "ASC"]],
      limit,
      offset: limit * page - limit,
    });
    return res.status(200).json(data);
  }
}
