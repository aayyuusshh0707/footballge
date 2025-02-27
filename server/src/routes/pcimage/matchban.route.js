const express = require("express");
const Router = express.Router();
const MatchbannerController = require("../../controllers/pcimagecontrollers/matchBan.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/update",
  upload.single("file"),
  MatchbannerController.uploadBanner
);

//Get Banner
Router.get("/get", MatchbannerController.getBanner);

module.exports = Router;
