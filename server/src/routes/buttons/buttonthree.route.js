const express = require("express");
const Router = express.Router();
const buttonthreeController = require("../../controllers/buttons/buttonthree.controller");

// Add Link for Button 3
//Router.post("/link", buttonthreeController.addLink);
// Get Link for Button 3
Router.get("/getlink", buttonthreeController.getLink);

// Update Link for Button 3
Router.put("/updatelink", buttonthreeController.updateLink);

module.exports = Router;
