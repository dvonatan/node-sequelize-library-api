import { Sequelize } from "sequelize";
import config from "../config/database.js";
const connection = new Sequelize(config);

export default connection;
