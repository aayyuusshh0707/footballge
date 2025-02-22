const express = require("express");
const Router = express.Router();
const SidebannerTwoController = require("../../controllers/images/sidebantwo.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/update",
  upload.single("file"),
  SidebannerTwoController.uploadBanner
);

//Get Banner
Router.get("/get", SidebannerTwoController.getBanner);

module.exports = Router;
