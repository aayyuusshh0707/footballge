const express = require("express");
const Router = express.Router();
const SidebannerController = require("../../controllers/pcimagecontrollers/sideban.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/pc/update",
  upload.single("file"),
  SidebannerController.uploadBanner
);

//Get Banner
Router.get("/pc/get", SidebannerController.getBanner);

module.exports = Router;
