import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use("/api/users", userRoutes);

app.listen(4000, () => console.log("Server on http://localhost:4000"));
