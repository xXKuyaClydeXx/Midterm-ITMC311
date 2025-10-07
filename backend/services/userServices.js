const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = "1h"; // optional: move to .env

// --- Register user service (existing) ---
exports.registerUser = async (username, password, role = "applicant") => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// --- Login user service (new) ---
exports.loginUser = async (username, password) => {
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) throw new Error("Invalid username or password");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid username or password");

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return user + token
    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    };
  } catch (error) {
    throw error;
  }
};
