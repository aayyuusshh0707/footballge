const express = require("express");
const Router = express.Router();
const bannerController = require("../../controllers/images/banner.controller");
const upload = require("../../middleware/multer.middleware");
// Upload Banner
Router.post("/update", upload.single("file"), bannerController.uploadBanner);

//Get Banner
Router.get("/get", bannerController.getBanner);

module.exports = Router;
