const adminCredentials = require("../utils/adminCredentials");
const asyncHandler = require("../utils/asyncHandler");

const adminController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = adminController;
