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
    });
    return res.status(200).json(librariesCopies);
  }
  async show(req, res) {
    const { id } = req.params;

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
    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.status(200).json(data);
  }
  async store(req, res) {
    const { library_id, book_id, total_copies, available_copies } = req.body;
    if (!library_id || !book_id) {
      return res.status(400).json({ error: "Missing IDs." });
    }

    if (total_copies <= 0 || available_copies <= 0) {
      return res.status(400).json({
        error: "Copies must be greater than zero.",
      });
    }

    const bookOperation = [
      Library.findByPk(library_id),
      Book.findByPk(book_id),
    ];

    const [libraryExist, bookExist] = await Promise.all(bookOperation);
    if (!libraryExist || !bookExist) {
      return res.status(404).json({ error: "Entry not found." });
    }
    try {
      const [instance, justCreated] = await LibraryBook.findOrCreate({
        where: { library_id, book_id },
        defaults: { total_copies, available_copies },
      });

      if (instance.available_copies > instance.total_copies) {
        return res.status(400).json({
          error:
            "Available copies cannot be greater than the total number of copies.",
        });
      }

      if (!justCreated) {
        instance.total_copies += total_copies;
        instance.available_copies += available_copies;
      }

      if (!justCreated) {
        await instance.save();
        return res.status(200).json({ message: "Updated.", data: instance });
      }

      return res.status(201).json({
        message: "Association created successfully.",
        data: instance,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Internal server error while saving the record." });
    }
  }
  async destroy(req, res) {
    const { library_id, book_id } = req.params;

    if (!library_id || !book_id) {
      return res.status(404).json({ error: "Resource not found." });
    }

    const association = await LibraryBook.findOne({
      where: { library_id, book_id },
    });
    if (!association) {
      return res.status(404).json({ error: "Resource not found." });
    }

    await association.destroy();
    return res.status(200).json({ message: "Data deleted successfully" });
  }
}
