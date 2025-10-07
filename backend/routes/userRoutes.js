const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// POST /api/register — Register a new user
router.post("/register", userController.register);

// POST /api/login — Log in user
router.post("/login", userController.login);

module.exports = router;