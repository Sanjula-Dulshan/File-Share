import express from "express";
import multer from "multer";
import { Upload } from "../controllers/files";

const router = express.Router();
const storage = multer.diskStorage({});
let upload = multer({
  storage,
});

router.post("/upload", upload.single("myFile"), Upload);

export default router;
