import { defaults } from "pg";
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

    let where = {};

    const data = await Book.findOne({
      where: { id },
      include: [
        {
          model: LibraryBook,
          as: "libraryBooks",
          attributes: ["total_copies", "available_copies"],

          include: [
            {
              model: Library,
              as: "library",
            },
          ],
        },
      ],
    });
  }
  async store(req, res) {
    const { library_id, book_id, total_copies, available_copies } = req.body;

    const data = [Library.findByPk(library_id), Book.findByPk(book_id)];
    const [libraryExist, bookExist] = await Promise.all(data);

    if (!libraryExist || !bookExist) {
      return res.status(404).json({ error: "Entry not found." });
    }

    if (total_copies < 0 || available_copies < 0) {
      return res.status(400).json({
        error: "Negative copies are not allowed",
      });
    }

    try {
      const [instance, justCreated] = await LibraryBook.findOrCreate({
        where: { library_id, book_id },
        defaults: { total_copies, available_copies },
      });

      if (!justCreated) {
        instance.total_copies += total_copies;
        instance.available_copies += available_copies;
        await instance.save();
        return res.status(201).json({ message: "Updated." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Internal server error while saving the record." });
    }
    if (available_copies > total_copies) {
      return res.status(400).json({
        error:
          "Available copies cannot be greater than the total number of copies.",
      });
    }
  }
}
