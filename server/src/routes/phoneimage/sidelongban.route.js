const express = require("express");
const Router = express.Router();
const SideLongbannerController = require("../../controllers/pcimagecontrollers/sideban.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/pc/update",
  upload.single("file"),
  SideLongbannerController.uploadBanner
);

//Get Banner
Router.get("/pc/get", SideLongbannerController.getBanner);

module.exports = Router;
