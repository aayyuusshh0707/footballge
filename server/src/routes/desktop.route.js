const express = require("express");
const router = express.Router();
const {
  bannerController,
  MatchbannerController,
  SidebannerController,
  SidebannerTwoController,
  SideLongbannerController,
} = require("../controllers/desktop.Controller");
const upload = require("../middleware/multer.middleware");

//______________________________________ Long Banner 
router.post(
  "/upload-longbanner",
  upload.single("file"),
  bannerController.uploadBanner
);
router.put(
  "/update-longbanner",
  upload.single("file"),
  bannerController.updateBanner
);
router.post("/upload-longbanner-link", bannerController.uploadLink);
router.put("/update-longbanner-link", bannerController.updateLink);
router.get("/longbanner-link", bannerController.getLink);
router.get("/longbanner", bannerController.getBanner);

//_________________________________________Match Banner
router.post(
  "/upload-matchbanner",
  upload.single("file"),
  MatchbannerController.uploadBanner
);
router.put(
  "/update-matchbanner",
  upload.single("file"),
  MatchbannerController.updateBanner
);
router.post("/upload-matchbanner-link", MatchbannerController.uploadLink);
router.put("/update-matchbanner-link", MatchbannerController.updateLink);
router.get("/matchbanner-link", MatchbannerController.getLink);
router.get("/matchbanner", MatchbannerController.getBanner);

// __________________________________________Side Banner 1
router.post(
  "/upload-sidebanner",
  upload.single("file"),
  SidebannerController.uploadBanner
);
router.put(
  "/update-sidebanner",
  upload.single("file"),
  SidebannerController.updateBanner
);
router.post("/upload-sidebanner-link", SidebannerController.uploadLink);
router.put("/update-sidebanner-link", SidebannerController.updateLink);
router.get("/sidebanner-link", SidebannerController.getLink);
router.get("/sidebanner", SidebannerController.getBanner);

// ____________________________________________Side Banner 2
router.post(
  "/upload-sidebanner-two",
  upload.single("file"),
  SidebannerTwoController.uploadBanner
);
router.put(
  "/update-sidebanner-two",
  upload.single("file"),
  SidebannerTwoController.updateBanner
);
router.post("/upload-sidebanner-two-link", SidebannerTwoController.uploadLink);
router.put("/update-sidebanner-two-link", SidebannerTwoController.updateLink);
router.get("/sidebanner-two-link", SidebannerTwoController.getLink);
router.get("/sidebanner-two", SidebannerTwoController.getBanner);

//_____________________________________________Side Long Banner
router.post(
  "/upload-sidelongbanner",
  upload.single("file"),
  SideLongbannerController.uploadBanner
);
router.put(
  "/update-sidelongbanner",
  upload.single("file"),
  SideLongbannerController.updateBanner
);
router.post("/upload-sidelongbanner-link", SideLongbannerController.uploadLink);
router.put("/update-sidelongbanner-link", SideLongbannerController.updateLink);
router.get("/sidelongbanner-link", SideLongbannerController.getLink);
router.get("/sidelongbanner", SideLongbannerController.getBanner);

module.exports = router;
