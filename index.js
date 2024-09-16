import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envFile = `.env.${process.env.NODE_ENV || 'local'}`; // Fallback to 'local' if NODE_ENV is not set
dotenv.config({ path: path.join(__dirname, envFile) });

console.log("Environment variables loaded");

// Import routes and database connection function
import { defineRoutes } from "./src/routes/index.js";
import { connectToMongoDB } from "./src/utils/db.js";  // Add .js extension in ES modules

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json()); // For parsing JSON request bodies
app.use(cors());

// Define application routes
defineRoutes(app);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
  connectToMongoDB(); // Connect to the database
});
