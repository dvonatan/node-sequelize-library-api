import Author from "../models/Author.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import LibraryBook from "../models/LibraryBook.js";
import { Op } from "sequelize";

class LibraryController {
  async index(req, res) {
    const libraries = await Library.findAll();
    return res.status(200).json(libraries);
  }
  async show(req, res) {
    const { id } = req.query;

    let page = req.query || 1;
    let limit = req.query || 20;

    let where = [];

    if (local) {
      where = {
        ...where,
        [Op.iLike]: `$%{local}%`,
      };
    }
    const data = await Library.findAll({
      where,
      include: [
        {
          model: Book,
          as: "books",
          attributes: { title, genre, publication_year },
        },
      ],
      order: [["local", "ASC"]],
      limit,
      offset: limit * page - limit,
    });
    if (!data.length) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json(data);
  }
  async store(req, res) {
    try {
      const { local } = req.body;
      const newLibrary = await Library.create({ local });
      return res.status(201).json(newLibrary);
    } catch {
      return res.status(400).json({ error: "Bad Request" });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const library = await Library.findByPk(id);
    if (!library) {
      return res.status(400).json({ error: "Not content" });
    }
    await library.update(req.body);
    return res.status(200).json(library);
  }
  async destroy(req, res) {
    const { id } = req.params;
    let library = await Library.findByPk(id);
    if (!library) {
      return res.status(400).json({ error: "Not content" });
    }
    await library.destroy();
    return res.status(204).json({ Message: "Deleted successfully" });
  }
}

export default new LibraryController();
