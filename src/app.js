import express from "express";
import authorRoutes from "./routes/authorRoutes.js";

const app = express();
app.use(express.json());

export default app;
