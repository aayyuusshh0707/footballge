const express = require("express");
const Router = express.Router();
const adminController = require("../controllers/adminlogin.Controller");

// Route to handle admin login

Router.post("/login", adminController);

module.exports = Router;
