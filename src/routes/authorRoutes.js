import { Router } from "express";
import authorController from "../controllers/authorController.js";

const router = Router();

router.get("/authors", authorController.index);
router.get(";authors/:id", authorController.show);
router.post("/authors", authorController.store);
router.put("/authors/:id", authorController.update);
router.delete("/authors/:id", authorController.destroy);

export default router;
