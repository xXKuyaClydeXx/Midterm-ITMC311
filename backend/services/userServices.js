const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const SALT_ROUNDS = 10; // You can make this configurable via .env

// Service to register a new user
exports.registerUser = async (username, password, role = "applicant") => {
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      role,
    });

    // Save user to DB
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};
