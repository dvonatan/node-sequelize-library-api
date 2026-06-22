import { Model, DataTypes } from "sequelize";

class Library extends Model {
  static init(sequelize) {
    super.init(
      {
        local: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Library",
        tableName: "libraries",
        timestamps: true,
        underscored: true,
      },
    );
  }
  static associate(models) {
    this.belongsToMany(models.Book, {
      through: "LibraryBook",
      foreignKey: "library_id",
      as: "books",
    });
  }
}

export default Library;
