import { Model, DataTypes } from "sequelize";

class Book extends Model {
  static init(sequelize) {
    super.init(
      {
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
      {
        sequelize,
        modelName: "Book",
        tableName: "books",
        timestamps: true,
        underscored: true,
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.Author, {
      foreignKey: "author_id",
      as: "authors",
    });
    this.belongsToMany(models.Library, {
      foreignKey: "book_id",
      through: "LibraryBook",
      as: "libraries",
    });
  }
}

export default Book;
