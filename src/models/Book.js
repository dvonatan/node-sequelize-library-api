import { Model, DataTypes } from "sequelize";

class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        genre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        publication_year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        author_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize: connection, modelName: "Book", tableName: "books" },
    );
  }
  static associate(model) {
    this.belongsTo(models.Author, {
      foreignKey: "author_id",
      as: "authors",
    });
    this.belongsToMany(models.LibraryBook, {
      foreignKey: "book_id",
      through: "LibraryBook",
      as: "librarybooks",
    });
  }
}

export default Book;
