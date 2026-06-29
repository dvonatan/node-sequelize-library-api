import { Router } from "express";
import bookControler from "../controllers/bookController.js";

const router = Router();

router.get("/books", bookController.index);
router.get("/books/:id", bookController.show);
router.post("/books", bookController.store);
router.put("/books/:id", bookController.update);
router.delete("/books/:id", bookController.destroy);

export default router;
