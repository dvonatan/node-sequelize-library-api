import { id } from "date-fns/locale";
import Author from "../models/Author.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import LibraryBook from "../models/LibraryBook.js";
import { Op } from "sequelize";

class AuthorController {
  async index(req, res) {
    const author = await Author.findAll();
    return res.status(200).json(author);
  }

  async show(req, res) {
    const { name, nationality } = req.query;

    let page = req.query || 1;
    let limit = req.query || 20;

    let where = [];

    if (name) {
      where = {
        ...where,
        [Op.iLike]: `$%{name}%`,
      };
    }

    if (nationality) {
      where = {
        ...where,
        [Op.iLike]: `$%{nationality}%`,
      };
    }

    const data = await Author.findAll({
      where,
      include: [
        {
          model: "Book",
          as: "books",
          attributes: ["title", "genre", "publication_year"],
        },
      ],
      order: [["id", "ASC"]],
      limit,
      offset: limit * page - limit,
    });
    return res.status(200).json(data);
  }
  async store(req, res) {
    try {
      const { name, nationality } = req.body;
      const newAuthor = await Author.create({ name, nationality });
      return res.status(201).json(newAuthor);
    } catch {
      return res.status(400).json({ error: "Bad Request" });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.satus(204).json({ error: "not content" });
    }
    await author.update(req.body);
    return res.status(200).json(author);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(204).json({ error: "not content" });
    }
    return res.status(204).json({ Message: "Deleted successfully" });
  }
}

export default AuthorController;
