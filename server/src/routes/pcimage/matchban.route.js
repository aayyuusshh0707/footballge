const express = require("express");
const Router = express.Router();
const MatchbannerController = require("../../controllers/pcimagecontrollers/matchBan.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/pc/update",
  upload.single("file"),
  MatchbannerController.uploadBanner
);

//Get Banner
Router.get("/pc/get", MatchbannerController.getBanner);

module.exports = Router;
