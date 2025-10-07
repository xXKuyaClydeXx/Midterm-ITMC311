const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));