const express = require("express");
const Router = express.Router();
const SidebannerController = require("../../controllers/phoneimagecontrollers/sideban.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/update",
  upload.single("file"),
  SidebannerController.uploadBanner
);

//Get Banner
Router.get("/get", SidebannerController.getBanner);

module.exports = Router;
