import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
dotenv.config({ path: path.join(__dirname, envFile) });

console.log("Environment variables loaded");

import { defineRoutes } from "./src/routes/index.js";
import { connectToMongoDB } from "./src/utils/db.js"; 

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

defineRoutes(app);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
  connectToMongoDB();
});
