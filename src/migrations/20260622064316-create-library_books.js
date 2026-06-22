import { Model } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("library_books", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    library_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "libraries", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "books", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    total_copies: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    available_copies: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    update_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("library_books");
}
