const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Base URL for your routes
app.use("/api", userRoutes);

app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));