import express from "express";
import multer from "multer";
import {
  downloadFile,
  getFileDetails,
  sendEmail,
  upload,
} from "../controllers/files";

const router = express.Router();
const storage = multer.diskStorage({});
let uploadStorage = multer({
  storage,
});

router.post("/upload", uploadStorage.single("myFile"), upload);
router.get("/email", sendEmail);
router.get("/:id", getFileDetails);
router.get("/download/:id", downloadFile);

export default router;
