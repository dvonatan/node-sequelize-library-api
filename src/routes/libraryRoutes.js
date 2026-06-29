import { Router } from "express";
import librariesController from "../controllers/librariesController.js";

const router = Router();

router.get("/libraries", librariesController);
router.get("/libraries/:id", librariesController);
router.post("/libraries", librariesController);
router.put("/libraries/:id", librariesController);
router.delete("/libraries/:id", librariesController);

export default router;
