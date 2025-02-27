const express = require("express");
const Router = express.Router();
const SidebannerTwoController = require("../../controllers/pcimagecontrollers/sidebantwo.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/pc/update",
  upload.single("file"),
  SidebannerTwoController.uploadBanner
);

//Get Banner
Router.get("/pc/get", SidebannerTwoController.getBanner);

module.exports = Router;
