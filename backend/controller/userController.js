const { registerUser, loginUser } = require("../services/userServices");

// Controller for registering a new user
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await registerUser(username, password, role);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for logging in a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const result = await loginUser(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
