const dotenv = require("dotenv");
dotenv.config();

const adminCredentials = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

module.exports = adminCredentials;
