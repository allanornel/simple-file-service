import { Router } from "express";

import { deleteDirOrFile, getFileOrDir, upload } from "../controllers/fileController.js";

const router = Router();

router.post("/", upload);

router.get("/", getFileOrDir);

router.delete("/", deleteDirOrFile);

export default router;
