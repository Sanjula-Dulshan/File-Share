import express from "express";
import multer from "multer";
import { getFileDetails, upload } from "../controllers/files";

const router = express.Router();
const storage = multer.diskStorage({});
let uploadStorage = multer({
  storage,
});

router.post("/upload", uploadStorage.single("myFile"), upload);
router.get("/:id", getFileDetails);

export default router;
