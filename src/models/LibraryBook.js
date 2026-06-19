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
        sequelize: connection,
        modelName: "LibraryBook",
        tableName: "library_books",
      },
    );
  }
}
