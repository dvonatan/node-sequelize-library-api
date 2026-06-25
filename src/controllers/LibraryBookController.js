import Author from "../models/Author.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import LibraryBook from "../models/LibraryBook.js";
import { Op } from "sequelize";

class LibraryBookController {
  async index(req, res) {
    const librariesCopies = await Library.findAll({
      include: [
        {
          model: Book,
          as: "books",
          through: {
            attributes: [
              "library_id",
              "book_id",
              "total_copies",
              "available_copies",
            ],
          },
        },
      ],
      order: [["local", "ASC"]],
      limit,
      offset: limit * page - limit,
    });
    return res.status(200).json(librariesCopies);
  }
  async show(req, res) {
    const { id } = req.params;

    const librariesCopies = await Library.findAll({});
  }
}
