import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import fileRoutes from "./routes/files";
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config();

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_API_CLOUD_NAME = process.env.CLOUDINARY_API_CLOUD_NAME;

cloudinary.config({
  cloud_name: CLOUDINARY_API_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/files", fileRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`[Server]: Node server is running on port ${PORT}`)
);
