const express = require("express");
const Router = express.Router();
const buttontwoController = require("../../controllers/buttons/buttontwo.controller");


// Get Link for Button 2
Router.get("/getlink", buttontwoController.getLink);

// Update Link for Button 2
Router.put("/updatelink", buttontwoController.updateLink);

module.exports = Router;
