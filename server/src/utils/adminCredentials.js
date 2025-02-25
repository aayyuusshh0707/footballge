const bcrypt = require("bcryptjs");

const adminUsername = "admin";
const adminPassword = "ayush123"; // Change this

// Hash password before exporting
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

module.exports = {
  username: adminUsername,
  password: hashedPassword,
};
