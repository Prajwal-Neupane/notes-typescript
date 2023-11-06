import express from "express";
import mongoose from "mongoose";
import { PORT, DB } from "./config/index";
import userRoute from "./routes/userRoutes";
import noteRoute from "./routes/noteRoutes";

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse incoming URL-encoded data with extended options
app.use(express.urlencoded({ extended: true }));

// Connect to the MongoDB database using the DB URL
mongoose
  .connect(DB)
  .then(() => console.log("Connected to the database"))
  .catch((error) => {
    console.log("Error in database connection:", error);
  });

// Use the userRoutes for handling user-related requests
app.use("/", userRoute);
app.use("/", noteRoute);

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
