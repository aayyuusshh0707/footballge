const express = require("express");
const adminLogin = require("../controllers/adminlogin.Controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//login route
router.post("/login", adminLogin);
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Logout Route (Clears cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
