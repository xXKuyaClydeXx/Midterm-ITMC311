const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));