import { Model, DataTypes } from "sequelize";

class Author extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nationality: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Author",
        tableName: "authors",
        timestamps: true,
        underscored: true,
      },
    );
  }
  static associate(models) {
    this.hasMany(models.Book, {
      foreignKey: "author_id",
      as: "books",
    });
  }
}

export default Author;
