const express = require("express");
const Router = express.Router();
const SideLongbannerController = require("../../controllers/phoneimagecontrollers/sidelong.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post(
  "/update",
  upload.single("file"),
  SideLongbannerController.uploadBanner
);

//Get Banner
Router.get("/get", SideLongbannerController.getBanner);

module.exports = Router;
