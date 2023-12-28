import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import fileRoutes from "./routes/files";

const app = express();
dotenv.config();

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
