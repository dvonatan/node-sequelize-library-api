import { Model, DataTypes } from "sequelize";

class LibraryBook {
  static init(sequelize) {
    super.init(
      {
        library_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        book_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        total_copies: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        available_copies: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "LibraryBook",
        tableName: "library_books",
        timestamps: true,
        underscored: true,
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.Library, {
      foreingKey: "library_id",
      as: "libraries",
    });
    this.belongsTo(models.Book, {
      foreingKey: "book_id",
      as: "books",
    });
  }
}
