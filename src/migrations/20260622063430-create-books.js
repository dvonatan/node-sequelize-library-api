export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("books", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publication_year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "authors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
  await queryInterface.dropTable("books");
}
