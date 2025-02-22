const express = require("express");
const Router = express.Router();
const buttononeController = require("../../controllers/buttons/buttonone.controller");

// Add Link for Button 1
//Router.post("/link", buttononeController.addLink);

// Get Link for Button 1
Router.get("/getlink", buttononeController.getLink);
// Update Link for Button 1
Router.put("/updatelink", buttononeController.updateLink);

module.exports = Router;
