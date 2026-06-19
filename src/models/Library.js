import { Model, DataTypes } from "sequelize";
import connection from "../database";

class Library extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        local: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize: connection, modelName: "Library", tableName: "librarys" },
    );
  }
  static associate(models) {
    this.hasMany(models.Book, {
      through: "LibraryBook",
      foreignKey: "library_id",
      as: "books",
    });
  }
}

export default Library;
