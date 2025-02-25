const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminCredentials = require("../utils/adminCredentials");
const asyncHandler = require("../utils/asyncHandler");

const adminController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check username
  if (username !== adminCredentials.username) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Compare hashed password
  const isMatch = bcrypt.compareSync(password, adminCredentials.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT Token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Set HTTP-only cookie (more secure than localStorage)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure only in production
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });

  res.status(200).json({ message: "Login successful!" });
});

module.exports = adminController;
