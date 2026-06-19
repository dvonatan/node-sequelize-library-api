export default {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "library_management_db",
  define: {
    timestamps: true,
    underscored: true,
  },
};
